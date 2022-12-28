/*
  Warnings:

  - You are about to drop the column `localizationsId` on the `users` table. All the data in the column will be lost.
  - Added the required column `userId` to the `localizations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_localizationsId_fkey";

-- AlterTable
ALTER TABLE "localizations" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "localizationsId";

-- AddForeignKey
ALTER TABLE "localizations" ADD CONSTRAINT "localizations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
