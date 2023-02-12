/*
  Warnings:

  - A unique constraint covering the columns `[censusTractId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[User] ADD [censusTractId] NVARCHAR(1000);

-- CreateTable
CREATE TABLE [dbo].[CensusTract] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [CensusTract_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_censusTractId_key] UNIQUE NONCLUSTERED ([censusTractId]);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_censusTractId_fkey] FOREIGN KEY ([censusTractId]) REFERENCES [dbo].[CensusTract]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
