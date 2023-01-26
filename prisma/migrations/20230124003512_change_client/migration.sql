/*
  Warnings:

  - You are about to drop the column `agencia` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `alphanumericSignature` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `conta` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `eletronicPassword` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `eletronicSignature` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `clients` table. All the data in the column will be lost.
  - Added the required column `secretSeed` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "agencia",
DROP COLUMN "alphanumericSignature",
DROP COLUMN "conta",
DROP COLUMN "eletronicPassword",
DROP COLUMN "eletronicSignature",
DROP COLUMN "password",
ADD COLUMN     "secretSeed" TEXT NOT NULL;
