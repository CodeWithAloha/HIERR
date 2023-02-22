BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[SurveyQuestion] (
    [id] NVARCHAR(1000) NOT NULL,
    [question] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [SurveyQuestion_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[SurveyAnswer] (
    [id] NVARCHAR(1000) NOT NULL,
    [questionId] NVARCHAR(1000) NOT NULL,
    [answer] NVARCHAR(1000) NOT NULL,
    [position] INT NOT NULL,
    CONSTRAINT [SurveyAnswer_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[UserSurveyAnswers] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [answerId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [UserSurveyAnswers_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[SurveyAnswer] ADD CONSTRAINT [SurveyAnswer_questionId_fkey] FOREIGN KEY ([questionId]) REFERENCES [dbo].[SurveyQuestion]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserSurveyAnswers] ADD CONSTRAINT [UserSurveyAnswers_answerId_fkey] FOREIGN KEY ([answerId]) REFERENCES [dbo].[SurveyAnswer]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserSurveyAnswers] ADD CONSTRAINT [UserSurveyAnswers_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Question Data
DECLARE @questionId1 uniqueidentifier = NEWID();
DECLARE @questionId2 uniqueidentifier = NEWID();
DECLARE @questionId3 uniqueidentifier = NEWID();

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

INSERT INTO [dbo].[SurveyQuestion] (id, question)
VALUES (@questionId1, 'How are you today?'), (@questionId2, 'Does pineapple belong on pizza?'), (@questionId3, 'On a scale of 1 - 5, how well can you draw?')

INSERT INTO [dbo].[SurveyAnswer] (id, questionId, answer, position)
VALUES (@answerId1, @questionId1 ,'very bad', 1), (@answerId2,@questionId1,'bad', 2), (@answerId3,@questionId1, 'neutral', 3), (@answerId4,@questionId1, 'good', 4), (@answerId5,@questionId1,'very good', 5), (@answerId6,@questionId2,'yes', 1), (@answerId7,@questionId2,'no', 2), (@answerId8,@questionId3,'1', 1), (@answerId9,@questionId3,'2', 2), (@answerId10,@questionId3,'3', 3), (@answerId11,@questionId3,'4', 4), (@answerId12,@questionId3,'5', 5)

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
