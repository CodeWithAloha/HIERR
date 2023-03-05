BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[SurveyQuestion] (
    [id] NVARCHAR(1000) NOT NULL,
    [question] NVARCHAR(1000) NOT NULL,
    [position] INT NOT NULL,
    [questionType] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [SurveyQuestion_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[SurveyAnswer] (
    [id] NVARCHAR(1000) NOT NULL,
    [questionId] NVARCHAR(1000) NOT NULL,
    [answer] NVARCHAR(1000) NOT NULL,
    [position] INT NOT NULL,
    [answerType] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [SurveyAnswer_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[UserSurveyAnswers] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [questionId] NVARCHAR(1000) NOT NULL,
    [answerId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [UserSurveyAnswers_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ZipCode] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [zipcode] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ZipCode_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ZipCode_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[CensusTract] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [CensusTract_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Account] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [provider] NVARCHAR(1000) NOT NULL,
    [providerAccountId] NVARCHAR(1000) NOT NULL,
    [refresh_token] NVARCHAR(1000),
    [access_token] NVARCHAR(1000),
    [expires_at] INT,
    [token_type] NVARCHAR(1000),
    [scope] NVARCHAR(1000),
    [id_token] NVARCHAR(1000),
    [session_state] NVARCHAR(1000),
    CONSTRAINT [Account_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Account_provider_providerAccountId_key] UNIQUE NONCLUSTERED ([provider],[providerAccountId])
);

-- CreateTable
CREATE TABLE [dbo].[Session] (
    [id] NVARCHAR(1000) NOT NULL,
    [sessionToken] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [expires] DATETIME2 NOT NULL,
    CONSTRAINT [Session_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Session_sessionToken_key] UNIQUE NONCLUSTERED ([sessionToken])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    [email] NVARCHAR(1000),
    [emailVerified] DATETIME2,
    [image] NVARCHAR(1000),
    [censusTractId] NVARCHAR(1000),
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [User_censusTractId_key] UNIQUE NONCLUSTERED ([censusTractId])
);

-- CreateTable
CREATE TABLE [dbo].[VerificationToken] (
    [identifier] NVARCHAR(1000) NOT NULL,
    [token] NVARCHAR(1000) NOT NULL,
    [expires] DATETIME2 NOT NULL,
    CONSTRAINT [VerificationToken_token_key] UNIQUE NONCLUSTERED ([token]),
    CONSTRAINT [VerificationToken_identifier_token_key] UNIQUE NONCLUSTERED ([identifier],[token])
);

-- AddForeignKey
ALTER TABLE [dbo].[SurveyAnswer] ADD CONSTRAINT [SurveyAnswer_questionId_fkey] FOREIGN KEY ([questionId]) REFERENCES [dbo].[SurveyQuestion]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserSurveyAnswers] ADD CONSTRAINT [UserSurveyAnswers_answerId_fkey] FOREIGN KEY ([answerId]) REFERENCES [dbo].[SurveyAnswer]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserSurveyAnswers] ADD CONSTRAINT [UserSurveyAnswers_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserSurveyAnswers] ADD CONSTRAINT [UserSurveyAnswers_questionId_fkey] FOREIGN KEY ([questionId]) REFERENCES [dbo].[SurveyQuestion]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ZipCode] ADD CONSTRAINT [ZipCode_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Account] ADD CONSTRAINT [Account_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Session] ADD CONSTRAINT [Session_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_censusTractId_fkey] FOREIGN KEY ([censusTractId]) REFERENCES [dbo].[CensusTract]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- Add Question Data
DECLARE @questionId1 uniqueidentifier = NEWID();

DECLARE @questionId2 uniqueidentifier = NEWID();

DECLARE @questionId3 uniqueidentifier = NEWID();

DECLARE @questionId4 uniqueidentifier = NEWID();

DECLARE @questionId5 uniqueidentifier = NEWID();

DECLARE @questionId6 uniqueidentifier = NEWID();

DECLARE @questionId7 uniqueidentifier = NEWID();

DECLARE @questionId8 uniqueidentifier = NEWID();

DECLARE @questionId9 uniqueidentifier = NEWID();

DECLARE @questionId10 uniqueidentifier = NEWID();
DECLARE @questionId11 uniqueidentifier = NEWID();
DECLARE @questionId12 uniqueidentifier = NEWID();
DECLARE @questionId13 uniqueidentifier = NEWID();
DECLARE @questionId14 uniqueidentifier = NEWID();
DECLARE @questionId15 uniqueidentifier = NEWID();

DECLARE @answerId1 uniqueidentifier = NEWID();

DECLARE @answerId2 uniqueidentifier = NEWID();

DECLARE @answerId3 uniqueidentifier = NEWID();

DECLARE @answerId4 uniqueidentifier = NEWID();

DECLARE @answerId5 uniqueidentifier = NEWID();

DECLARE @answerId6 uniqueidentifier = NEWID();

DECLARE @answerId7 uniqueidentifier = NEWID();

DECLARE @answerId8 uniqueidentifier = NEWID();

DECLARE @answerId9 uniqueidentifier = NEWID();

DECLARE @answerId10 uniqueidentifier = NEWID();

DECLARE @answerId11 uniqueidentifier = NEWID();

DECLARE @answerId12 uniqueidentifier = NEWID();

DECLARE @answerId13 uniqueidentifier = NEWID();

DECLARE @answerId14 uniqueidentifier = NEWID();

DECLARE @answerId15 uniqueidentifier = NEWID();

DECLARE @answerId16 uniqueidentifier = NEWID();

DECLARE @answerId17 uniqueidentifier = NEWID();

DECLARE @answerId18 uniqueidentifier = NEWID();

DECLARE @answerId19 uniqueidentifier = NEWID();

DECLARE @answerId20 uniqueidentifier = NEWID();

DECLARE @answerId21 uniqueidentifier = NEWID();

DECLARE @answerId22 uniqueidentifier = NEWID();

DECLARE @answerId23 uniqueidentifier = NEWID();

DECLARE @answerId24 uniqueidentifier = NEWID();
DECLARE @answerId25 uniqueidentifier = NEWID();
DECLARE @answerId26 uniqueidentifier = NEWID();
DECLARE @answerId27 uniqueidentifier = NEWID();
DECLARE @answerId28 uniqueidentifier = NEWID();
DECLARE @answerId29 uniqueidentifier = NEWID();
DECLARE @answerId30 uniqueidentifier = NEWID();
DECLARE @answerId31 uniqueidentifier = NEWID();
DECLARE @answerId32 uniqueidentifier = NEWID();
DECLARE @answerId33 uniqueidentifier = NEWID();
DECLARE @answerId34 uniqueidentifier = NEWID();
DECLARE @answerId35 uniqueidentifier = NEWID();
DECLARE @answerId36 uniqueidentifier = NEWID();
DECLARE @answerId37 uniqueidentifier = NEWID();
DECLARE @answerId38 uniqueidentifier = NEWID();
DECLARE @answerId39 uniqueidentifier = NEWID();
DECLARE @answerId40 uniqueidentifier = NEWID();
DECLARE @answerId41 uniqueidentifier = NEWID();
DECLARE @answerId42 uniqueidentifier = NEWID();
DECLARE @answerId43 uniqueidentifier = NEWID();
DECLARE @answerId44 uniqueidentifier = NEWID();
DECLARE @answerId45 uniqueidentifier = NEWID();
DECLARE @answerId46 uniqueidentifier = NEWID();
DECLARE @answerId47 uniqueidentifier = NEWID();
DECLARE @answerId48 uniqueidentifier = NEWID();
DECLARE @answerId49 uniqueidentifier = NEWID();
DECLARE @answerId50 uniqueidentifier = NEWID();
DECLARE @answerId51 uniqueidentifier = NEWID();
DECLARE @answerId52 uniqueidentifier = NEWID();
DECLARE @answerId53 uniqueidentifier = NEWID();
DECLARE @answerId54 uniqueidentifier = NEWID();
DECLARE @answerId55 uniqueidentifier = NEWID();
DECLARE @answerId56 uniqueidentifier = NEWID();
DECLARE @answerId57 uniqueidentifier = NEWID();
DECLARE @answerId58 uniqueidentifier = NEWID();
DECLARE @answerId59 uniqueidentifier = NEWID();
DECLARE @answerId60 uniqueidentifier = NEWID();
DECLARE @answerId61 uniqueidentifier = NEWID();
DECLARE @answerId62 uniqueidentifier = NEWID();
DECLARE @answerId63 uniqueidentifier = NEWID();
DECLARE @answerId64 uniqueidentifier = NEWID();
DECLARE @answerId65 uniqueidentifier = NEWID();
DECLARE @answerId66 uniqueidentifier = NEWID();
DECLARE @answerId67 uniqueidentifier = NEWID();
DECLARE @answerId68 uniqueidentifier = NEWID();
DECLARE @answerId69 uniqueidentifier = NEWID();
DECLARE @answerId70 uniqueidentifier = NEWID();
DECLARE @answerId71 uniqueidentifier = NEWID();
DECLARE @answerId72 uniqueidentifier = NEWID();


INSERT INTO
    [dbo].[SurveyQuestion] (id, question, position, questionType)
VALUES
    (
        @questionId1,
        'Are you a full-time resident of Hawaii (lived in Hawaii at least six months each year)?',
        1, 'option'
    ),
    (
        @questionId2,
        'What was your age on your last birthday?',
        2, 'number'
    ),
    (@questionId3, 'What is your gender?', 3, 'option'),
    (
        @questionId4,
        'Including yourself, how many persons, in total, live in your household?',
        4, 'number'
    ),
    (
        @questionId5,
        'Which of the following best describes your current employment status?',
        5, 'multiSelect'
    ),
    (
        @questionId6,
        'Do you currently have a non-dial-up internet subscription (i.e., cellular data, cable, fiber optic, DSL, satellite)?',
        6, 'option'
    ),
    (
        @questionId7,
        'Did you have a non-dial-up internet subscription (i.e., cellular data, cable, fiber optic, DSL, satellite) during the pandemic?',
        7, 'option'
    ),
    (
        @questionId8,
        'Do you currently have health insurance? 
',
        8, 'option'
    ),
    (
        @questionId9,
        'Did you have health insurance during the pandemic? 
',
        9, 'option'
    ),
    (
        @questionId10,
        'Are you currently living in a… (Select one answer)
',
        10, 'option'
    ),
    (
        @questionId11,
        'Is your housing structure below… (Select one answer)
',
        11, 'option'
    )
,
    (
        @questionId12,
        'What is your ethnic identification? If more than one ethnicity, which do you identify most. 
If you cannot choose, please select mixed. If you have any Hawaiian in your ethnic mix, please select Hawaiian/Part Hawaiian
',
        12, 'option'
    ),
    (
        @questionId13,
        'What is the highest level of education you have completed? (Select one answer)
',
        13, 'option'
    ),
    (
        @questionId14,
        'Do you identify with having a disability?',
        14, 'option'
    ),
(
        @questionId15,
        'What was your household income in 2022, before taxes? Please consider and include in your thinking your best estimate of the income of all persons living in your household. (Select one answer)',
        15, 'option'
    )
INSERT INTO
    [dbo].[SurveyAnswer] (id, questionId, answer, position, answerType)
VALUES
    (@answerId1, @questionId1, 'yes', 1, 'option'),
    (@answerId2, @questionId1, 'no', 2, 'option'),
    (@answerId3, @questionId2, '', 1, 'text'),
    (@answerId4, @questionId3, 'Female', 1, 'option'),
    (@answerId5, @questionId3, 'Male', 2, 'option'),
    (@answerId6, @questionId3, 'Other,', 3, 'optionText'),
    (@answerId7, @questionId4, '', 1, 'number'),
    (@answerId8, @questionId5, 'Employed full time / part time', 1, 'option'),
    (@answerId9, @questionId5, 'Unemployed, not looking for work', 2, 'option'),
    (@answerId10, @questionId5, 'Unemployed, looking for work', 3, 'option'),
    (@answerId11, @questionId5, 'Retired', 4, 'option'),
    (@answerId12, @questionId5, 'Homemaker', 5, 'option'),
    (@answerId13, @questionId5, 'Self-employed', 6, 'option'),
    (@answerId14, @questionId5, 'Student', 7, 'option'),
    (@answerId15, @questionId5, 'Other, ', 8, 'optionText'),
    (@answerId16, @questionId6, 'yes', 1, 'option'),
    (@answerId17, @questionId6, 'no', 2, 'option'),
    (@answerId18, @questionId7, 'yes', 1, 'option'),
    (@answerId19, @questionId7, 'no', 2, 'option'),
    (@answerId20, @questionId8, 'yes', 1, 'option'),
    (@answerId21, @questionId8, 'no', 2, 'option'),
    (@answerId22, @questionId9, 'yes', 1, 'option'),
    (@answerId23, @questionId9, 'no', 2, 'option'),
    (@answerId24, @questionId10, 'Permanent stable housing structure (e.g., house, apartment, condominium, accessory dwelling unit / ADU, ohana unit)', 1, 'option'),
    (@answerId25, @questionId10, 'Mobile home (e.g., RV, vehicle, boat)', 2, 'option'),
    (@answerId26, @questionId10, 'Group quarters (e.g., institutional facility, college dorms, military housing, correctional facility, transitional housing)', 3, 'option'),
    (@answerId27, @questionId10, 'Other permanent housing (e.g., community village, tiny home)', 4, 'option'),
    (@answerId28, @questionId10, 'I am houseless', 5, 'option'),
    (@answerId29, @questionId10, 'Other,', 6, 'optionText'),
    (@answerId30, @questionId11, 'Owned by you or someone in the household, with mortgage / loan', 1, 'option'),
    (@answerId31, @questionId11, 'Owned by you or someone in the household, without mortgage / loan', 2, 'option'),
    (@answerId32, @questionId11, 'Rented by you or someone in the household', 3, 'option'),
    (@answerId33, @questionId11, 'Rent free to you and your household', 4, 'option'),
    (@answerId34, @questionId11, 'Not applicable', 5, 'option'),
    (@answerId35, @questionId12, 'Caucasian / White', 1, 'option'),
    (@answerId36, @questionId12, 'Black or African American', 2, 'option'),
    (@answerId37, @questionId12, 'American Indian or Alaska Native,', 3, 'optiontText'),
    (@answerId38, @questionId12, 'Asian Indian', 4, 'option'),
    (@answerId39, @questionId12, 'Japanese', 5, 'option'),
    (@answerId40, @questionId12, 'Native Hawaiian', 6, 'option'),
    (@answerId41, @questionId12, 'Chinese', 7, 'option'),
    (@answerId42, @questionId12, 'Korean', 8, 'option'),
    (@answerId43, @questionId12, 'Guamanian or Chamorro', 9, 'option'),
    (@answerId44, @questionId12, 'Filipino', 10, 'option'),
    (@answerId45, @questionId12, 'Vietnamese', 11, 'option'),
    (@answerId46, @questionId12, 'Samoan', 12, 'option'),
    (@answerId47, @questionId12, 'Mixed (not Hawaiian)', 13, 'option'),
    (@answerId48, @questionId12, 'Other Asian,', 14, 'optionText'),
    (@answerId49, @questionId12, 'Other Pacific Islander,', 15, 'optionText'),
    (@answerId50, @questionId12, 'Some other race,', 16, 'optionText'),
    (@answerId51, @questionId12, 'Prefer not to say', 17, 'option'),
    (@answerId52, @questionId13, 'Less than high school', 1, 'option'),
    (@answerId53, @questionId13, 'High school/GED', 2, 'option'),
    (@answerId54, @questionId13, 'Some college, no degree', 3, 'option'),
    (@answerId55, @questionId13, 'Trade school', 4, 'option'),
    (@answerId56, @questionId13, 'Associate degree', 5, 'option'),
    (@answerId57, @questionId13, 'Bachelor’s degree', 6, 'option'),
    (@answerId58, @questionId13, 'Graduate or professional degree', 7, 'option'),
    (@answerId59, @questionId14, 'yes', 1, 'option'),
    (@answerId60, @questionId14, 'no', 2, 'option'),
    (@answerId61, @questionId15, 'Less than $10,000', 1, 'option'),
    (@answerId62, @questionId15, '$10,000 but less than $15,000', 2, 'option'),
    (@answerId63, @questionId15, '$15,000 but less than $25,000', 3, 'option'),
    (@answerId64, @questionId15, '$25,000 but less than $35,000', 4, 'option'),
    (@answerId65, @questionId15, '$35,000 but less than $50,000', 5, 'option'),
    (@answerId66, @questionId15, '$50,000 but less than $75,000', 6, 'option'),
    (@answerId67, @questionId15, '$75,000 but less than $100,000', 7, 'option'),
    (@answerId68, @questionId15, '$100,000 but less than 150,000', 8, 'option'),
    (@answerId69, @questionId15, '$150,000 but less than $200,000', 9, 'option'),
    (@answerId70, @questionId15, '$200,000 or more', 10, 'option'),
    (@answerId71, @questionId15, 'Don’t know/Prefer not to answer', 11, 'option')


COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
