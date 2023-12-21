import pandas as pd
from dotenv import load_dotenv
import os
import pyodbc

load_dotenv()

# Read the CSV files
questions_df = pd.read_csv('questions.csv')
answers_df = pd.read_csv('answers.csv')

# Database connection parameters - adjust these to your own server
server = os.getenv('DB_SERVER') 
database = os.getenv('DB_NAME')

# Establish a connection
conn_str = f'DRIVER={{SQL Server}};SERVER={server};DATABASE={database};Integrated Security=true'

conn = pyodbc.connect(conn_str)

# Create a cursor object
cursor = conn.cursor()

# # Create tables in the database
cursor.execute('''
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='SurveyQuestion' and xtype='U')
    CREATE TABLE SurveyQuestion (
        id INT PRIMARY KEY,
        question NVARCHAR(255),
        position INT,
        questionType NVARCHAR(255)
    )
''')

cursor.execute('''
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='SurveyAnswer' and xtype='U')
    CREATE TABLE SurveyAnswer (
        id INT PRIMARY KEY,
        questionId INT,
        answer NVARCHAR(MAX),
        position INT,
        answerType NVARCHAR(255)
    )
''')

# Commit the changes
conn.commit()

# Function to insert data into a table
def insert_data(df, table_name):
    placeholders = ', '.join(['?'] * len(df.columns))
    columns = ', '.join(df.columns)
    sql = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"
    for index, row in df.iterrows():
        cursor.execute(sql, tuple(row))
        print(f'Row {index} inserted, {sql} executed')

# Insert data into the tables
insert_data(questions_df, 'SurveyQuestion')
insert_data(answers_df, 'SurveyAnswer')

# Commit the changes and close the connection
conn.commit()
cursor.close()
conn.close()