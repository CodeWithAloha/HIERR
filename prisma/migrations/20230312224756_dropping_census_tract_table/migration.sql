/*
  Warnings:

  - You are about to drop the `CensusTract` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_censusTractId_fkey];

-- AlterTable
ALTER TABLE [dbo].[User] ADD [censustract] NVARCHAR(1000);

-- DropTable
DROP TABLE [dbo].[CensusTract];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
