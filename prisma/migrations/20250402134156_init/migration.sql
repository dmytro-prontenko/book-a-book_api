/*
  Warnings:

  - You are about to drop the `BookBase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "BookBase";

-- CreateTable
CREATE TABLE "BookBase2" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cover_image" TEXT NOT NULL,
    "status" "BookStatus" NOT NULL DEFAULT 'available',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookBase2_pkey" PRIMARY KEY ("id")
);
