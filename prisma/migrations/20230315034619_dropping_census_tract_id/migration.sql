/*
  Warnings:

  - You are about to drop the column `censusTractId` on the `User` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_censusTractId_key];

-- AlterTable
ALTER TABLE [dbo].[User] DROP COLUMN [censusTractId];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
