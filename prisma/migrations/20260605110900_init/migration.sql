-- CreateTable
CREATE TABLE "Ilan" (
    "id" TEXT NOT NULL,
    "baslik" TEXT NOT NULL,
    "aciklama" TEXT NOT NULL,
    "fiyat" DOUBLE PRECISION NOT NULL,
    "kategori" TEXT NOT NULL,
    "konum" TEXT,
    "resimler" TEXT NOT NULL,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ilan_pkey" PRIMARY KEY ("id")
);
