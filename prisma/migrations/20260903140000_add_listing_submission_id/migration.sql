ALTER TABLE "Ilan"
ADD COLUMN "submissionId" TEXT;

CREATE UNIQUE INDEX "Ilan_submissionId_key" ON "Ilan"("submissionId");