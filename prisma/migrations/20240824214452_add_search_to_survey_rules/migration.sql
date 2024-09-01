/*
  Warnings:

  - You are about to drop the column `questionId` on the `SurveyRules` table. All the data in the column will be lost.
  - You are about to drop the column `requiredAnswerId` on the `SurveyRules` table. All the data in the column will be lost.
  - Added the required column `search` to the `SurveyRules` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[SurveyRules] DROP COLUMN [questionId],
[requiredAnswerId];
ALTER TABLE [dbo].[SurveyRules] ADD [search] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
