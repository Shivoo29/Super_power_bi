''' 
Power BI integration module for dataset refresh.
Handles authentication and dataset refresh operations.
'''

import requests
import logging
from typing import Dict, Optional
from config import Config
import time

logger = logging.getLogger(__name__)

class PowerBIRefresher:
    # handles Power Bi dataset refresh operations 

    def __init__(self, config: Config):
        ''' Initialize the Refresher '''
        self.config = config
        self.base_url = "https://api.powerbi.com/v1.0/myorg"
    
    def refresher_dataset(self) -> bool:
        # Trigger a Refresh of the power bi dataset
        workspace_id = self.config.powerbi_workspace_id
        dataset_id = self.config.powerbi_dataset_id
        access_token = self.config.powerbi_access_token

        if not all([workspace_id, dataset_id, access_token]):
            logger.error("Missing Power BI configuration, Please check envioment variables.")
            return False
        
        url = f"{self.base_url}/groups/{workspace_id}/datasets/{dataset_id}/refreshes"

        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type' : 'application/json'
        }

        try: 
            response = requests.get(url, headers=headers)

            if response.status_code == 200:
                return response.json()
            else:
                logger.error(f"Failed to get refresh status. Status:{response.status_code}")
                return None
            
        except requests.exception.RequestException as e:
            logger.error(f"Error getting refresh status: {e}")
            return None
        
    def wait_for_refresh_completion(self, timeout_minutes: int = 30) -> bool:
        '''
        Wait for the latest dataset refresh to complete
        '''
        start_time = time.time()
        timeout_seconds = timeout_minutes * 60

        logger.info(f"Waiting for dataset refresh to complete (timeout:{timeout_minutes} minutes)")

        while time.time() - start_time < timeout_seconds:
            status_info = self.get_refresh_status()

            if status_info and 'value' in status_info and status_info['value']:
                latest_refresh = status_info['value'][0] # Most recent refresh
                status = latest_refresh.get('status', '').lower()

                if status == 'completed':
                    logger.info("Data refresh completed successfully")
                    return True
                elif status == 'failed':
                    logger.info(f"Dataset refresh failed: {latest_refresh.get('serviceExceptionJson', 'Unknown error')}")
                    return False
                elif status in ['unknown', 'inprogress']:
                    logger.info(f"Dataset refresh in progress... (status:{status})")
                    time.sleep(30)
                else:
                    logger.warning(f"Unknown refresh status: {status}")
                    time.sleep(30)
            else:
                logger.warning("Could not retrive refresh status")
                time.sleep(30)

        logger.error(f"Dataset refresh did not complete within {timeout_minutes} minutes")
        return False