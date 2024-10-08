# pipelines/bronze/ingest_data.py

import pandas as pd
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
DATABASE_URL = os.getenv("PG_DATABASE_URL")

# Create a database engine
engine = create_engine(DATABASE_URL)

# Define paths
RAW_DATA_DIR = "../data/data/bronze"
os.makedirs(RAW_DATA_DIR, exist_ok=True)

# Define the list of tables to extract
tables = ["User", "Designation", "Course", "EmployeeProgress", "Skill", "UserSkill", "DesignationSkill", "CourseSkill"]

def fetch_data(table):
    """Fetch data from the specified table."""
    return pd.read_sql_table(table, con=engine)

def save_raw_data(data, table_name):
    """Save the DataFrame to a CSV file."""
    file_path = os.path.join(RAW_DATA_DIR, f'{table_name}.csv')
    data.to_csv(file_path, index=False)
    print(f"Saved {table_name} to {file_path}")

def run_data_ingestion(tables):
    """Run the data ingestion process for the specified tables."""
    for table in tables:
        data = fetch_data(table)
        save_raw_data(data, table)
    print("Raw data extraction complete!")


if __name__ == "__main__":
    run_data_ingestion(tables)
