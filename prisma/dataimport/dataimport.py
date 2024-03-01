import pandas as pd
from dotenv import load_dotenv
import os
import pyodbc

load_dotenv()

# Read the CSV files
questions_df = pd.read_csv('questions.csv')
answers_df = pd.read_csv('answers.csv')
polis_surveys_df = pd.read_csv('polis_surveys.csv')
survey_rules_df = pd.read_csv('survey_rules.csv')

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

cursor.execute('''
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='PolisSurveys' and xtype='U')
    CREATE TABLE PolisSurveys (
        id NVARCHAR(255) PRIMARY KEY,
        title NVARCHAR(255),
        description NVARCHAR(MAX),
    )
''')

cursor.execute('''
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='SurveyRules' and xtype='U')
    CREATE TABLE PolisSurveys (
        id NVARCHAR(255) PRIMARY KEY,
        surveyId NVARCHAR(255),
        questionId INT,
        requiredAnswerId INT,
    )
''')

# Commit the changes
conn.commit()

# Function to insert data into a table
def insert_data(df, table_name):
    placeholders = ', '.join(['?'] * len(df.columns))
    columns = ', '.join(df.columns)
    sql = f'''
        IF NOT EXISTS (SELECT 1 FROM {table_name} WHERE id = ?)
        BEGIN
            INSERT INTO {table_name} ({columns}) VALUES ({placeholders})
        END
        '''
    for index, row in df.iterrows():
        cursor.execute(sql, (row['id'],) + tuple(row))

# Insert data into the tables
insert_data(questions_df, 'SurveyQuestion')
insert_data(answers_df, 'SurveyAnswer')
insert_data(polis_surveys_df, 'PolisSurveys')
insert_data(survey_rules_df, 'SurveyRules')

# Commit the changes and close the connection
conn.commit()
cursor.close()
conn.close()