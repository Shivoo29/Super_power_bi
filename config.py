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
        config_path: config.yaml
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
        'Get input folder path for excel files'
        return self.config.get('path' ,{}).get('input_folder', './raw_data/')
    @property
    def output_folder(self) -> str:
        'Get output CSV file Path'
        return self.config.get('path',{}).get('output_file', 'cleaned_data.csv')
    @property
    def selected_columns(self) -> str:
        'Get list of columns to select from the data'
        return self.config.get('data_processing',{}).get('selected_columns')
    @property
    def file_patterb(self) -> str:
        'Get file pattern form Excel files'
        return self.config.get('data_processing',{}).get('file_patttern', '*.xlsx')
    @property
    def output_folder(self) -> str:
        'Get output CSV file Path'
        return self.config.get('path',{}).get('output_file', 'cleaned_data.csv')
    @property
    def output_folder(self) -> str:
        'Get output CSV file Path'
        return self.config.get('path',{}).get('output_file', 'cleaned_data.csv')
    @property
    def output_folder(self) -> str:
        'Get output CSV file Path'
        return self.config.get('path',{}).get('output_file', 'cleaned_data.csv')
    @property
    def output_folder(self) -> str:
        'Get output CSV file Path'
        return self.config.get('path',{}).get('output_file', 'cleaned_data.csv')
    @property
    def output_folder(self) -> str:
        'Get output CSV file Path'
        return self.config.get('path',{}).get('output_file', 'cleaned_data.csv')
    @property
    def output_folder(self) -> str:
        'Get output CSV file Path'
        return self.config.get('path',{}).get('output_file', 'cleaned_data.csv')    


        