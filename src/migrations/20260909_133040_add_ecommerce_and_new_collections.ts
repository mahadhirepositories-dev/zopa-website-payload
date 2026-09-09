import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_life_at_zopa_items_icon" AS ENUM('FaBuilding', 'FaHandshake', 'FaMedal');
  CREATE TYPE "public"."enum_job_ops_jobs_location_type" AS ENUM('On-site', 'Hybrid', 'Remote');
  CREATE TYPE "public"."enum_job_ops_jobs_apply_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_job_ops_jobs_apply_link_appearance" AS ENUM('default');
  CREATE TYPE "public"."enum__pages_v_blocks_life_at_zopa_items_icon" AS ENUM('FaBuilding', 'FaHandshake', 'FaMedal');
  CREATE TYPE "public"."enum__job_ops_v_jobs_location_type" AS ENUM('On-site', 'Hybrid', 'Remote');
  CREATE TYPE "public"."enum__job_ops_v_jobs_apply_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__job_ops_v_jobs_apply_link_appearance" AS ENUM('default');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'customer');
  CREATE TYPE "public"."enum_reviews_status" AS ENUM('pending', 'approved', 'rejected');
  CREATE TYPE "public"."enum_comments_status" AS ENUM('pending', 'approved', 'rejected');
  CREATE TYPE "public"."enum_emails_status" AS ENUM('pending', 'processing', 'sent', 'failed');
  CREATE TYPE "public"."enum_addresses_country" AS ENUM('US', 'GB', 'CA', 'AU', 'AT', 'BE', 'BR', 'BG', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HK', 'HU', 'IN', 'IE', 'IT', 'JP', 'LV', 'LT', 'LU', 'MY', 'MT', 'MX', 'NL', 'NZ', 'NO', 'PL', 'PT', 'RO', 'SG', 'SK', 'SI', 'ES', 'SE', 'CH');
  CREATE TYPE "public"."enum_variants_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__variants_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_products_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full', 'oneQuarter');
  CREATE TYPE "public"."enum_products_blocks_content_columns_style" AS ENUM('default', 'stat');
  CREATE TYPE "public"."enum_products_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_products_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_products_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_products_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_ctau_contact_cards_icon" AS ENUM('FaBriefcase', 'FaInfo', 'FaLinkedin', 'FaAddressBook', 'FiMail', 'FiPhone');
  CREATE TYPE "public"."enum_ctai_items_icon" AS ENUM('Phone', 'FaWhatsapp', 'Mail');
  CREATE TYPE "public"."enum_pc_cards_card_type" AS ENUM('pricing', 'services');
  CREATE TYPE "public"."enum_pc_cards_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pc_cards_cta_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full', 'oneQuarter');
  CREATE TYPE "public"."enum__products_v_blocks_content_columns_style" AS ENUM('default', 'stat');
  CREATE TYPE "public"."enum__products_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__products_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__products_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__products_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__ctau_v_contact_cards_icon" AS ENUM('FaBriefcase', 'FaInfo', 'FaLinkedin', 'FaAddressBook', 'FiMail', 'FiPhone');
  CREATE TYPE "public"."enum__ctai_v_items_icon" AS ENUM('Phone', 'FaWhatsapp', 'Mail');
  CREATE TYPE "public"."enum__pc_v_cards_card_type" AS ENUM('pricing', 'services');
  CREATE TYPE "public"."enum__pc_v_cards_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pc_v_cards_cta_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_carts_currency" AS ENUM('INR');
  CREATE TYPE "public"."enum_orders_status" AS ENUM('processing', 'completed', 'cancelled', 'refunded');
  CREATE TYPE "public"."enum_orders_currency" AS ENUM('INR');
  CREATE TYPE "public"."enum_transactions_payment_method" AS ENUM('razorpay');
  CREATE TYPE "public"."enum_transactions_status" AS ENUM('pending', 'succeeded', 'failed', 'cancelled', 'expired', 'refunded');
  CREATE TYPE "public"."enum_transactions_currency" AS ENUM('INR');
  ALTER TYPE "public"."enum_pages_blocks_contact_us_contact_cards_icon" ADD VALUE 'FiMail';
  ALTER TYPE "public"."enum_pages_blocks_contact_us_contact_cards_icon" ADD VALUE 'FiPhone';
  ALTER TYPE "public"."enum__pages_v_blocks_contact_us_contact_cards_icon" ADD VALUE 'FiMail';
  ALTER TYPE "public"."enum__pages_v_blocks_contact_us_contact_cards_icon" ADD VALUE 'FiPhone';
  CREATE TABLE "pages_blocks_product_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_breadcrumb" boolean DEFAULT true,
  	"show_gallery" boolean DEFAULT true,
  	"heading_override" varchar,
  	"subtitle_override" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_life_at_zopa_items_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "pages_blocks_life_at_zopa_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_life_at_zopa_items_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_life_at_zopa" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "job_ops_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"position" varchar,
  	"city" varchar,
  	"location_type" "enum_job_ops_jobs_location_type" DEFAULT 'Hybrid',
  	"apply_link_type" "enum_job_ops_jobs_apply_link_type" DEFAULT 'reference',
  	"apply_link_new_tab" boolean,
  	"apply_link_url" varchar,
  	"apply_link_label" varchar,
  	"apply_link_appearance" "enum_job_ops_jobs_apply_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "job_ops" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Job Opportunities',
  	"heading" varchar DEFAULT 'Current Openings',
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_sub_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sub_heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_points_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "pages_blocks_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"description" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_terms_and_conditions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_breadcrumb" boolean DEFAULT true,
  	"show_gallery" boolean DEFAULT true,
  	"heading_override" varchar,
  	"subtitle_override" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_life_at_zopa_items_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"point" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_life_at_zopa_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_life_at_zopa_items_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_life_at_zopa" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_job_ops_v_jobs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"position" varchar,
  	"city" varchar,
  	"location_type" "enum__job_ops_v_jobs_location_type" DEFAULT 'Hybrid',
  	"apply_link_type" "enum__job_ops_v_jobs_apply_link_type" DEFAULT 'reference',
  	"apply_link_new_tab" boolean,
  	"apply_link_url" varchar,
  	"apply_link_label" varchar,
  	"apply_link_appearance" "enum__job_ops_v_jobs_apply_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_job_ops_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Job Opportunities',
  	"heading" varchar DEFAULT 'Current Openings',
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_sub_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sub_heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_points_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"point" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"description" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_terms_and_conditions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "_posts_v_version_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_id" integer NOT NULL,
  	"rating" numeric NOT NULL,
  	"text" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"status" "enum_reviews_status" DEFAULT 'pending',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "comments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"post_id" integer NOT NULL,
  	"comment" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"website" varchar,
  	"status" "enum_comments_status" DEFAULT 'pending',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "emails" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order_id" numeric NOT NULL,
  	"to" varchar NOT NULL,
  	"subject" varchar NOT NULL,
  	"html" varchar NOT NULL,
  	"status" "enum_emails_status" DEFAULT 'pending',
  	"attempts" numeric DEFAULT 0,
  	"last_error" varchar,
  	"next_retry_at" timestamp(3) with time zone,
  	"sent_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "addresses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"customer_id" integer,
  	"title" varchar,
  	"first_name" varchar,
  	"last_name" varchar,
  	"company" varchar,
  	"address_line1" varchar,
  	"address_line2" varchar,
  	"city" varchar,
  	"state" varchar,
  	"postal_code" varchar,
  	"country" "enum_addresses_country" NOT NULL,
  	"phone" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "variants" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"product_id" integer,
  	"inventory" numeric DEFAULT 0,
  	"price_in_i_n_r_enabled" boolean,
  	"price_in_i_n_r" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_variants_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "variants_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"variant_options_id" integer
  );
  
  CREATE TABLE "_variants_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_product_id" integer,
  	"version_inventory" numeric DEFAULT 0,
  	"version_price_in_i_n_r_enabled" boolean,
  	"version_price_in_i_n_r" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__variants_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_variants_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"variant_options_id" integer
  );
  
  CREATE TABLE "variant_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "variant_options" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_variantoptions_options_order" varchar,
  	"variant_type_id" integer NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "products_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "products_why_register" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "products_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "products_after_approval" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "products_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_products_blocks_content_columns_size" DEFAULT 'oneThird',
  	"style" "enum_products_blocks_content_columns_style" DEFAULT 'default',
  	"rich_text" jsonb,
  	"stat" varchar,
  	"label" varchar,
  	"enable_link" boolean,
  	"link_type" "enum_products_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_products_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "products_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_products_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_products_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "products_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "ctau_contact_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_ctau_contact_cards_icon",
  	"label" varchar,
  	"value" varchar,
  	"linkedin_url" varchar
  );
  
  CREATE TABLE "ctau" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Contact Us',
  	"subheading" varchar DEFAULT 'Our Experts Always Ready to Work With You',
  	"description" varchar DEFAULT 'Ask about general information. Please send us a message.',
  	"form_heading" varchar DEFAULT 'Contact Us',
  	"form_id" integer,
  	"form_logo_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "ctai_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_ctai_items_icon",
  	"label" varchar,
  	"value" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "ctai" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pc_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "pc_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"card_type" "enum_pc_cards_card_type" DEFAULT 'pricing',
  	"name" varchar,
  	"tagline" varchar,
  	"description" varchar,
  	"background_image_id" integer,
  	"cta_link_type" "enum_pc_cards_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum_pc_cards_cta_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pc" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_about_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"breadcrumb" varchar,
  	"heading" varchar,
  	"content" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_product_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_breadcrumb" boolean DEFAULT true,
  	"show_gallery" boolean DEFAULT true,
  	"heading_override" varchar,
  	"subtitle_override" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"inventory" numeric DEFAULT 0,
  	"enable_variants" boolean,
  	"price_in_i_n_r_enabled" boolean,
  	"price_in_i_n_r" numeric,
  	"title" varchar,
  	"slug" varchar,
  	"description" varchar,
  	"review_description" varchar,
  	"image_id" integer,
  	"subtitle" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_products_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"variant_types_id" integer,
  	"categories_id" integer,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_products_v_version_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_why_register" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_after_approval" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__products_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"style" "enum__products_v_blocks_content_columns_style" DEFAULT 'default',
  	"rich_text" jsonb,
  	"stat" varchar,
  	"label" varchar,
  	"enable_link" boolean,
  	"link_type" "enum__products_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__products_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__products_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__products_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_ctau_v_contact_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__ctau_v_contact_cards_icon",
  	"label" varchar,
  	"value" varchar,
  	"linkedin_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ctau_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Contact Us',
  	"subheading" varchar DEFAULT 'Our Experts Always Ready to Work With You',
  	"description" varchar DEFAULT 'Ask about general information. Please send us a message.',
  	"form_heading" varchar DEFAULT 'Contact Us',
  	"form_id" integer,
  	"form_logo_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_ctai_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__ctai_v_items_icon",
  	"label" varchar,
  	"value" varchar,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ctai_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pc_v_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pc_v_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"card_type" "enum__pc_v_cards_card_type" DEFAULT 'pricing',
  	"name" varchar,
  	"tagline" varchar,
  	"description" varchar,
  	"background_image_id" integer,
  	"cta_link_type" "enum__pc_v_cards_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum__pc_v_cards_cta_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pc_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_about_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"breadcrumb" varchar,
  	"heading" varchar,
  	"content" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_product_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_breadcrumb" boolean DEFAULT true,
  	"show_gallery" boolean DEFAULT true,
  	"heading_override" varchar,
  	"subtitle_override" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_inventory" numeric DEFAULT 0,
  	"version_enable_variants" boolean,
  	"version_price_in_i_n_r_enabled" boolean,
  	"version_price_in_i_n_r" numeric,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_description" varchar,
  	"version_review_description" varchar,
  	"version_image_id" integer,
  	"version_subtitle" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_products_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"variant_types_id" integer,
  	"categories_id" integer,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "carts_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"variant_id" integer,
  	"quantity" numeric DEFAULT 1 NOT NULL
  );
  
  CREATE TABLE "carts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"secret" varchar,
  	"customer_id" integer,
  	"purchased_at" timestamp(3) with time zone,
  	"subtotal" numeric,
  	"currency" "enum_carts_currency" DEFAULT 'INR',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "orders_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"variant_id" integer,
  	"quantity" numeric DEFAULT 1 NOT NULL
  );
  
  CREATE TABLE "orders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"shipping_address_title" varchar,
  	"shipping_address_first_name" varchar,
  	"shipping_address_last_name" varchar,
  	"shipping_address_company" varchar,
  	"shipping_address_address_line1" varchar,
  	"shipping_address_address_line2" varchar,
  	"shipping_address_city" varchar,
  	"shipping_address_state" varchar,
  	"shipping_address_postal_code" varchar,
  	"shipping_address_country" varchar,
  	"shipping_address_phone" varchar,
  	"customer_id" integer,
  	"customer_email" varchar,
  	"status" "enum_orders_status" DEFAULT 'processing',
  	"amount" numeric,
  	"currency" "enum_orders_currency" DEFAULT 'INR',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "orders_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"transactions_id" integer
  );
  
  CREATE TABLE "transactions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"variant_id" integer,
  	"quantity" numeric DEFAULT 1 NOT NULL
  );
  
  CREATE TABLE "transactions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"payment_method" "enum_transactions_payment_method",
  	"razorpay_razorpay_order_i_d" varchar,
  	"razorpay_razorpay_payment_i_d" varchar,
  	"billing_address_title" varchar,
  	"billing_address_first_name" varchar,
  	"billing_address_last_name" varchar,
  	"billing_address_company" varchar,
  	"billing_address_address_line1" varchar,
  	"billing_address_address_line2" varchar,
  	"billing_address_city" varchar,
  	"billing_address_state" varchar,
  	"billing_address_postal_code" varchar,
  	"billing_address_country" varchar,
  	"billing_address_phone" varchar,
  	"status" "enum_transactions_status" DEFAULT 'pending' NOT NULL,
  	"customer_id" integer,
  	"customer_email" varchar,
  	"order_id" integer,
  	"cart_id" integer,
  	"amount" numeric,
  	"currency" "enum_transactions_currency" DEFAULT 'INR',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "outcome_cta_link_cards" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_outcome_cta_link_cards_icon";
  CREATE TYPE "public"."enum_outcome_cta_link_cards_icon" AS ENUM('FaPiggyBank', 'FaPenToSquare', 'FaBoxesStacked', 'FaLightbulb', 'FaGears', 'FaChess', 'FaWandMagicSparkles', 'FaBox', 'FaMoneyBill', 'FaUniversalAccess', 'FaShieldHalved', 'FaClock', 'FaGavel', 'FaBullseye', 'FaChartLine', 'FaLeaf', 'FaClipboard', 'SquarePlayIcon', 'FaMedal');
  ALTER TABLE "outcome_cta_link_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_outcome_cta_link_cards_icon" USING "icon"::"public"."enum_outcome_cta_link_cards_icon";
  ALTER TABLE "_outcome_cta_link_v_cards" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum__outcome_cta_link_v_cards_icon";
  CREATE TYPE "public"."enum__outcome_cta_link_v_cards_icon" AS ENUM('FaPiggyBank', 'FaPenToSquare', 'FaBoxesStacked', 'FaLightbulb', 'FaGears', 'FaChess', 'FaWandMagicSparkles', 'FaBox', 'FaMoneyBill', 'FaUniversalAccess', 'FaShieldHalved', 'FaClock', 'FaGavel', 'FaBullseye', 'FaChartLine', 'FaLeaf', 'FaClipboard', 'SquarePlayIcon', 'FaMedal');
  ALTER TABLE "_outcome_cta_link_v_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__outcome_cta_link_v_cards_icon" USING "icon"::"public"."enum__outcome_cta_link_v_cards_icon";
  ALTER TABLE "pages_blocks_product_statcards" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "outcome_cta_link" ADD COLUMN "cta_card_background_image_id" integer;
  ALTER TABLE "pages_blocks_contact_us" ADD COLUMN "form_heading" varchar DEFAULT 'Contact Us';
  ALTER TABLE "_pages_v_blocks_product_statcards" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "_outcome_cta_link_v" ADD COLUMN "cta_card_background_image_id" integer;
  ALTER TABLE "_pages_v_blocks_contact_us" ADD COLUMN "form_heading" varchar DEFAULT 'Contact Us';
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'customer' NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "reviews_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "comments_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "emails_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "addresses_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "variants_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "variant_types_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "variant_options_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "carts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "orders_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "transactions_id" integer;
  ALTER TABLE "pages_blocks_product_detail" ADD CONSTRAINT "pages_blocks_product_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_life_at_zopa_items_points" ADD CONSTRAINT "pages_blocks_life_at_zopa_items_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_life_at_zopa_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_life_at_zopa_items" ADD CONSTRAINT "pages_blocks_life_at_zopa_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_life_at_zopa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_life_at_zopa" ADD CONSTRAINT "pages_blocks_life_at_zopa_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_ops_jobs" ADD CONSTRAINT "job_ops_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_ops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_ops" ADD CONSTRAINT "job_ops_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_heading" ADD CONSTRAINT "pages_blocks_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_sub_heading" ADD CONSTRAINT "pages_blocks_sub_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_points_points" ADD CONSTRAINT "pages_blocks_points_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_points" ADD CONSTRAINT "pages_blocks_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_description" ADD CONSTRAINT "pages_blocks_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_terms_and_conditions" ADD CONSTRAINT "pages_blocks_terms_and_conditions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_detail" ADD CONSTRAINT "_pages_v_blocks_product_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_life_at_zopa_items_points" ADD CONSTRAINT "_pages_v_blocks_life_at_zopa_items_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_life_at_zopa_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_life_at_zopa_items" ADD CONSTRAINT "_pages_v_blocks_life_at_zopa_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_life_at_zopa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_life_at_zopa" ADD CONSTRAINT "_pages_v_blocks_life_at_zopa_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_job_ops_v_jobs" ADD CONSTRAINT "_job_ops_v_jobs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_job_ops_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_job_ops_v" ADD CONSTRAINT "_job_ops_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_heading" ADD CONSTRAINT "_pages_v_blocks_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sub_heading" ADD CONSTRAINT "_pages_v_blocks_sub_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_points_points" ADD CONSTRAINT "_pages_v_blocks_points_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_points" ADD CONSTRAINT "_pages_v_blocks_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_description" ADD CONSTRAINT "_pages_v_blocks_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_terms_and_conditions" ADD CONSTRAINT "_pages_v_blocks_terms_and_conditions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_faq" ADD CONSTRAINT "posts_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_faq" ADD CONSTRAINT "_posts_v_version_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "addresses" ADD CONSTRAINT "addresses_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "variants" ADD CONSTRAINT "variants_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "variants_rels" ADD CONSTRAINT "variants_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "variants_rels" ADD CONSTRAINT "variants_rels_variant_options_fk" FOREIGN KEY ("variant_options_id") REFERENCES "public"."variant_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_variants_v" ADD CONSTRAINT "_variants_v_parent_id_variants_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."variants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_variants_v" ADD CONSTRAINT "_variants_v_version_product_id_products_id_fk" FOREIGN KEY ("version_product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_variants_v_rels" ADD CONSTRAINT "_variants_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_variants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_variants_v_rels" ADD CONSTRAINT "_variants_v_rels_variant_options_fk" FOREIGN KEY ("variant_options_id") REFERENCES "public"."variant_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "variant_options" ADD CONSTRAINT "variant_options_variant_type_id_variant_types_id_fk" FOREIGN KEY ("variant_type_id") REFERENCES "public"."variant_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_images" ADD CONSTRAINT "products_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_images" ADD CONSTRAINT "products_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_why_register" ADD CONSTRAINT "products_why_register_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_how_it_works" ADD CONSTRAINT "products_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_after_approval" ADD CONSTRAINT "products_after_approval_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_content_columns" ADD CONSTRAINT "products_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_content" ADD CONSTRAINT "products_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_cta_links" ADD CONSTRAINT "products_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_cta" ADD CONSTRAINT "products_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_media_block" ADD CONSTRAINT "products_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_media_block" ADD CONSTRAINT "products_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_form_block" ADD CONSTRAINT "products_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_form_block" ADD CONSTRAINT "products_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ctau_contact_cards" ADD CONSTRAINT "ctau_contact_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ctau"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ctau" ADD CONSTRAINT "ctau_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ctau" ADD CONSTRAINT "ctau_form_logo_id_media_id_fk" FOREIGN KEY ("form_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ctau" ADD CONSTRAINT "ctau_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ctai_items" ADD CONSTRAINT "ctai_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ctai"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ctai" ADD CONSTRAINT "ctai_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pc_cards_features" ADD CONSTRAINT "pc_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pc_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pc_cards" ADD CONSTRAINT "pc_cards_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pc_cards" ADD CONSTRAINT "pc_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pc" ADD CONSTRAINT "pc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_about_section" ADD CONSTRAINT "products_blocks_about_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_product_detail" ADD CONSTRAINT "products_blocks_product_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_variant_types_fk" FOREIGN KEY ("variant_types_id") REFERENCES "public"."variant_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_images" ADD CONSTRAINT "_products_v_version_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_images" ADD CONSTRAINT "_products_v_version_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_why_register" ADD CONSTRAINT "_products_v_version_why_register_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_how_it_works" ADD CONSTRAINT "_products_v_version_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_after_approval" ADD CONSTRAINT "_products_v_version_after_approval_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_content_columns" ADD CONSTRAINT "_products_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_content" ADD CONSTRAINT "_products_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_cta_links" ADD CONSTRAINT "_products_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_cta" ADD CONSTRAINT "_products_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_media_block" ADD CONSTRAINT "_products_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_media_block" ADD CONSTRAINT "_products_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_form_block" ADD CONSTRAINT "_products_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_form_block" ADD CONSTRAINT "_products_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ctau_v_contact_cards" ADD CONSTRAINT "_ctau_v_contact_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ctau_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ctau_v" ADD CONSTRAINT "_ctau_v_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ctau_v" ADD CONSTRAINT "_ctau_v_form_logo_id_media_id_fk" FOREIGN KEY ("form_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ctau_v" ADD CONSTRAINT "_ctau_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ctai_v_items" ADD CONSTRAINT "_ctai_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ctai_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ctai_v" ADD CONSTRAINT "_ctai_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pc_v_cards_features" ADD CONSTRAINT "_pc_v_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pc_v_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pc_v_cards" ADD CONSTRAINT "_pc_v_cards_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pc_v_cards" ADD CONSTRAINT "_pc_v_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pc_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pc_v" ADD CONSTRAINT "_pc_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_about_section" ADD CONSTRAINT "_products_v_blocks_about_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_product_detail" ADD CONSTRAINT "_products_v_blocks_product_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_variant_types_fk" FOREIGN KEY ("variant_types_id") REFERENCES "public"."variant_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carts_items" ADD CONSTRAINT "carts_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "carts_items" ADD CONSTRAINT "carts_items_variant_id_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."variants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "carts_items" ADD CONSTRAINT "carts_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carts" ADD CONSTRAINT "carts_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_variant_id_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."variants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "orders_rels" ADD CONSTRAINT "orders_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders_rels" ADD CONSTRAINT "orders_rels_transactions_fk" FOREIGN KEY ("transactions_id") REFERENCES "public"."transactions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "transactions_items" ADD CONSTRAINT "transactions_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "transactions_items" ADD CONSTRAINT "transactions_items_variant_id_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."variants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "transactions_items" ADD CONSTRAINT "transactions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."transactions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "transactions" ADD CONSTRAINT "transactions_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "transactions" ADD CONSTRAINT "transactions_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "transactions" ADD CONSTRAINT "transactions_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_product_detail_order_idx" ON "pages_blocks_product_detail" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_detail_parent_id_idx" ON "pages_blocks_product_detail" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_detail_path_idx" ON "pages_blocks_product_detail" USING btree ("_path");
  CREATE INDEX "pages_blocks_life_at_zopa_items_points_order_idx" ON "pages_blocks_life_at_zopa_items_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_life_at_zopa_items_points_parent_id_idx" ON "pages_blocks_life_at_zopa_items_points" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_life_at_zopa_items_order_idx" ON "pages_blocks_life_at_zopa_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_life_at_zopa_items_parent_id_idx" ON "pages_blocks_life_at_zopa_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_life_at_zopa_order_idx" ON "pages_blocks_life_at_zopa" USING btree ("_order");
  CREATE INDEX "pages_blocks_life_at_zopa_parent_id_idx" ON "pages_blocks_life_at_zopa" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_life_at_zopa_path_idx" ON "pages_blocks_life_at_zopa" USING btree ("_path");
  CREATE INDEX "job_ops_jobs_order_idx" ON "job_ops_jobs" USING btree ("_order");
  CREATE INDEX "job_ops_jobs_parent_id_idx" ON "job_ops_jobs" USING btree ("_parent_id");
  CREATE INDEX "job_ops_order_idx" ON "job_ops" USING btree ("_order");
  CREATE INDEX "job_ops_parent_id_idx" ON "job_ops" USING btree ("_parent_id");
  CREATE INDEX "job_ops_path_idx" ON "job_ops" USING btree ("_path");
  CREATE INDEX "pages_blocks_heading_order_idx" ON "pages_blocks_heading" USING btree ("_order");
  CREATE INDEX "pages_blocks_heading_parent_id_idx" ON "pages_blocks_heading" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_heading_path_idx" ON "pages_blocks_heading" USING btree ("_path");
  CREATE INDEX "pages_blocks_sub_heading_order_idx" ON "pages_blocks_sub_heading" USING btree ("_order");
  CREATE INDEX "pages_blocks_sub_heading_parent_id_idx" ON "pages_blocks_sub_heading" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_sub_heading_path_idx" ON "pages_blocks_sub_heading" USING btree ("_path");
  CREATE INDEX "pages_blocks_points_points_order_idx" ON "pages_blocks_points_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_points_points_parent_id_idx" ON "pages_blocks_points_points" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_points_order_idx" ON "pages_blocks_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_points_parent_id_idx" ON "pages_blocks_points" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_points_path_idx" ON "pages_blocks_points" USING btree ("_path");
  CREATE INDEX "pages_blocks_description_order_idx" ON "pages_blocks_description" USING btree ("_order");
  CREATE INDEX "pages_blocks_description_parent_id_idx" ON "pages_blocks_description" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_description_path_idx" ON "pages_blocks_description" USING btree ("_path");
  CREATE INDEX "pages_blocks_terms_and_conditions_order_idx" ON "pages_blocks_terms_and_conditions" USING btree ("_order");
  CREATE INDEX "pages_blocks_terms_and_conditions_parent_id_idx" ON "pages_blocks_terms_and_conditions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_terms_and_conditions_path_idx" ON "pages_blocks_terms_and_conditions" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_detail_order_idx" ON "_pages_v_blocks_product_detail" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_detail_parent_id_idx" ON "_pages_v_blocks_product_detail" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_detail_path_idx" ON "_pages_v_blocks_product_detail" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_life_at_zopa_items_points_order_idx" ON "_pages_v_blocks_life_at_zopa_items_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_life_at_zopa_items_points_parent_id_idx" ON "_pages_v_blocks_life_at_zopa_items_points" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_life_at_zopa_items_order_idx" ON "_pages_v_blocks_life_at_zopa_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_life_at_zopa_items_parent_id_idx" ON "_pages_v_blocks_life_at_zopa_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_life_at_zopa_order_idx" ON "_pages_v_blocks_life_at_zopa" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_life_at_zopa_parent_id_idx" ON "_pages_v_blocks_life_at_zopa" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_life_at_zopa_path_idx" ON "_pages_v_blocks_life_at_zopa" USING btree ("_path");
  CREATE INDEX "_job_ops_v_jobs_order_idx" ON "_job_ops_v_jobs" USING btree ("_order");
  CREATE INDEX "_job_ops_v_jobs_parent_id_idx" ON "_job_ops_v_jobs" USING btree ("_parent_id");
  CREATE INDEX "_job_ops_v_order_idx" ON "_job_ops_v" USING btree ("_order");
  CREATE INDEX "_job_ops_v_parent_id_idx" ON "_job_ops_v" USING btree ("_parent_id");
  CREATE INDEX "_job_ops_v_path_idx" ON "_job_ops_v" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_heading_order_idx" ON "_pages_v_blocks_heading" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_heading_parent_id_idx" ON "_pages_v_blocks_heading" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_heading_path_idx" ON "_pages_v_blocks_heading" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_sub_heading_order_idx" ON "_pages_v_blocks_sub_heading" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_sub_heading_parent_id_idx" ON "_pages_v_blocks_sub_heading" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_sub_heading_path_idx" ON "_pages_v_blocks_sub_heading" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_points_points_order_idx" ON "_pages_v_blocks_points_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_points_points_parent_id_idx" ON "_pages_v_blocks_points_points" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_points_order_idx" ON "_pages_v_blocks_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_points_parent_id_idx" ON "_pages_v_blocks_points" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_points_path_idx" ON "_pages_v_blocks_points" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_description_order_idx" ON "_pages_v_blocks_description" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_description_parent_id_idx" ON "_pages_v_blocks_description" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_description_path_idx" ON "_pages_v_blocks_description" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_terms_and_conditions_order_idx" ON "_pages_v_blocks_terms_and_conditions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_terms_and_conditions_parent_id_idx" ON "_pages_v_blocks_terms_and_conditions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_terms_and_conditions_path_idx" ON "_pages_v_blocks_terms_and_conditions" USING btree ("_path");
  CREATE INDEX "posts_faq_order_idx" ON "posts_faq" USING btree ("_order");
  CREATE INDEX "posts_faq_parent_id_idx" ON "posts_faq" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_faq_order_idx" ON "_posts_v_version_faq" USING btree ("_order");
  CREATE INDEX "_posts_v_version_faq_parent_id_idx" ON "_posts_v_version_faq" USING btree ("_parent_id");
  CREATE INDEX "reviews_product_idx" ON "reviews" USING btree ("product_id");
  CREATE INDEX "reviews_updated_at_idx" ON "reviews" USING btree ("updated_at");
  CREATE INDEX "reviews_created_at_idx" ON "reviews" USING btree ("created_at");
  CREATE INDEX "comments_post_idx" ON "comments" USING btree ("post_id");
  CREATE INDEX "comments_updated_at_idx" ON "comments" USING btree ("updated_at");
  CREATE INDEX "comments_created_at_idx" ON "comments" USING btree ("created_at");
  CREATE UNIQUE INDEX "emails_order_id_idx" ON "emails" USING btree ("order_id");
  CREATE INDEX "emails_status_idx" ON "emails" USING btree ("status");
  CREATE INDEX "emails_updated_at_idx" ON "emails" USING btree ("updated_at");
  CREATE INDEX "emails_created_at_idx" ON "emails" USING btree ("created_at");
  CREATE INDEX "addresses_customer_idx" ON "addresses" USING btree ("customer_id");
  CREATE INDEX "addresses_updated_at_idx" ON "addresses" USING btree ("updated_at");
  CREATE INDEX "addresses_created_at_idx" ON "addresses" USING btree ("created_at");
  CREATE INDEX "variants_product_idx" ON "variants" USING btree ("product_id");
  CREATE INDEX "variants_updated_at_idx" ON "variants" USING btree ("updated_at");
  CREATE INDEX "variants_created_at_idx" ON "variants" USING btree ("created_at");
  CREATE INDEX "variants_deleted_at_idx" ON "variants" USING btree ("deleted_at");
  CREATE INDEX "variants__status_idx" ON "variants" USING btree ("_status");
  CREATE INDEX "variants_rels_order_idx" ON "variants_rels" USING btree ("order");
  CREATE INDEX "variants_rels_parent_idx" ON "variants_rels" USING btree ("parent_id");
  CREATE INDEX "variants_rels_path_idx" ON "variants_rels" USING btree ("path");
  CREATE INDEX "variants_rels_variant_options_id_idx" ON "variants_rels" USING btree ("variant_options_id");
  CREATE INDEX "_variants_v_parent_idx" ON "_variants_v" USING btree ("parent_id");
  CREATE INDEX "_variants_v_version_version_product_idx" ON "_variants_v" USING btree ("version_product_id");
  CREATE INDEX "_variants_v_version_version_updated_at_idx" ON "_variants_v" USING btree ("version_updated_at");
  CREATE INDEX "_variants_v_version_version_created_at_idx" ON "_variants_v" USING btree ("version_created_at");
  CREATE INDEX "_variants_v_version_version_deleted_at_idx" ON "_variants_v" USING btree ("version_deleted_at");
  CREATE INDEX "_variants_v_version_version__status_idx" ON "_variants_v" USING btree ("version__status");
  CREATE INDEX "_variants_v_created_at_idx" ON "_variants_v" USING btree ("created_at");
  CREATE INDEX "_variants_v_updated_at_idx" ON "_variants_v" USING btree ("updated_at");
  CREATE INDEX "_variants_v_latest_idx" ON "_variants_v" USING btree ("latest");
  CREATE INDEX "_variants_v_autosave_idx" ON "_variants_v" USING btree ("autosave");
  CREATE INDEX "_variants_v_rels_order_idx" ON "_variants_v_rels" USING btree ("order");
  CREATE INDEX "_variants_v_rels_parent_idx" ON "_variants_v_rels" USING btree ("parent_id");
  CREATE INDEX "_variants_v_rels_path_idx" ON "_variants_v_rels" USING btree ("path");
  CREATE INDEX "_variants_v_rels_variant_options_id_idx" ON "_variants_v_rels" USING btree ("variant_options_id");
  CREATE INDEX "variant_types_updated_at_idx" ON "variant_types" USING btree ("updated_at");
  CREATE INDEX "variant_types_created_at_idx" ON "variant_types" USING btree ("created_at");
  CREATE INDEX "variant_types_deleted_at_idx" ON "variant_types" USING btree ("deleted_at");
  CREATE INDEX "variant_options__variantoptions_options_order_idx" ON "variant_options" USING btree ("_variantoptions_options_order");
  CREATE INDEX "variant_options_variant_type_idx" ON "variant_options" USING btree ("variant_type_id");
  CREATE INDEX "variant_options_updated_at_idx" ON "variant_options" USING btree ("updated_at");
  CREATE INDEX "variant_options_created_at_idx" ON "variant_options" USING btree ("created_at");
  CREATE INDEX "variant_options_deleted_at_idx" ON "variant_options" USING btree ("deleted_at");
  CREATE INDEX "products_images_order_idx" ON "products_images" USING btree ("_order");
  CREATE INDEX "products_images_parent_id_idx" ON "products_images" USING btree ("_parent_id");
  CREATE INDEX "products_images_image_idx" ON "products_images" USING btree ("image_id");
  CREATE INDEX "products_why_register_order_idx" ON "products_why_register" USING btree ("_order");
  CREATE INDEX "products_why_register_parent_id_idx" ON "products_why_register" USING btree ("_parent_id");
  CREATE INDEX "products_how_it_works_order_idx" ON "products_how_it_works" USING btree ("_order");
  CREATE INDEX "products_how_it_works_parent_id_idx" ON "products_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "products_after_approval_order_idx" ON "products_after_approval" USING btree ("_order");
  CREATE INDEX "products_after_approval_parent_id_idx" ON "products_after_approval" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_content_columns_order_idx" ON "products_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "products_blocks_content_columns_parent_id_idx" ON "products_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_content_order_idx" ON "products_blocks_content" USING btree ("_order");
  CREATE INDEX "products_blocks_content_parent_id_idx" ON "products_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_content_path_idx" ON "products_blocks_content" USING btree ("_path");
  CREATE INDEX "products_blocks_cta_links_order_idx" ON "products_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "products_blocks_cta_links_parent_id_idx" ON "products_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_cta_order_idx" ON "products_blocks_cta" USING btree ("_order");
  CREATE INDEX "products_blocks_cta_parent_id_idx" ON "products_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_cta_path_idx" ON "products_blocks_cta" USING btree ("_path");
  CREATE INDEX "products_blocks_media_block_order_idx" ON "products_blocks_media_block" USING btree ("_order");
  CREATE INDEX "products_blocks_media_block_parent_id_idx" ON "products_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_media_block_path_idx" ON "products_blocks_media_block" USING btree ("_path");
  CREATE INDEX "products_blocks_media_block_media_idx" ON "products_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "products_blocks_form_block_order_idx" ON "products_blocks_form_block" USING btree ("_order");
  CREATE INDEX "products_blocks_form_block_parent_id_idx" ON "products_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_form_block_path_idx" ON "products_blocks_form_block" USING btree ("_path");
  CREATE INDEX "products_blocks_form_block_form_idx" ON "products_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "ctau_contact_cards_order_idx" ON "ctau_contact_cards" USING btree ("_order");
  CREATE INDEX "ctau_contact_cards_parent_id_idx" ON "ctau_contact_cards" USING btree ("_parent_id");
  CREATE INDEX "ctau_order_idx" ON "ctau" USING btree ("_order");
  CREATE INDEX "ctau_parent_id_idx" ON "ctau" USING btree ("_parent_id");
  CREATE INDEX "ctau_path_idx" ON "ctau" USING btree ("_path");
  CREATE INDEX "ctau_form_idx" ON "ctau" USING btree ("form_id");
  CREATE INDEX "ctau_form_logo_idx" ON "ctau" USING btree ("form_logo_id");
  CREATE INDEX "ctai_items_order_idx" ON "ctai_items" USING btree ("_order");
  CREATE INDEX "ctai_items_parent_id_idx" ON "ctai_items" USING btree ("_parent_id");
  CREATE INDEX "ctai_order_idx" ON "ctai" USING btree ("_order");
  CREATE INDEX "ctai_parent_id_idx" ON "ctai" USING btree ("_parent_id");
  CREATE INDEX "ctai_path_idx" ON "ctai" USING btree ("_path");
  CREATE INDEX "pc_cards_features_order_idx" ON "pc_cards_features" USING btree ("_order");
  CREATE INDEX "pc_cards_features_parent_id_idx" ON "pc_cards_features" USING btree ("_parent_id");
  CREATE INDEX "pc_cards_order_idx" ON "pc_cards" USING btree ("_order");
  CREATE INDEX "pc_cards_parent_id_idx" ON "pc_cards" USING btree ("_parent_id");
  CREATE INDEX "pc_cards_background_image_idx" ON "pc_cards" USING btree ("background_image_id");
  CREATE INDEX "pc_order_idx" ON "pc" USING btree ("_order");
  CREATE INDEX "pc_parent_id_idx" ON "pc" USING btree ("_parent_id");
  CREATE INDEX "pc_path_idx" ON "pc" USING btree ("_path");
  CREATE INDEX "products_blocks_about_section_order_idx" ON "products_blocks_about_section" USING btree ("_order");
  CREATE INDEX "products_blocks_about_section_parent_id_idx" ON "products_blocks_about_section" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_about_section_path_idx" ON "products_blocks_about_section" USING btree ("_path");
  CREATE INDEX "products_blocks_product_detail_order_idx" ON "products_blocks_product_detail" USING btree ("_order");
  CREATE INDEX "products_blocks_product_detail_parent_id_idx" ON "products_blocks_product_detail" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_product_detail_path_idx" ON "products_blocks_product_detail" USING btree ("_path");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_image_idx" ON "products" USING btree ("image_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products_deleted_at_idx" ON "products" USING btree ("deleted_at");
  CREATE INDEX "products__status_idx" ON "products" USING btree ("_status");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_variant_types_id_idx" ON "products_rels" USING btree ("variant_types_id");
  CREATE INDEX "products_rels_categories_id_idx" ON "products_rels" USING btree ("categories_id");
  CREATE INDEX "products_rels_pages_id_idx" ON "products_rels" USING btree ("pages_id");
  CREATE INDEX "products_rels_posts_id_idx" ON "products_rels" USING btree ("posts_id");
  CREATE INDEX "_products_v_version_images_order_idx" ON "_products_v_version_images" USING btree ("_order");
  CREATE INDEX "_products_v_version_images_parent_id_idx" ON "_products_v_version_images" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_images_image_idx" ON "_products_v_version_images" USING btree ("image_id");
  CREATE INDEX "_products_v_version_why_register_order_idx" ON "_products_v_version_why_register" USING btree ("_order");
  CREATE INDEX "_products_v_version_why_register_parent_id_idx" ON "_products_v_version_why_register" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_how_it_works_order_idx" ON "_products_v_version_how_it_works" USING btree ("_order");
  CREATE INDEX "_products_v_version_how_it_works_parent_id_idx" ON "_products_v_version_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_after_approval_order_idx" ON "_products_v_version_after_approval" USING btree ("_order");
  CREATE INDEX "_products_v_version_after_approval_parent_id_idx" ON "_products_v_version_after_approval" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_content_columns_order_idx" ON "_products_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_content_columns_parent_id_idx" ON "_products_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_content_order_idx" ON "_products_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_content_parent_id_idx" ON "_products_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_content_path_idx" ON "_products_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_cta_links_order_idx" ON "_products_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_cta_links_parent_id_idx" ON "_products_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_cta_order_idx" ON "_products_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_cta_parent_id_idx" ON "_products_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_cta_path_idx" ON "_products_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_media_block_order_idx" ON "_products_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_media_block_parent_id_idx" ON "_products_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_media_block_path_idx" ON "_products_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_media_block_media_idx" ON "_products_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_products_v_blocks_form_block_order_idx" ON "_products_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_form_block_parent_id_idx" ON "_products_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_form_block_path_idx" ON "_products_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_form_block_form_idx" ON "_products_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_ctau_v_contact_cards_order_idx" ON "_ctau_v_contact_cards" USING btree ("_order");
  CREATE INDEX "_ctau_v_contact_cards_parent_id_idx" ON "_ctau_v_contact_cards" USING btree ("_parent_id");
  CREATE INDEX "_ctau_v_order_idx" ON "_ctau_v" USING btree ("_order");
  CREATE INDEX "_ctau_v_parent_id_idx" ON "_ctau_v" USING btree ("_parent_id");
  CREATE INDEX "_ctau_v_path_idx" ON "_ctau_v" USING btree ("_path");
  CREATE INDEX "_ctau_v_form_idx" ON "_ctau_v" USING btree ("form_id");
  CREATE INDEX "_ctau_v_form_logo_idx" ON "_ctau_v" USING btree ("form_logo_id");
  CREATE INDEX "_ctai_v_items_order_idx" ON "_ctai_v_items" USING btree ("_order");
  CREATE INDEX "_ctai_v_items_parent_id_idx" ON "_ctai_v_items" USING btree ("_parent_id");
  CREATE INDEX "_ctai_v_order_idx" ON "_ctai_v" USING btree ("_order");
  CREATE INDEX "_ctai_v_parent_id_idx" ON "_ctai_v" USING btree ("_parent_id");
  CREATE INDEX "_ctai_v_path_idx" ON "_ctai_v" USING btree ("_path");
  CREATE INDEX "_pc_v_cards_features_order_idx" ON "_pc_v_cards_features" USING btree ("_order");
  CREATE INDEX "_pc_v_cards_features_parent_id_idx" ON "_pc_v_cards_features" USING btree ("_parent_id");
  CREATE INDEX "_pc_v_cards_order_idx" ON "_pc_v_cards" USING btree ("_order");
  CREATE INDEX "_pc_v_cards_parent_id_idx" ON "_pc_v_cards" USING btree ("_parent_id");
  CREATE INDEX "_pc_v_cards_background_image_idx" ON "_pc_v_cards" USING btree ("background_image_id");
  CREATE INDEX "_pc_v_order_idx" ON "_pc_v" USING btree ("_order");
  CREATE INDEX "_pc_v_parent_id_idx" ON "_pc_v" USING btree ("_parent_id");
  CREATE INDEX "_pc_v_path_idx" ON "_pc_v" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_about_section_order_idx" ON "_products_v_blocks_about_section" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_about_section_parent_id_idx" ON "_products_v_blocks_about_section" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_about_section_path_idx" ON "_products_v_blocks_about_section" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_product_detail_order_idx" ON "_products_v_blocks_product_detail" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_product_detail_parent_id_idx" ON "_products_v_blocks_product_detail" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_product_detail_path_idx" ON "_products_v_blocks_product_detail" USING btree ("_path");
  CREATE INDEX "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  CREATE INDEX "_products_v_version_version_image_idx" ON "_products_v" USING btree ("version_image_id");
  CREATE INDEX "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX "_products_v_version_version_deleted_at_idx" ON "_products_v" USING btree ("version_deleted_at");
  CREATE INDEX "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  CREATE INDEX "_products_v_autosave_idx" ON "_products_v" USING btree ("autosave");
  CREATE INDEX "_products_v_rels_order_idx" ON "_products_v_rels" USING btree ("order");
  CREATE INDEX "_products_v_rels_parent_idx" ON "_products_v_rels" USING btree ("parent_id");
  CREATE INDEX "_products_v_rels_path_idx" ON "_products_v_rels" USING btree ("path");
  CREATE INDEX "_products_v_rels_variant_types_id_idx" ON "_products_v_rels" USING btree ("variant_types_id");
  CREATE INDEX "_products_v_rels_categories_id_idx" ON "_products_v_rels" USING btree ("categories_id");
  CREATE INDEX "_products_v_rels_pages_id_idx" ON "_products_v_rels" USING btree ("pages_id");
  CREATE INDEX "_products_v_rels_posts_id_idx" ON "_products_v_rels" USING btree ("posts_id");
  CREATE INDEX "carts_items_order_idx" ON "carts_items" USING btree ("_order");
  CREATE INDEX "carts_items_parent_id_idx" ON "carts_items" USING btree ("_parent_id");
  CREATE INDEX "carts_items_product_idx" ON "carts_items" USING btree ("product_id");
  CREATE INDEX "carts_items_variant_idx" ON "carts_items" USING btree ("variant_id");
  CREATE INDEX "carts_secret_idx" ON "carts" USING btree ("secret");
  CREATE INDEX "carts_customer_idx" ON "carts" USING btree ("customer_id");
  CREATE INDEX "carts_updated_at_idx" ON "carts" USING btree ("updated_at");
  CREATE INDEX "carts_created_at_idx" ON "carts" USING btree ("created_at");
  CREATE INDEX "orders_items_order_idx" ON "orders_items" USING btree ("_order");
  CREATE INDEX "orders_items_parent_id_idx" ON "orders_items" USING btree ("_parent_id");
  CREATE INDEX "orders_items_product_idx" ON "orders_items" USING btree ("product_id");
  CREATE INDEX "orders_items_variant_idx" ON "orders_items" USING btree ("variant_id");
  CREATE INDEX "orders_customer_idx" ON "orders" USING btree ("customer_id");
  CREATE INDEX "orders_updated_at_idx" ON "orders" USING btree ("updated_at");
  CREATE INDEX "orders_created_at_idx" ON "orders" USING btree ("created_at");
  CREATE INDEX "orders_rels_order_idx" ON "orders_rels" USING btree ("order");
  CREATE INDEX "orders_rels_parent_idx" ON "orders_rels" USING btree ("parent_id");
  CREATE INDEX "orders_rels_path_idx" ON "orders_rels" USING btree ("path");
  CREATE INDEX "orders_rels_transactions_id_idx" ON "orders_rels" USING btree ("transactions_id");
  CREATE INDEX "transactions_items_order_idx" ON "transactions_items" USING btree ("_order");
  CREATE INDEX "transactions_items_parent_id_idx" ON "transactions_items" USING btree ("_parent_id");
  CREATE INDEX "transactions_items_product_idx" ON "transactions_items" USING btree ("product_id");
  CREATE INDEX "transactions_items_variant_idx" ON "transactions_items" USING btree ("variant_id");
  CREATE INDEX "transactions_customer_idx" ON "transactions" USING btree ("customer_id");
  CREATE INDEX "transactions_order_idx" ON "transactions" USING btree ("order_id");
  CREATE INDEX "transactions_cart_idx" ON "transactions" USING btree ("cart_id");
  CREATE INDEX "transactions_updated_at_idx" ON "transactions" USING btree ("updated_at");
  CREATE INDEX "transactions_created_at_idx" ON "transactions" USING btree ("created_at");
  ALTER TABLE "pages_blocks_product_statcards" ADD CONSTRAINT "pages_blocks_product_statcards_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "outcome_cta_link" ADD CONSTRAINT "outcome_cta_link_cta_card_background_image_id_media_id_fk" FOREIGN KEY ("cta_card_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_statcards" ADD CONSTRAINT "_pages_v_blocks_product_statcards_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_outcome_cta_link_v" ADD CONSTRAINT "_outcome_cta_link_v_cta_card_background_image_id_media_id_fk" FOREIGN KEY ("cta_card_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_comments_fk" FOREIGN KEY ("comments_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_emails_fk" FOREIGN KEY ("emails_id") REFERENCES "public"."emails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_addresses_fk" FOREIGN KEY ("addresses_id") REFERENCES "public"."addresses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_variants_fk" FOREIGN KEY ("variants_id") REFERENCES "public"."variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_variant_types_fk" FOREIGN KEY ("variant_types_id") REFERENCES "public"."variant_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_variant_options_fk" FOREIGN KEY ("variant_options_id") REFERENCES "public"."variant_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_carts_fk" FOREIGN KEY ("carts_id") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_transactions_fk" FOREIGN KEY ("transactions_id") REFERENCES "public"."transactions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_product_statcards_background_image_idx" ON "pages_blocks_product_statcards" USING btree ("background_image_id");
  CREATE INDEX "outcome_cta_link_cta_card_cta_card_background_image_idx" ON "outcome_cta_link" USING btree ("cta_card_background_image_id");
  CREATE INDEX "_pages_v_blocks_product_statcards_background_image_idx" ON "_pages_v_blocks_product_statcards" USING btree ("background_image_id");
  CREATE INDEX "_outcome_cta_link_v_cta_card_cta_card_background_image_idx" ON "_outcome_cta_link_v" USING btree ("cta_card_background_image_id");
  CREATE INDEX "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id");
  CREATE INDEX "payload_locked_documents_rels_comments_id_idx" ON "payload_locked_documents_rels" USING btree ("comments_id");
  CREATE INDEX "payload_locked_documents_rels_emails_id_idx" ON "payload_locked_documents_rels" USING btree ("emails_id");
  CREATE INDEX "payload_locked_documents_rels_addresses_id_idx" ON "payload_locked_documents_rels" USING btree ("addresses_id");
  CREATE INDEX "payload_locked_documents_rels_variants_id_idx" ON "payload_locked_documents_rels" USING btree ("variants_id");
  CREATE INDEX "payload_locked_documents_rels_variant_types_id_idx" ON "payload_locked_documents_rels" USING btree ("variant_types_id");
  CREATE INDEX "payload_locked_documents_rels_variant_options_id_idx" ON "payload_locked_documents_rels" USING btree ("variant_options_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_carts_id_idx" ON "payload_locked_documents_rels" USING btree ("carts_id");
  CREATE INDEX "payload_locked_documents_rels_orders_id_idx" ON "payload_locked_documents_rels" USING btree ("orders_id");
  CREATE INDEX "payload_locked_documents_rels_transactions_id_idx" ON "payload_locked_documents_rels" USING btree ("transactions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_product_detail" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_life_at_zopa_items_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_life_at_zopa_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_life_at_zopa" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "job_ops_jobs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "job_ops" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_heading" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_sub_heading" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_points_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_description" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_terms_and_conditions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_detail" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_life_at_zopa_items_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_life_at_zopa_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_life_at_zopa" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_job_ops_v_jobs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_job_ops_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_heading" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_sub_heading" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_points_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_description" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_terms_and_conditions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reviews" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "emails" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "addresses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "variants_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_variants_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_variants_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "variant_types" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "variant_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_why_register" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_how_it_works" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_after_approval" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ctau_contact_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ctau" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ctai_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ctai" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pc_cards_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pc_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pc" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_about_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_blocks_product_detail" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_why_register" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_how_it_works" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_after_approval" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_ctau_v_contact_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_ctau_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_ctai_v_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_ctai_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pc_v_cards_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pc_v_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pc_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_about_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_blocks_product_detail" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "carts_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "carts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "orders_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "orders" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "orders_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "transactions_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "transactions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_product_detail" CASCADE;
  DROP TABLE "pages_blocks_life_at_zopa_items_points" CASCADE;
  DROP TABLE "pages_blocks_life_at_zopa_items" CASCADE;
  DROP TABLE "pages_blocks_life_at_zopa" CASCADE;
  DROP TABLE "job_ops_jobs" CASCADE;
  DROP TABLE "job_ops" CASCADE;
  DROP TABLE "pages_blocks_heading" CASCADE;
  DROP TABLE "pages_blocks_sub_heading" CASCADE;
  DROP TABLE "pages_blocks_points_points" CASCADE;
  DROP TABLE "pages_blocks_points" CASCADE;
  DROP TABLE "pages_blocks_description" CASCADE;
  DROP TABLE "pages_blocks_terms_and_conditions" CASCADE;
  DROP TABLE "_pages_v_blocks_product_detail" CASCADE;
  DROP TABLE "_pages_v_blocks_life_at_zopa_items_points" CASCADE;
  DROP TABLE "_pages_v_blocks_life_at_zopa_items" CASCADE;
  DROP TABLE "_pages_v_blocks_life_at_zopa" CASCADE;
  DROP TABLE "_job_ops_v_jobs" CASCADE;
  DROP TABLE "_job_ops_v" CASCADE;
  DROP TABLE "_pages_v_blocks_heading" CASCADE;
  DROP TABLE "_pages_v_blocks_sub_heading" CASCADE;
  DROP TABLE "_pages_v_blocks_points_points" CASCADE;
  DROP TABLE "_pages_v_blocks_points" CASCADE;
  DROP TABLE "_pages_v_blocks_description" CASCADE;
  DROP TABLE "_pages_v_blocks_terms_and_conditions" CASCADE;
  DROP TABLE "posts_faq" CASCADE;
  DROP TABLE "_posts_v_version_faq" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "comments" CASCADE;
  DROP TABLE "emails" CASCADE;
  DROP TABLE "addresses" CASCADE;
  DROP TABLE "variants" CASCADE;
  DROP TABLE "variants_rels" CASCADE;
  DROP TABLE "_variants_v" CASCADE;
  DROP TABLE "_variants_v_rels" CASCADE;
  DROP TABLE "variant_types" CASCADE;
  DROP TABLE "variant_options" CASCADE;
  DROP TABLE "products_images" CASCADE;
  DROP TABLE "products_why_register" CASCADE;
  DROP TABLE "products_how_it_works" CASCADE;
  DROP TABLE "products_after_approval" CASCADE;
  DROP TABLE "products_blocks_content_columns" CASCADE;
  DROP TABLE "products_blocks_content" CASCADE;
  DROP TABLE "products_blocks_cta_links" CASCADE;
  DROP TABLE "products_blocks_cta" CASCADE;
  DROP TABLE "products_blocks_media_block" CASCADE;
  DROP TABLE "products_blocks_form_block" CASCADE;
  DROP TABLE "ctau_contact_cards" CASCADE;
  DROP TABLE "ctau" CASCADE;
  DROP TABLE "ctai_items" CASCADE;
  DROP TABLE "ctai" CASCADE;
  DROP TABLE "pc_cards_features" CASCADE;
  DROP TABLE "pc_cards" CASCADE;
  DROP TABLE "pc" CASCADE;
  DROP TABLE "products_blocks_about_section" CASCADE;
  DROP TABLE "products_blocks_product_detail" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "_products_v_version_images" CASCADE;
  DROP TABLE "_products_v_version_why_register" CASCADE;
  DROP TABLE "_products_v_version_how_it_works" CASCADE;
  DROP TABLE "_products_v_version_after_approval" CASCADE;
  DROP TABLE "_products_v_blocks_content_columns" CASCADE;
  DROP TABLE "_products_v_blocks_content" CASCADE;
  DROP TABLE "_products_v_blocks_cta_links" CASCADE;
  DROP TABLE "_products_v_blocks_cta" CASCADE;
  DROP TABLE "_products_v_blocks_media_block" CASCADE;
  DROP TABLE "_products_v_blocks_form_block" CASCADE;
  DROP TABLE "_ctau_v_contact_cards" CASCADE;
  DROP TABLE "_ctau_v" CASCADE;
  DROP TABLE "_ctai_v_items" CASCADE;
  DROP TABLE "_ctai_v" CASCADE;
  DROP TABLE "_pc_v_cards_features" CASCADE;
  DROP TABLE "_pc_v_cards" CASCADE;
  DROP TABLE "_pc_v" CASCADE;
  DROP TABLE "_products_v_blocks_about_section" CASCADE;
  DROP TABLE "_products_v_blocks_product_detail" CASCADE;
  DROP TABLE "_products_v" CASCADE;
  DROP TABLE "_products_v_rels" CASCADE;
  DROP TABLE "carts_items" CASCADE;
  DROP TABLE "carts" CASCADE;
  DROP TABLE "orders_items" CASCADE;
  DROP TABLE "orders" CASCADE;
  DROP TABLE "orders_rels" CASCADE;
  DROP TABLE "transactions_items" CASCADE;
  DROP TABLE "transactions" CASCADE;
  ALTER TABLE "pages_blocks_product_statcards" DROP CONSTRAINT "pages_blocks_product_statcards_background_image_id_media_id_fk";
  
  ALTER TABLE "outcome_cta_link" DROP CONSTRAINT "outcome_cta_link_cta_card_background_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_product_statcards" DROP CONSTRAINT "_pages_v_blocks_product_statcards_background_image_id_media_id_fk";
  
  ALTER TABLE "_outcome_cta_link_v" DROP CONSTRAINT "_outcome_cta_link_v_cta_card_background_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_reviews_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_comments_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_emails_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_addresses_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_variants_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_variant_types_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_variant_options_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_products_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_carts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_orders_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_transactions_fk";
  
  ALTER TABLE "outcome_cta_link_cards" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_outcome_cta_link_cards_icon";
  CREATE TYPE "public"."enum_outcome_cta_link_cards_icon" AS ENUM('FaPiggyBank', 'FaPenToSquare', 'FaBoxesStacked', 'FaLightbulb', 'FaGears', 'FaChess', 'FaWandMagicSparkles', 'FaBox', 'FaMoneyBill', 'FaUniversalAccess', 'FaShieldHalved', 'FaClock', 'FaGavel', 'FaBullseye', 'FaChartLine', 'FaLeaf', 'FaClipboard', 'FaRegSquare', 'FaMedal');
  ALTER TABLE "outcome_cta_link_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_outcome_cta_link_cards_icon" USING "icon"::"public"."enum_outcome_cta_link_cards_icon";
  ALTER TABLE "pages_blocks_contact_us_contact_cards" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_contact_us_contact_cards_icon";
  CREATE TYPE "public"."enum_pages_blocks_contact_us_contact_cards_icon" AS ENUM('FaBriefcase', 'FaInfo', 'FaLinkedin', 'FaAddressBook');
  ALTER TABLE "pages_blocks_contact_us_contact_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_contact_us_contact_cards_icon" USING "icon"::"public"."enum_pages_blocks_contact_us_contact_cards_icon";
  ALTER TABLE "_outcome_cta_link_v_cards" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum__outcome_cta_link_v_cards_icon";
  CREATE TYPE "public"."enum__outcome_cta_link_v_cards_icon" AS ENUM('FaPiggyBank', 'FaPenToSquare', 'FaBoxesStacked', 'FaLightbulb', 'FaGears', 'FaChess', 'FaWandMagicSparkles', 'FaBox', 'FaMoneyBill', 'FaUniversalAccess', 'FaShieldHalved', 'FaClock', 'FaGavel', 'FaBullseye', 'FaChartLine', 'FaLeaf', 'FaClipboard', 'FaRegSquare', 'FaMedal');
  ALTER TABLE "_outcome_cta_link_v_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__outcome_cta_link_v_cards_icon" USING "icon"::"public"."enum__outcome_cta_link_v_cards_icon";
  ALTER TABLE "_pages_v_blocks_contact_us_contact_cards" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_blocks_contact_us_contact_cards_icon";
  CREATE TYPE "public"."enum__pages_v_blocks_contact_us_contact_cards_icon" AS ENUM('FaBriefcase', 'FaInfo', 'FaLinkedin', 'FaAddressBook');
  ALTER TABLE "_pages_v_blocks_contact_us_contact_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__pages_v_blocks_contact_us_contact_cards_icon" USING "icon"::"public"."enum__pages_v_blocks_contact_us_contact_cards_icon";
  DROP INDEX "pages_blocks_product_statcards_background_image_idx";
  DROP INDEX "outcome_cta_link_cta_card_cta_card_background_image_idx";
  DROP INDEX "_pages_v_blocks_product_statcards_background_image_idx";
  DROP INDEX "_outcome_cta_link_v_cta_card_cta_card_background_image_idx";
  DROP INDEX "payload_locked_documents_rels_reviews_id_idx";
  DROP INDEX "payload_locked_documents_rels_comments_id_idx";
  DROP INDEX "payload_locked_documents_rels_emails_id_idx";
  DROP INDEX "payload_locked_documents_rels_addresses_id_idx";
  DROP INDEX "payload_locked_documents_rels_variants_id_idx";
  DROP INDEX "payload_locked_documents_rels_variant_types_id_idx";
  DROP INDEX "payload_locked_documents_rels_variant_options_id_idx";
  DROP INDEX "payload_locked_documents_rels_products_id_idx";
  DROP INDEX "payload_locked_documents_rels_carts_id_idx";
  DROP INDEX "payload_locked_documents_rels_orders_id_idx";
  DROP INDEX "payload_locked_documents_rels_transactions_id_idx";
  ALTER TABLE "pages_blocks_product_statcards" DROP COLUMN "background_image_id";
  ALTER TABLE "outcome_cta_link" DROP COLUMN "cta_card_background_image_id";
  ALTER TABLE "pages_blocks_contact_us" DROP COLUMN "form_heading";
  ALTER TABLE "_pages_v_blocks_product_statcards" DROP COLUMN "background_image_id";
  ALTER TABLE "_outcome_cta_link_v" DROP COLUMN "cta_card_background_image_id";
  ALTER TABLE "_pages_v_blocks_contact_us" DROP COLUMN "form_heading";
  ALTER TABLE "users" DROP COLUMN "role";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "reviews_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "comments_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "emails_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "addresses_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "variants_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "variant_types_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "variant_options_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "products_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "carts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "orders_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "transactions_id";
  DROP TYPE "public"."enum_pages_blocks_life_at_zopa_items_icon";
  DROP TYPE "public"."enum_job_ops_jobs_location_type";
  DROP TYPE "public"."enum_job_ops_jobs_apply_link_type";
  DROP TYPE "public"."enum_job_ops_jobs_apply_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_life_at_zopa_items_icon";
  DROP TYPE "public"."enum__job_ops_v_jobs_location_type";
  DROP TYPE "public"."enum__job_ops_v_jobs_apply_link_type";
  DROP TYPE "public"."enum__job_ops_v_jobs_apply_link_appearance";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_reviews_status";
  DROP TYPE "public"."enum_comments_status";
  DROP TYPE "public"."enum_emails_status";
  DROP TYPE "public"."enum_addresses_country";
  DROP TYPE "public"."enum_variants_status";
  DROP TYPE "public"."enum__variants_v_version_status";
  DROP TYPE "public"."enum_products_blocks_content_columns_size";
  DROP TYPE "public"."enum_products_blocks_content_columns_style";
  DROP TYPE "public"."enum_products_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_products_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_products_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_products_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_ctau_contact_cards_icon";
  DROP TYPE "public"."enum_ctai_items_icon";
  DROP TYPE "public"."enum_pc_cards_card_type";
  DROP TYPE "public"."enum_pc_cards_cta_link_type";
  DROP TYPE "public"."enum_pc_cards_cta_link_appearance";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum__products_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__products_v_blocks_content_columns_style";
  DROP TYPE "public"."enum__products_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__products_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__products_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__products_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__ctau_v_contact_cards_icon";
  DROP TYPE "public"."enum__ctai_v_items_icon";
  DROP TYPE "public"."enum__pc_v_cards_card_type";
  DROP TYPE "public"."enum__pc_v_cards_cta_link_type";
  DROP TYPE "public"."enum__pc_v_cards_cta_link_appearance";
  DROP TYPE "public"."enum__products_v_version_status";
  DROP TYPE "public"."enum_carts_currency";
  DROP TYPE "public"."enum_orders_status";
  DROP TYPE "public"."enum_orders_currency";
  DROP TYPE "public"."enum_transactions_payment_method";
  DROP TYPE "public"."enum_transactions_status";
  DROP TYPE "public"."enum_transactions_currency";`)
}
