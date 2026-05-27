ALTER TABLE "users" ADD COLUMN "provider" varchar(20);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "provider_id" varchar(255);--> statement-breakpoint
CREATE UNIQUE INDEX "users_provider_account_unique" ON "users" USING btree ("provider","provider_id");

