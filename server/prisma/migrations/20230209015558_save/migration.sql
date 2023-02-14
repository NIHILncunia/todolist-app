/*
  Warnings:

  - You are about to alter the column `todo` on the `todo` table. The data in that column could be lost. The data in that column will be cast from `Char(255)` to `VarChar(240)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `userName` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE `todo` MODIFY `todo` VARCHAR(240) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `email` VARCHAR(30) NOT NULL,
    MODIFY `userName` VARCHAR(30) NOT NULL,
    MODIFY `password` VARCHAR(30) NOT NULL;
