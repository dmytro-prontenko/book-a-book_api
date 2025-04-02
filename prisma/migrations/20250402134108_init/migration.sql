-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('available', 'reserved', 'checked_out', 'overdue');

-- CreateTable
CREATE TABLE "BookBase" (
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

    CONSTRAINT "BookBase_pkey" PRIMARY KEY ("id")
);
