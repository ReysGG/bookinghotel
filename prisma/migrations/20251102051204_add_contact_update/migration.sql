/*
  Warnings:

  - Added the required column `email` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
