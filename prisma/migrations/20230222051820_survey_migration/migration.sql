BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[SurveyQuestion] (
    [id] NVARCHAR(1000) NOT NULL,
    [question] NVARCHAR(1000) NOT NULL,
    [position] INT NOT NULL,
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
    [questionId] NVARCHAR(1000) NOT NULL,
    [answerId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [UserSurveyAnswers_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[SurveyAnswer] ADD CONSTRAINT [SurveyAnswer_questionId_fkey] FOREIGN KEY ([questionId]) REFERENCES [dbo].[SurveyQuestion]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserSurveyAnswers] ADD CONSTRAINT [UserSurveyAnswers_answerId_fkey] FOREIGN KEY ([answerId]) REFERENCES [dbo].[SurveyAnswer]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserSurveyAnswers] ADD CONSTRAINT [UserSurveyAnswers_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserSurveyAnswers] ADD CONSTRAINT [UserSurveyAnswers_questionId_fkey] FOREIGN KEY ([questionId]) REFERENCES [dbo].[SurveyQuestion]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;


COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
