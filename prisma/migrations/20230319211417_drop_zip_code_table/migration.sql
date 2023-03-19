/*
  Warnings:

  - You are about to drop the `ZipCode` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[ZipCode] DROP CONSTRAINT [ZipCode_userId_fkey];

-- AlterTable
ALTER TABLE [dbo].[User] ADD [zipcode] NVARCHAR(1000);

-- DropTable
DROP TABLE [dbo].[ZipCode];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
