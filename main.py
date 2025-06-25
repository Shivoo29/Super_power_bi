''' 
Main pipline orchestrator for the data automation system.
Coordinates data processing and Power BI refresh operations
'''

import logging
import sys
from pathlib import Path
from datetime import datetime
import traceback
from config import Config
from process import DataProcessor
from refresh import PowerBIRefresher