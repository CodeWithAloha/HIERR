/*
  Warnings:

  - A unique constraint covering the columns `[xid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[User] ADD [xid] NVARCHAR(1000);

-- CreateIndex
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_xid_key] UNIQUE NONCLUSTERED ([xid]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
