-- CreateTable
CREATE TABLE "livro" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "autor" TEXT,
    "qtdPaginas" INTEGER,
    "miniatura" TEXT,
    "avaliacao" INTEGER,
    "opiniao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "livro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "livro_titulo_key" ON "livro"("titulo");
