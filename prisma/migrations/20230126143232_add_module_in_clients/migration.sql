/*
  Warnings:

  - You are about to drop the column `secretSeed` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "secretSeed",
ADD COLUMN     "mnemonic" TEXT,
ADD COLUMN     "module" TEXT,
ADD COLUMN     "secret_seed" TEXT;
