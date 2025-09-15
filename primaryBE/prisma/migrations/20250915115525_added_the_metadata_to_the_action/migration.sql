-- AlterTable
ALTER TABLE "public"."Action" ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}';
