-- CreateTable
CREATE TABLE "public"."zapRunOutbox" (
    "id" TEXT NOT NULL,
    "zapRunID" TEXT NOT NULL,

    CONSTRAINT "zapRunOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "zapRunOutbox_zapRunID_key" ON "public"."zapRunOutbox"("zapRunID");

-- AddForeignKey
ALTER TABLE "public"."zapRunOutbox" ADD CONSTRAINT "zapRunOutbox_zapRunID_fkey" FOREIGN KEY ("zapRunID") REFERENCES "public"."ZapRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
