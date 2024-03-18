/*
  Warnings:

  - You are about to drop the column `showForAnswers` on the `PolisSurveys` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[PolisSurveys] DROP COLUMN [showForAnswers];

-- CreateTable
CREATE TABLE [dbo].[SurveyRules] (
    [id] NVARCHAR(1000) NOT NULL,
    [surveyId] NVARCHAR(1000) NOT NULL,
    [questionId] NVARCHAR(1000) NOT NULL,
    [requiredAnswerId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [SurveyRules_pkey] PRIMARY KEY CLUSTERED ([id])
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
