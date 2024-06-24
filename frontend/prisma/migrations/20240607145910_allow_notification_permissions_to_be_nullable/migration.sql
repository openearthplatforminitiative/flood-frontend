-- AlterTable
ALTER TABLE "User"
ALTER COLUMN "allow_push_notifications" DROP NOT NULL,
ALTER COLUMN "allow_sms_notifications" DROP NOT NULL;
