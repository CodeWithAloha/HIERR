/*
  Warnings:

  - You are about to drop the column `answerId` on the `UserSurveyAnswers` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[UserSurveyAnswers] DROP CONSTRAINT [UserSurveyAnswers_answerId_fkey];

-- AlterTable
ALTER TABLE [dbo].[UserSurveyAnswers] DROP COLUMN [answerId];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
