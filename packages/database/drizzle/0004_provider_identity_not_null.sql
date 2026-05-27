UPDATE "users"
SET
  "provider" = COALESCE("provider", 'password'),
  "provider_id" = COALESCE("provider_id", "email");--> statement-breakpoint
DROP INDEX IF EXISTS "users_provider_account_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "provider" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "provider_id" SET NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "users_provider_account_unique" ON "users" USING btree ("provider","provider_id");
