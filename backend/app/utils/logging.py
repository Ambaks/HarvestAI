import logging

def setup_logging():
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s",
        filename="app.log",  # Saves logs to app.log
        filemode="a",  # Append to the log file instead of overwriting
    )
    logger = logging.getLogger("app")
    return logger
