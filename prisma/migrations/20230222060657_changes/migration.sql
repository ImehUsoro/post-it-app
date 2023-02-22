/*
  Warnings:

  - Added the required column `user` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessGranted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isAdministrator" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "user" TEXT NOT NULL;
