-- AlterTable
ALTER TABLE "users" ADD COLUMN     "localizationsId" TEXT;

-- CreateTable
CREATE TABLE "localizations" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "localizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "localizations_code_key" ON "localizations"("code");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_localizationsId_fkey" FOREIGN KEY ("localizationsId") REFERENCES "localizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
