-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_designationId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "designationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "Designation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
