/*
  Warnings:

  - Added the required column `answerId` to the `UserSurveyAnswers` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[UserSurveyAnswers] ADD [answerId] NVARCHAR(1000) NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[PolisSurveys] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [showForAnswers] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [PolisSurveys_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
