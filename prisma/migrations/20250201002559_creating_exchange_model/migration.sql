-- CreateTable
CREATE TABLE "Exchange" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "present" TEXT NOT NULL,
    "santaId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,

    CONSTRAINT "Exchange_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_santaId_fkey" FOREIGN KEY ("santaId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
