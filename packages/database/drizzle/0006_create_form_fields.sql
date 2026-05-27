DO $$ BEGIN
 CREATE TYPE "public"."field_type_enum" AS ENUM('TEXT','EMAIL','NUMBER','YES_NO','PASSWORD','SELECT','DATE','RATING');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "form_fields" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"form_id" uuid,
	"label" varchar(100) NOT NULL,
	"label_key" varchar(100) NOT NULL,
	"description" text,
	"placeholder" text,
	"is_required" boolean DEFAULT false NOT NULL,
	"index" numeric NOT NULL,
	"type" "public"."field_type_enum" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);--> statement-breakpoint

ALTER TABLE "form_fields"
  ADD CONSTRAINT "form_fields_form_id_forms_id_fk"
  FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id")
  ON DELETE no action ON UPDATE no action;--> statement-breakpoint

