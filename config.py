'''
Configuration Management for the data automation pipeline.
Handles Loading configuration from YAML files and environment variables. 
'''

from logging import config
import yaml
import os
from pathlib import Path
from typing import Dict, List, Optional, Self
import logging

logger = logging.getLogger(__name__)

class Config:
    def __init__(self,config_path: str = "config.yaml"):
        self.config_path = config_path
        self.config = self._load_config()
    
    def _load_config(self) -> Dict:
        try:
            config_file = Path(__file__).parent/self.config_path
            with open(config_file, 'r') as file:
                config = yaml.safe_load(file)
            logger.info(f"Configuration loaded from {config_file}")
            return config
        except FileNotFoundError:
            logger.error(f"Configuration file {Self.config_path} not found")
            raise
        except yaml.YAMLError as e:
            logger.error(f"Error parsing YAML configuration: {e}")
            raise
    
    @property
    def input_folder(self) -> str:
        """Get input folder path for Excel files."""
        return self.config.get('paths', {}).get('input_folder', './raw_data/')
    
    @property
    def output_file(self) -> str:
        """Get output CSV file path."""
        return self.config.get('paths', {}).get('output_file', 'cleaned_data.csv')
    
    @property
    def selected_columns(self) -> Optional[List[str]]:
        """Get list of columns to select from the data."""
        return self.config.get('data_processing', {}).get('selected_columns')
    
    @property
    def file_pattern(self) -> str:
        """Get file pattern for Excel files."""
        return self.config.get('data_processing', {}).get('file_pattern', '*.xlsx')
    
    @property
    def drop_duplicates(self) -> bool:
        """Whether to drop duplicate rows."""
        return self.config.get('data_processing', {}).get('drop_duplicates', True)
    
    @property
    def fill_na_method(self) -> Optional[str]:
        """Method to fill NA values."""
        return self.config.get('data_processing', {}).get('fill_na_method')
    
    @property
    def powerbi_workspace_id(self) -> str:
        """Get Power BI workspace ID from environment variables."""
        return os.getenv('POWERBI_WORKSPACE_ID', '')
    
    @property
    def powerbi_dataset_id(self) -> str:
        """Get Power BI dataset ID from environment variables."""
        return os.getenv('POWERBI_DATASET_ID', '')
    
    @property
    def powerbi_access_token(self) -> str:
        """Get Power BI access token from environment variables."""
        return os.getenv('POWERBI_ACCESS_TOKEN', '')
    
    @property
    def log_level(self) -> str:
        """Get logging level."""
        return self.config.get('logging', {}).get('level', 'INFO')
    
    @property
    def log_file(self) -> str:
        """Get log file path."""
        return self.config.get('logging', {}).get('file', 'pipeline.log')
