-- CreateTable
CREATE TABLE "tools" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "tools_pkey" PRIMARY KEY ("id")
);
