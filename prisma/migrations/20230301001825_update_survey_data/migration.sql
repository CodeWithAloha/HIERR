/*
  Warnings:

  - Added the required column `answerType` to the `SurveyAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionType` to the `SurveyQuestion` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[SurveyAnswer] ADD [answerType] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[SurveyQuestion] ADD [questionType] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
