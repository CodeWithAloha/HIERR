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
    (@questionId3, 'What is your gender?', 3, 'option')
--     (
--         @questionId4,
--         'Including yourself, how many persons, in total, live in your household?',
--         4, 'number'
--     ),
--     (
--         @questionId5,
--         'Which of the following best describes your current employment status?',
--         5, 'option'
--     ),
--     (
--         @questionId6,
--         'Do you currently have, or did you have a non-dial-up internet subscription (i.e., cellular data, cable, fiber optic, DSL, satellite) during the pandemic?',
--         6, 'option'
--     ),
-- ,
--     (
--         @questionId7,
--         'Do you currently have, or did you have health insurance during the pandemic? 
-- ',
--         7, 'option'
--     ),
-- ,
--     (
--         @questionId8,
--         'Are you currently living in a… (Select one answer)
-- ',
--         8, 'option'
--     ),
-- ,
--     (
--         @questionId9,
--         'Is your housing structure above… (Select one answer)
-- ',
--         9, 'option'
--     ),
-- ,
--     (
--         @questionId10,
--         'What is your ethnic identification? If more than one ethnicity, which do you identify most. 
-- If you cannot choose, please select mixed. If you have any Hawaiian in your ethnic mix, please select Hawaiian/Part Hawaiian
-- ',
--         10, 'option'
--     ),
--     (
--         @questionId11,
--         'What is the highest level of education you have completed? (Select one answer)
-- ',
--         11, 'option'
--     ),
--     (
--         @questionId12,
--         'Do you identify with having a disability?',
--         12, 'option'
--     ),
-- (
--         @questionId13,
--         'What was your household income in 2022, before taxes? Please consider and include in your thinking your best estimate of the income of all persons living in your household. (Select one answer)',
--         13, 'option'
--     )
INSERT INTO
    [dbo].[SurveyAnswer] (id, questionId, answer, position, answerType)
VALUES
    (@answerId1, @questionId1, 'yes', 1, 'option'),
    (@answerId2, @questionId1, 'no', 2, 'option'),
    (@answerId3, @questionId2, '', 1, 'text'),
    (@answerId4, @questionId3, 'Female', 1, 'option'),
    (@answerId5, @questionId3, 'Male', 2, 'option'),
    (@answerId6, @questionId3, 'Other,', 3, 'optionText')

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
