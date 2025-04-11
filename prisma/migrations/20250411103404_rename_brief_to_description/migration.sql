/*
  Warnings:

  - You are about to drop the column `brief` on the `Blogs` table. All the data in the column will be lost.
  - Added the required column `description` to the `Blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blogs" DROP COLUMN "brief",
ADD COLUMN     "description" TEXT NOT NULL;
