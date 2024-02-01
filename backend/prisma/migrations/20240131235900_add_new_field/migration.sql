/*
  Warnings:

  - A unique constraint covering the columns `[idExterno]` on the table `livro` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idExterno` to the `livro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "livro" ADD COLUMN     "idExterno" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "livro_idExterno_key" ON "livro"("idExterno");
