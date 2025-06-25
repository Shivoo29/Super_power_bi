"""
Data processing module for the automation pipeline.
Handles reading, cleaning, and merging Excel files.
"""

import pandas as pd
import glob
from pathlib import Path
import logging
from typing import List, Optional
from config import Config

logger = logging.getLogger(__name__)

class DataProcessor:
    """Handles data processing operations."""
    
    def __init__(self, config: Config):
        """
        Initialize the data processor.
        
        Args:
            config: Configuration object
        """
        self.config = config
        
    def read_excel_files(self) -> pd.DataFrame:
        """
        Read all Excel files from the input folder and combine them.
        
        Returns:
            Combined DataFrame from all Excel files
        """
        input_path = Path(self.config.input_folder)
        file_pattern = self.config.file_pattern
        
        # Get all Excel files matching the pattern
        excel_files = glob.glob(str(input_path / file_pattern))
        
        if not excel_files:
            raise FileNotFoundError(f"No Excel files found in {input_path} matching pattern {file_pattern}")
        
        logger.info(f"Found {len(excel_files)} Excel files to process")
        
        dataframes = []
        
        for file_path in excel_files:
            try:
                logger.info(f"Reading file: {file_path}")
                df = pd.read_excel(file_path)
                
                # Add source file column for tracking
                df['source_file'] = Path(file_path).name
                dataframes.append(df)
                
                logger.info(f"Successfully read {len(df)} rows from {file_path}")
                
            except Exception as e:
                logger.error(f"Error reading file {file_path}: {e}")
                continue
        
        if not dataframes:
            raise ValueError("No valid Excel files could be read")
        
        # Combine all dataframes
        combined_df = pd.concat(dataframes, ignore_index=True)
        logger.info(f"Combined data shape: {combined_df.shape}")
        
        return combined_df
    
    def clean_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Clean the combined DataFrame.
        
        Args:
            df: Input DataFrame to clean
            
        Returns:
            Cleaned DataFrame
        """
        logger.info("Starting data cleaning process")
        original_shape = df.shape
        
        # Select specific columns if configured
        if self.config.selected_columns:
            available_columns = [col for col in self.config.selected_columns if col in df.columns]
            missing_columns = [col for col in self.config.selected_columns if col not in df.columns]
            
            if missing_columns:
                logger.warning(f"Missing columns: {missing_columns}")
            
            if available_columns:
                df = df[available_columns + ['source_file']]  # Keep source_file for tracking
                logger.info(f"Selected columns: {available_columns}")
        
        # Handle missing values
        if self.config.fill_na_method:
            if self.config.fill_na_method == "forward":
                df = df.fillna(method='ffill')
            elif self.config.fill_na_method == "backward":
                df = df.fillna(method='bfill')
            elif self.config.fill_na_method == "zero":
                df = df.fillna(0)
            
            logger.info(f"Applied fill NA method: {self.config.fill_na_method}")
        
        # Remove duplicates if configured
        if self.config.drop_duplicates:
            before_dedup = len(df)
            df = df.drop_duplicates()
            after_dedup = len(df)
            logger.info(f"Removed {before_dedup - after_dedup} duplicate rows")
        
        # Basic data type optimization
        df = self._optimize_dtypes(df)
        
        logger.info(f"Data cleaning completed. Shape changed from {original_shape} to {df.shape}")
        return df
    
    def _optimize_dtypes(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Optimize DataFrame data types to reduce memory usage.
        
        Args:
            df: Input DataFrame
            
        Returns:
            DataFrame with optimized data types
        """
        for col in df.columns:
            if df[col].dtype == 'object':
                # Try to convert to numeric if possible
                try:
                    df[col] = pd.to_numeric(df[col], errors='ignore')
                except:
                    pass
            elif df[col].dtype == 'int64':
                # Downcast integers
                df[col] = pd.to_numeric(df[col], downcast='integer')
            elif df[col].dtype == 'float64':
                # Downcast floats
                df[col] = pd.to_numeric(df[col], downcast='float')
        
        return df
    
    def save_data(self, df: pd.DataFrame) -> str:
        """
        Save the processed DataFrame to CSV.
        
        Args:
            df: DataFrame to save
            
        Returns:
            Path to the saved file
        """
        output_path = self.config.output_file
        
        try:
            df.to_csv(output_path, index=False)
            logger.info(f"Data saved to {output_path} ({len(df)} rows, {len(df.columns)} columns)")
            return output_path
        except Exception as e:
            logger.error(f"Error saving data to {output_path}: {e}")
            raise
    
    def get_data_summary(self, df: pd.DataFrame) -> dict:
        """
        Generate a summary of the processed data.
        
        Args:
            df: DataFrame to summarize
            
        Returns:
            Dictionary containing data summary
        """
        summary = {
            'total_rows': len(df),
            'total_columns': len(df.columns),
            'columns': list(df.columns),
            'memory_usage_mb': df.memory_usage(deep=True).sum() / 1024 / 1024,
            'null_counts': df.isnull().sum().to_dict(),
            'data_types': df.dtypes.astype(str).to_dict()
        }
        
        if 'source_file' in df.columns:
            summary['source_files'] = df['source_file'].value_counts().to_dict()
        
        return summary
