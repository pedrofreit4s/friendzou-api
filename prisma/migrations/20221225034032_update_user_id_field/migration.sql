/*
  Warnings:

  - You are about to drop the column `userId` on the `account_codes` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `account_codes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "account_codes" DROP CONSTRAINT "account_codes_userId_fkey";

-- AlterTable
ALTER TABLE "account_codes" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "account_codes" ADD CONSTRAINT "account_codes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
