"""
Main pipeline orchestrator for the data automation system.
Coordinates data processing and Power BI refresh operations.
"""

import logging
import sys
from pathlib import Path
from datetime import datetime
import traceback
from config import Config
from process import DataProcessor
from refresh import PowerBIRefresher

def setup_logging(config: Config):
    """
    Set up logging configuration.
    
    Args:
        config: Configuration object
    """
    log_level = getattr(logging, config.log_level.upper(), logging.INFO)
    
    # Create logs directory if it doesn't exist
    log_file_path = Path(config.log_file)
    log_file_path.parent.mkdir(exist_ok=True)
    
    # Configure logging
    logging.basicConfig(
        level=log_level,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(config.log_file),
            logging.StreamHandler(sys.stdout)
        ]
    )

def main():
    """Main pipeline execution function."""
    start_time = datetime.now()
    logger = logging.getLogger(__name__)
    
    try:
        # Load configuration
        config = Config()
        setup_logging(config)
        
        logger.info("=" * 50)
        logger.info("Starting Data Automation Pipeline")
        logger.info(f"Pipeline started at: {start_time}")
        logger.info("=" * 50)
        
        # Initialize processors
        data_processor = DataProcessor(config)
        powerbi_refresher = PowerBIRefresher(config)
        
        # Step 1: Read and process data
        logger.info("Step 1: Reading Excel files...")
        raw_data = data_processor.read_excel_files()
        
        logger.info("Step 2: Cleaning and processing data...")
        cleaned_data = data_processor.clean_data(raw_data)
        
        # Generate data summary
        summary = data_processor.get_data_summary(cleaned_data)
        logger.info(f"Data Summary: {summary}")
        
        # Step 3: Save processed data
        logger.info("Step 3: Saving processed data...")
        output_file = data_processor.save_data(cleaned_data)
        
        # Step 4: Trigger Power BI refresh
        logger.info("Step 4: Triggering Power BI dataset refresh...")
        refresh_success = powerbi_refresher.refresh_dataset()
        
        if refresh_success:
            logger.info("Power BI dataset refresh triggered successfully")
            
            # Optionally wait for refresh completion
            # wait_success = powerbi_refresher.wait_for_refresh_completion(timeout_minutes=15)
            # if wait_success:
            #     logger.info("Power BI dataset refresh completed successfully")
            # else:
            #     logger.warning("Power BI dataset refresh may still be in progress")
        else:
            logger.warning("Failed to trigger Power BI dataset refresh")
        
        # Pipeline completion
        end_time = datetime.now()
        duration = end_time - start_time
        
        logger.info("=" * 50)
        logger.info("Pipeline completed successfully!")
        logger.info(f"Total execution time: {duration}")
        logger.info(f"Output file: {output_file}")
        logger.info(f"Processed {summary['total_rows']} rows from {len(summary.get('source_files', {}))} files")
        logger.info("=" * 50)
        
        return True
        
    except Exception as e:
        logger.error(f"Pipeline failed with error: {e}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
