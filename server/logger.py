import logging
import os

# Create a logs directory if it doesn't exist
if not os.path.exists('logs'):
    os.makedirs('logs')

# Configure the logger
logging.basicConfig(
    level=logging.INFO,  # Set the logging level
    format='%(asctime)s - %(levelname)s - %(message)s',  # Log format with timestamp
    datefmt='%Y-%m-%d %H:%M:%S',  # Format for the timestamp
    handlers=[
        logging.FileHandler("logs/app.log"),  # Log to a file
        logging.StreamHandler()  # Also log to console
    ]
)

logger = logging.getLogger(__name__)
