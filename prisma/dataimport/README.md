# Survey Question/Answer Import

## Requirements

1. questions.csv
   - Required Format
     - id,question,position,questionType
2. answers.csv
   - Required Format
     - id,questionId,answer,position,answerType
3. polis_surveys.csv
   - Required Format
     - id,title,description
4. survey_rules.csv
   - Required Format
     - id,surveyId,search
5. Add a .env file to the dataimport folder based on the .env.example
   1. If the database uses a username and password use the following in dataimport conn_str = f'DRIVER={{SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password}'

## Creating questions.csv, answers.csv, polis_surveys.csv, and survey_rules.csv

1. Open a new google sheet
2. Rename one tab Questions
3. Add a new sheet and name it Answers
4. In the Questions tab, add the following headers:
   1. id question position questionType
      1. id: The ID can be whatever value you want as long as there are no spaces or special characters
      2. question: The survey question being asked
      3. position: The order of the survey question (for example, a value of 2 means the question will appear 2nd)
      4. The format of the question (available types below):
         1. option
            1. Renders as a list of radio buttons
         2. number
            1. A free text field that asks for a number
         3. multiSelect
            1. A checkbox list
5. In the Answers sheet, add the following headers:
   1. id questionId answer position answerType
      1. id: The ID can be whatever value you want as long as there are no spaces or special characters
      2. questionId: The ID of the question the answer links to
      3. answer: The answer's value
         1. A free text field will have an empty string as the value: ""
      4. position: The position of the answer in the list. For example an answer with a position of 3 will display third in the list
      5. answerType
         1. Available answer types shown below
            1. option
               1. An option in a multiselect or radio button list
            2. text
               1. If the answer is a free text field
            3. optionText
               1. If the answer is an option in the list and has a free text field next to it. For example, the value might be "Other, {free text field here}"
6. In the PolisSurveys sheet, add the following headers:
   1. id title description
      1. id: The ID is the polis survey ID from polis
      2. title: The title of the polis survey
      3. description: A short description of the pol.is survey
7. In the SurveyRules sheet, add the following headers:
   1. id surveyId search
      1. id: The ID of the survey rule
      2. surveyId: The ID of the pol.is survey that requires the rule
      3. search: This is the term that will be used for filtering. If the planning region has that word, the survey will show
8. Add your questions to the questions sheet
9. Add your answers to the answers sheet
10. Add any survey rules to the survey rules sheet
    1. **Note:** Any rules that are added will mean that the associated pol.is survey will not display unless that corresponding answer ID is selected
11. Download the Questions sheet as a csv and name it "questions.csv"
12. Download the Answers sheet as a csv and name it "answers.csv"
13. Download the SurveyRules sheet as a csv and name it "survey_rules.csv"
14. Download the PolisSurveys sheet as a csv and name it "polis_surveys.csv"
15. Add the downloaded csvs to the data import folder
16. Run

```console
pip install -r requirements.txt
python ./dataimport.py
```
