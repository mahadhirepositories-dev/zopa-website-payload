import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_blog_section_view_more_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_blog_section_view_more_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_full_width_banner_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_full_width_banner_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_about_us_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_about_us_cta_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_vision_mission_values_icon" AS ENUM('Bot', 'ShieldCheck', 'Shield', 'PiggyBank', 'HandCoins');
  CREATE TYPE "public"."enum_pages_blocks_procurement_solutions_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_procurement_solutions_cta_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_services_section_services_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_svc_layout" AS ENUM('imageLeft', 'imageRight');
  CREATE TYPE "public"."enum_svc_display_type" AS ENUM('item', 'feature');
  CREATE TYPE "public"."enum_svc_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_svc_cta_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pricing_cards_link_cards_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pricing_cards_link_cards_cta_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_outcome_cta_link_cta_card_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_outcome_cta_link_cta_card_cta_link_appearance" AS ENUM('default');
  CREATE TYPE "public"."enum__pages_v_blocks_blog_section_view_more_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_blog_section_view_more_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_full_width_banner_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_full_width_banner_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_about_us_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_about_us_cta_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_vision_mission_values_icon" AS ENUM('Bot', 'ShieldCheck', 'Shield', 'PiggyBank', 'HandCoins');
  CREATE TYPE "public"."enum__pages_v_blocks_procurement_solutions_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_procurement_solutions_cta_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_services_section_services_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__svc_v_layout" AS ENUM('imageLeft', 'imageRight');
  CREATE TYPE "public"."enum__svc_v_display_type" AS ENUM('item', 'feature');
  CREATE TYPE "public"."enum__svc_v_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__svc_v_cta_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pricing_cards_link_v_cards_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pricing_cards_link_v_cards_cta_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__outcome_cta_link_v_cta_card_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__outcome_cta_link_v_cta_card_cta_link_appearance" AS ENUM('default');
  CREATE TYPE "public"."enum_header_nav_items_children_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_cta_button_type" AS ENUM('reference', 'custom');
  CREATE TABLE "pages_blocks_blog_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"title" varchar,
  	"limit" numeric DEFAULT 2,
  	"view_more_link_type" "enum_pages_blocks_blog_section_view_more_link_type" DEFAULT 'reference',
  	"view_more_link_new_tab" boolean,
  	"view_more_link_url" varchar,
  	"view_more_link_label" varchar,
  	"view_more_link_appearance" "enum_pages_blocks_blog_section_view_more_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_full_width_banner_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_full_width_banner_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_full_width_banner_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_full_width_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"logo_id" integer,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"breadcrumb" varchar,
  	"heading" varchar,
  	"content" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_us_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "pages_blocks_about_us_card_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "pages_blocks_about_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"label" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"card_title" varchar,
  	"cta_link_type" "enum_pages_blocks_about_us_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum_pages_blocks_about_us_cta_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_vision_mission_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_vision_mission_values_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_vision_mission" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"vision_title" varchar,
  	"vision_description" varchar,
  	"mission_title" varchar,
  	"mission_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_procurement_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"media_id" integer,
  	"cta_link_type" "enum_pages_blocks_procurement_solutions_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum_pages_blocks_procurement_solutions_cta_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_section_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"link_type" "enum_pages_blocks_services_section_services_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "pages_blocks_services_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "svc_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "svc_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "svc" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_svc_layout" DEFAULT 'imageLeft',
  	"badge" varchar,
  	"title" varchar,
  	"section_id" varchar,
  	"description" varchar,
  	"sub_heading" varchar,
  	"display_type" "enum_svc_display_type" DEFAULT 'item',
  	"media_id" integer,
  	"cta_link_type" "enum_svc_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum_svc_cta_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_service_detail_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_how_we_work_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_how_we_work" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_interest_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"background_image_id" integer,
  	"overlay_heading" varchar,
  	"overlay_description" varchar,
  	"contact_phone" varchar,
  	"contact_email" varchar,
  	"form_heading" varchar,
  	"form_id" integer,
  	"form_logo_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pricing_cards_link_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "pricing_cards_link_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"tagline" varchar,
  	"description" varchar,
  	"cta_link_type" "enum_pricing_cards_link_cards_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum_pricing_cards_link_cards_cta_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pricing_cards_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_who_can_benefit_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_who_can_benefit" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Who can benefit:',
  	"block_name" varchar
  );
  
  CREATE TABLE "outcome_cta_link_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "outcome_cta_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"heading" varchar,
  	"cta_card_heading" varchar DEFAULT 'Call Us Today to Schedule to understand more!',
  	"cta_card_cta_link_type" "enum_outcome_cta_link_cta_card_cta_link_type" DEFAULT 'reference',
  	"cta_card_cta_link_new_tab" boolean,
  	"cta_card_cta_link_url" varchar,
  	"cta_card_cta_link_label" varchar,
  	"cta_card_cta_link_appearance" "enum_outcome_cta_link_cta_card_cta_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_who_benefit_detail_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_who_benefit_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Who Benefits from',
  	"heading" varchar DEFAULT 'PROCUREMENT AS A SERVICE (PaaS)',
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_blog_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"title" varchar,
  	"limit" numeric DEFAULT 2,
  	"view_more_link_type" "enum__pages_v_blocks_blog_section_view_more_link_type" DEFAULT 'reference',
  	"view_more_link_new_tab" boolean,
  	"view_more_link_url" varchar,
  	"view_more_link_label" varchar,
  	"view_more_link_appearance" "enum__pages_v_blocks_blog_section_view_more_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_full_width_banner_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_full_width_banner_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_full_width_banner_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_full_width_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"logo_id" integer,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_section" (
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
  
  CREATE TABLE "_pages_v_blocks_about_us_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_us_card_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"point" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"label" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"card_title" varchar,
  	"cta_link_type" "enum__pages_v_blocks_about_us_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum__pages_v_blocks_about_us_cta_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_vision_mission_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_vision_mission_values_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_vision_mission" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"vision_title" varchar,
  	"vision_description" varchar,
  	"mission_title" varchar,
  	"mission_description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_procurement_solutions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"media_id" integer,
  	"cta_link_type" "enum__pages_v_blocks_procurement_solutions_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum__pages_v_blocks_procurement_solutions_cta_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_section_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"link_type" "enum__pages_v_blocks_services_section_services_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_svc_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_svc_v_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_svc_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum__svc_v_layout" DEFAULT 'imageLeft',
  	"badge" varchar,
  	"title" varchar,
  	"section_id" varchar,
  	"description" varchar,
  	"sub_heading" varchar,
  	"display_type" "enum__svc_v_display_type" DEFAULT 'item',
  	"media_id" integer,
  	"cta_link_type" "enum__svc_v_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum__svc_v_cta_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_detail_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_how_we_work_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_how_we_work" (
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
  
  CREATE TABLE "_pages_v_blocks_interest_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"background_image_id" integer,
  	"overlay_heading" varchar,
  	"overlay_description" varchar,
  	"contact_phone" varchar,
  	"contact_email" varchar,
  	"form_heading" varchar,
  	"form_id" integer,
  	"form_logo_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pricing_cards_link_v_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pricing_cards_link_v_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"tagline" varchar,
  	"description" varchar,
  	"cta_link_type" "enum__pricing_cards_link_v_cards_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum__pricing_cards_link_v_cards_cta_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pricing_cards_link_v" (
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
  
  CREATE TABLE "_pages_v_blocks_who_can_benefit_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_who_can_benefit" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Who can benefit:',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_outcome_cta_link_v_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_outcome_cta_link_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar,
  	"heading" varchar,
  	"cta_card_heading" varchar DEFAULT 'Call Us Today to Schedule to understand more!',
  	"cta_card_cta_link_type" "enum__outcome_cta_link_v_cta_card_cta_link_type" DEFAULT 'reference',
  	"cta_card_cta_link_new_tab" boolean,
  	"cta_card_cta_link_url" varchar,
  	"cta_card_cta_link_label" varchar,
  	"cta_card_cta_link_appearance" "enum__outcome_cta_link_v_cta_card_cta_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_who_benefit_detail_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_who_benefit_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge" varchar DEFAULT 'Who Benefits from',
  	"heading" varchar DEFAULT 'PROCUREMENT AS A SERVICE (PaaS)',
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "header_nav_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_children_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  ALTER TABLE "footer_nav_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "footer_nav_items" CASCADE;
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_label" DROP NOT NULL;
  ALTER TABLE "header" ALTER COLUMN "ctalink_label" DROP NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "hero_logo_id" integer;
  ALTER TABLE "pages" ADD COLUMN "hero_heading" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_logo_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_heading" varchar;
  ALTER TABLE "footer" ADD COLUMN "cta_heading" varchar DEFAULT 'Ready to Save 20% on Procurement Costs?';
  ALTER TABLE "footer" ADD COLUMN "cta_description" varchar DEFAULT 'Speak with our procurement specialists to explore tailored strategies that drive measurable savings and operational excellence. Book your session today and start benefiting from personalized procurement insights.';
  ALTER TABLE "footer" ADD COLUMN "cta_button_type" "enum_footer_cta_button_type" DEFAULT 'reference';
  ALTER TABLE "footer" ADD COLUMN "cta_button_new_tab" boolean;
  ALTER TABLE "footer" ADD COLUMN "cta_button_url" varchar;
  ALTER TABLE "footer" ADD COLUMN "cta_button_label" varchar;
  ALTER TABLE "footer" ADD COLUMN "cta_logo_id" integer;
  ALTER TABLE "footer" ADD COLUMN "contact_address" varchar DEFAULT 'Hyderabad,
  India';
  ALTER TABLE "footer" ADD COLUMN "contact_phone" varchar DEFAULT '+917075452105';
  ALTER TABLE "footer" ADD COLUMN "contact_email" varchar DEFAULT 'grow@zopapro.com';
  ALTER TABLE "footer" ADD COLUMN "copyright" varchar DEFAULT '2026 © ZOPA. All rights reserved.';
  ALTER TABLE "pages_blocks_blog_section" ADD CONSTRAINT "pages_blocks_blog_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_full_width_banner_links" ADD CONSTRAINT "pages_blocks_full_width_banner_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_full_width_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_full_width_banner" ADD CONSTRAINT "pages_blocks_full_width_banner_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_full_width_banner" ADD CONSTRAINT "pages_blocks_full_width_banner_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_full_width_banner" ADD CONSTRAINT "pages_blocks_full_width_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_section" ADD CONSTRAINT "pages_blocks_about_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_us_features" ADD CONSTRAINT "pages_blocks_about_us_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_us_card_points" ADD CONSTRAINT "pages_blocks_about_us_card_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_us" ADD CONSTRAINT "pages_blocks_about_us_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_us" ADD CONSTRAINT "pages_blocks_about_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vision_mission_values" ADD CONSTRAINT "pages_blocks_vision_mission_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vision_mission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vision_mission" ADD CONSTRAINT "pages_blocks_vision_mission_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_procurement_solutions" ADD CONSTRAINT "pages_blocks_procurement_solutions_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_procurement_solutions" ADD CONSTRAINT "pages_blocks_procurement_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_section_services" ADD CONSTRAINT "pages_blocks_services_section_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_section" ADD CONSTRAINT "pages_blocks_services_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "svc_items" ADD CONSTRAINT "svc_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."svc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "svc_features" ADD CONSTRAINT "svc_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."svc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "svc" ADD CONSTRAINT "svc_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "svc" ADD CONSTRAINT "svc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_detail_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_detail_section" ADD CONSTRAINT "pages_blocks_service_detail_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_we_work_steps" ADD CONSTRAINT "pages_blocks_how_we_work_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_how_we_work"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_we_work" ADD CONSTRAINT "pages_blocks_how_we_work_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_interest_form" ADD CONSTRAINT "pages_blocks_interest_form_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_interest_form" ADD CONSTRAINT "pages_blocks_interest_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_interest_form" ADD CONSTRAINT "pages_blocks_interest_form_form_logo_id_media_id_fk" FOREIGN KEY ("form_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_interest_form" ADD CONSTRAINT "pages_blocks_interest_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_cards_link_cards_features" ADD CONSTRAINT "pricing_cards_link_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_cards_link_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_cards_link_cards" ADD CONSTRAINT "pricing_cards_link_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_cards_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_cards_link" ADD CONSTRAINT "pricing_cards_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_can_benefit_items" ADD CONSTRAINT "pages_blocks_who_can_benefit_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_who_can_benefit"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_can_benefit" ADD CONSTRAINT "pages_blocks_who_can_benefit_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "outcome_cta_link_cards" ADD CONSTRAINT "outcome_cta_link_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."outcome_cta_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "outcome_cta_link" ADD CONSTRAINT "outcome_cta_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_benefit_detail_sections" ADD CONSTRAINT "pages_blocks_who_benefit_detail_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_who_benefit_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_benefit_detail" ADD CONSTRAINT "pages_blocks_who_benefit_detail_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_benefit_detail" ADD CONSTRAINT "pages_blocks_who_benefit_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_section" ADD CONSTRAINT "_pages_v_blocks_blog_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_full_width_banner_links" ADD CONSTRAINT "_pages_v_blocks_full_width_banner_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_full_width_banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_full_width_banner" ADD CONSTRAINT "_pages_v_blocks_full_width_banner_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_full_width_banner" ADD CONSTRAINT "_pages_v_blocks_full_width_banner_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_full_width_banner" ADD CONSTRAINT "_pages_v_blocks_full_width_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_section" ADD CONSTRAINT "_pages_v_blocks_about_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_us_features" ADD CONSTRAINT "_pages_v_blocks_about_us_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_us_card_points" ADD CONSTRAINT "_pages_v_blocks_about_us_card_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_us" ADD CONSTRAINT "_pages_v_blocks_about_us_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_us" ADD CONSTRAINT "_pages_v_blocks_about_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vision_mission_values" ADD CONSTRAINT "_pages_v_blocks_vision_mission_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_vision_mission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vision_mission" ADD CONSTRAINT "_pages_v_blocks_vision_mission_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_procurement_solutions" ADD CONSTRAINT "_pages_v_blocks_procurement_solutions_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_procurement_solutions" ADD CONSTRAINT "_pages_v_blocks_procurement_solutions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_section_services" ADD CONSTRAINT "_pages_v_blocks_services_section_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_section" ADD CONSTRAINT "_pages_v_blocks_services_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_svc_v_items" ADD CONSTRAINT "_svc_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_svc_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_svc_v_features" ADD CONSTRAINT "_svc_v_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_svc_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_svc_v" ADD CONSTRAINT "_svc_v_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_svc_v" ADD CONSTRAINT "_svc_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_detail_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_detail_section" ADD CONSTRAINT "_pages_v_blocks_service_detail_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_we_work_steps" ADD CONSTRAINT "_pages_v_blocks_how_we_work_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_how_we_work"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_we_work" ADD CONSTRAINT "_pages_v_blocks_how_we_work_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_interest_form" ADD CONSTRAINT "_pages_v_blocks_interest_form_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_interest_form" ADD CONSTRAINT "_pages_v_blocks_interest_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_interest_form" ADD CONSTRAINT "_pages_v_blocks_interest_form_form_logo_id_media_id_fk" FOREIGN KEY ("form_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_interest_form" ADD CONSTRAINT "_pages_v_blocks_interest_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pricing_cards_link_v_cards_features" ADD CONSTRAINT "_pricing_cards_link_v_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pricing_cards_link_v_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pricing_cards_link_v_cards" ADD CONSTRAINT "_pricing_cards_link_v_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pricing_cards_link_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pricing_cards_link_v" ADD CONSTRAINT "_pricing_cards_link_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_can_benefit_items" ADD CONSTRAINT "_pages_v_blocks_who_can_benefit_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_who_can_benefit"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_can_benefit" ADD CONSTRAINT "_pages_v_blocks_who_can_benefit_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_outcome_cta_link_v_cards" ADD CONSTRAINT "_outcome_cta_link_v_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_outcome_cta_link_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_outcome_cta_link_v" ADD CONSTRAINT "_outcome_cta_link_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_benefit_detail_sections" ADD CONSTRAINT "_pages_v_blocks_who_benefit_detail_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_who_benefit_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_benefit_detail" ADD CONSTRAINT "_pages_v_blocks_who_benefit_detail_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_benefit_detail" ADD CONSTRAINT "_pages_v_blocks_who_benefit_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_blog_section_order_idx" ON "pages_blocks_blog_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_section_parent_id_idx" ON "pages_blocks_blog_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_section_path_idx" ON "pages_blocks_blog_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_full_width_banner_links_order_idx" ON "pages_blocks_full_width_banner_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_full_width_banner_links_parent_id_idx" ON "pages_blocks_full_width_banner_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_full_width_banner_order_idx" ON "pages_blocks_full_width_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_full_width_banner_parent_id_idx" ON "pages_blocks_full_width_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_full_width_banner_path_idx" ON "pages_blocks_full_width_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_full_width_banner_media_idx" ON "pages_blocks_full_width_banner" USING btree ("media_id");
  CREATE INDEX "pages_blocks_full_width_banner_logo_idx" ON "pages_blocks_full_width_banner" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_about_section_order_idx" ON "pages_blocks_about_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_section_parent_id_idx" ON "pages_blocks_about_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_section_path_idx" ON "pages_blocks_about_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_us_features_order_idx" ON "pages_blocks_about_us_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_us_features_parent_id_idx" ON "pages_blocks_about_us_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_us_card_points_order_idx" ON "pages_blocks_about_us_card_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_us_card_points_parent_id_idx" ON "pages_blocks_about_us_card_points" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_us_order_idx" ON "pages_blocks_about_us" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_us_parent_id_idx" ON "pages_blocks_about_us" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_us_path_idx" ON "pages_blocks_about_us" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_us_image_idx" ON "pages_blocks_about_us" USING btree ("image_id");
  CREATE INDEX "pages_blocks_vision_mission_values_order_idx" ON "pages_blocks_vision_mission_values" USING btree ("_order");
  CREATE INDEX "pages_blocks_vision_mission_values_parent_id_idx" ON "pages_blocks_vision_mission_values" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_vision_mission_order_idx" ON "pages_blocks_vision_mission" USING btree ("_order");
  CREATE INDEX "pages_blocks_vision_mission_parent_id_idx" ON "pages_blocks_vision_mission" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_vision_mission_path_idx" ON "pages_blocks_vision_mission" USING btree ("_path");
  CREATE INDEX "pages_blocks_procurement_solutions_order_idx" ON "pages_blocks_procurement_solutions" USING btree ("_order");
  CREATE INDEX "pages_blocks_procurement_solutions_parent_id_idx" ON "pages_blocks_procurement_solutions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_procurement_solutions_path_idx" ON "pages_blocks_procurement_solutions" USING btree ("_path");
  CREATE INDEX "pages_blocks_procurement_solutions_media_idx" ON "pages_blocks_procurement_solutions" USING btree ("media_id");
  CREATE INDEX "pages_blocks_services_section_services_order_idx" ON "pages_blocks_services_section_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_section_services_parent_id_idx" ON "pages_blocks_services_section_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_section_order_idx" ON "pages_blocks_services_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_section_parent_id_idx" ON "pages_blocks_services_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_section_path_idx" ON "pages_blocks_services_section" USING btree ("_path");
  CREATE INDEX "svc_items_order_idx" ON "svc_items" USING btree ("_order");
  CREATE INDEX "svc_items_parent_id_idx" ON "svc_items" USING btree ("_parent_id");
  CREATE INDEX "svc_features_order_idx" ON "svc_features" USING btree ("_order");
  CREATE INDEX "svc_features_parent_id_idx" ON "svc_features" USING btree ("_parent_id");
  CREATE INDEX "svc_order_idx" ON "svc" USING btree ("_order");
  CREATE INDEX "svc_parent_id_idx" ON "svc" USING btree ("_parent_id");
  CREATE INDEX "svc_media_idx" ON "svc" USING btree ("media_id");
  CREATE INDEX "pages_blocks_service_detail_section_order_idx" ON "pages_blocks_service_detail_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_detail_section_parent_id_idx" ON "pages_blocks_service_detail_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_detail_section_path_idx" ON "pages_blocks_service_detail_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_how_we_work_steps_order_idx" ON "pages_blocks_how_we_work_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_how_we_work_steps_parent_id_idx" ON "pages_blocks_how_we_work_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_how_we_work_order_idx" ON "pages_blocks_how_we_work" USING btree ("_order");
  CREATE INDEX "pages_blocks_how_we_work_parent_id_idx" ON "pages_blocks_how_we_work" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_how_we_work_path_idx" ON "pages_blocks_how_we_work" USING btree ("_path");
  CREATE INDEX "pages_blocks_interest_form_order_idx" ON "pages_blocks_interest_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_interest_form_parent_id_idx" ON "pages_blocks_interest_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_interest_form_path_idx" ON "pages_blocks_interest_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_interest_form_background_image_idx" ON "pages_blocks_interest_form" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_interest_form_form_idx" ON "pages_blocks_interest_form" USING btree ("form_id");
  CREATE INDEX "pages_blocks_interest_form_form_logo_idx" ON "pages_blocks_interest_form" USING btree ("form_logo_id");
  CREATE INDEX "pricing_cards_link_cards_features_order_idx" ON "pricing_cards_link_cards_features" USING btree ("_order");
  CREATE INDEX "pricing_cards_link_cards_features_parent_id_idx" ON "pricing_cards_link_cards_features" USING btree ("_parent_id");
  CREATE INDEX "pricing_cards_link_cards_order_idx" ON "pricing_cards_link_cards" USING btree ("_order");
  CREATE INDEX "pricing_cards_link_cards_parent_id_idx" ON "pricing_cards_link_cards" USING btree ("_parent_id");
  CREATE INDEX "pricing_cards_link_order_idx" ON "pricing_cards_link" USING btree ("_order");
  CREATE INDEX "pricing_cards_link_parent_id_idx" ON "pricing_cards_link" USING btree ("_parent_id");
  CREATE INDEX "pricing_cards_link_path_idx" ON "pricing_cards_link" USING btree ("_path");
  CREATE INDEX "pages_blocks_who_can_benefit_items_order_idx" ON "pages_blocks_who_can_benefit_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_who_can_benefit_items_parent_id_idx" ON "pages_blocks_who_can_benefit_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_who_can_benefit_order_idx" ON "pages_blocks_who_can_benefit" USING btree ("_order");
  CREATE INDEX "pages_blocks_who_can_benefit_parent_id_idx" ON "pages_blocks_who_can_benefit" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_who_can_benefit_path_idx" ON "pages_blocks_who_can_benefit" USING btree ("_path");
  CREATE INDEX "outcome_cta_link_cards_order_idx" ON "outcome_cta_link_cards" USING btree ("_order");
  CREATE INDEX "outcome_cta_link_cards_parent_id_idx" ON "outcome_cta_link_cards" USING btree ("_parent_id");
  CREATE INDEX "outcome_cta_link_order_idx" ON "outcome_cta_link" USING btree ("_order");
  CREATE INDEX "outcome_cta_link_parent_id_idx" ON "outcome_cta_link" USING btree ("_parent_id");
  CREATE INDEX "outcome_cta_link_path_idx" ON "outcome_cta_link" USING btree ("_path");
  CREATE INDEX "pages_blocks_who_benefit_detail_sections_order_idx" ON "pages_blocks_who_benefit_detail_sections" USING btree ("_order");
  CREATE INDEX "pages_blocks_who_benefit_detail_sections_parent_id_idx" ON "pages_blocks_who_benefit_detail_sections" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_who_benefit_detail_order_idx" ON "pages_blocks_who_benefit_detail" USING btree ("_order");
  CREATE INDEX "pages_blocks_who_benefit_detail_parent_id_idx" ON "pages_blocks_who_benefit_detail" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_who_benefit_detail_path_idx" ON "pages_blocks_who_benefit_detail" USING btree ("_path");
  CREATE INDEX "pages_blocks_who_benefit_detail_image_idx" ON "pages_blocks_who_benefit_detail" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_blog_section_order_idx" ON "_pages_v_blocks_blog_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_blog_section_parent_id_idx" ON "_pages_v_blocks_blog_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_section_path_idx" ON "_pages_v_blocks_blog_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_full_width_banner_links_order_idx" ON "_pages_v_blocks_full_width_banner_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_full_width_banner_links_parent_id_idx" ON "_pages_v_blocks_full_width_banner_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_full_width_banner_order_idx" ON "_pages_v_blocks_full_width_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_full_width_banner_parent_id_idx" ON "_pages_v_blocks_full_width_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_full_width_banner_path_idx" ON "_pages_v_blocks_full_width_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_full_width_banner_media_idx" ON "_pages_v_blocks_full_width_banner" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_full_width_banner_logo_idx" ON "_pages_v_blocks_full_width_banner" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_about_section_order_idx" ON "_pages_v_blocks_about_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_section_parent_id_idx" ON "_pages_v_blocks_about_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_section_path_idx" ON "_pages_v_blocks_about_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_us_features_order_idx" ON "_pages_v_blocks_about_us_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_us_features_parent_id_idx" ON "_pages_v_blocks_about_us_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_us_card_points_order_idx" ON "_pages_v_blocks_about_us_card_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_us_card_points_parent_id_idx" ON "_pages_v_blocks_about_us_card_points" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_us_order_idx" ON "_pages_v_blocks_about_us" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_us_parent_id_idx" ON "_pages_v_blocks_about_us" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_us_path_idx" ON "_pages_v_blocks_about_us" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_us_image_idx" ON "_pages_v_blocks_about_us" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_vision_mission_values_order_idx" ON "_pages_v_blocks_vision_mission_values" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_vision_mission_values_parent_id_idx" ON "_pages_v_blocks_vision_mission_values" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_vision_mission_order_idx" ON "_pages_v_blocks_vision_mission" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_vision_mission_parent_id_idx" ON "_pages_v_blocks_vision_mission" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_vision_mission_path_idx" ON "_pages_v_blocks_vision_mission" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_procurement_solutions_order_idx" ON "_pages_v_blocks_procurement_solutions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_procurement_solutions_parent_id_idx" ON "_pages_v_blocks_procurement_solutions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_procurement_solutions_path_idx" ON "_pages_v_blocks_procurement_solutions" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_procurement_solutions_media_idx" ON "_pages_v_blocks_procurement_solutions" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_services_section_services_order_idx" ON "_pages_v_blocks_services_section_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_section_services_parent_id_idx" ON "_pages_v_blocks_services_section_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_section_order_idx" ON "_pages_v_blocks_services_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_section_parent_id_idx" ON "_pages_v_blocks_services_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_section_path_idx" ON "_pages_v_blocks_services_section" USING btree ("_path");
  CREATE INDEX "_svc_v_items_order_idx" ON "_svc_v_items" USING btree ("_order");
  CREATE INDEX "_svc_v_items_parent_id_idx" ON "_svc_v_items" USING btree ("_parent_id");
  CREATE INDEX "_svc_v_features_order_idx" ON "_svc_v_features" USING btree ("_order");
  CREATE INDEX "_svc_v_features_parent_id_idx" ON "_svc_v_features" USING btree ("_parent_id");
  CREATE INDEX "_svc_v_order_idx" ON "_svc_v" USING btree ("_order");
  CREATE INDEX "_svc_v_parent_id_idx" ON "_svc_v" USING btree ("_parent_id");
  CREATE INDEX "_svc_v_media_idx" ON "_svc_v" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_service_detail_section_order_idx" ON "_pages_v_blocks_service_detail_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_detail_section_parent_id_idx" ON "_pages_v_blocks_service_detail_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_detail_section_path_idx" ON "_pages_v_blocks_service_detail_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_how_we_work_steps_order_idx" ON "_pages_v_blocks_how_we_work_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_how_we_work_steps_parent_id_idx" ON "_pages_v_blocks_how_we_work_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_how_we_work_order_idx" ON "_pages_v_blocks_how_we_work" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_how_we_work_parent_id_idx" ON "_pages_v_blocks_how_we_work" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_how_we_work_path_idx" ON "_pages_v_blocks_how_we_work" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_interest_form_order_idx" ON "_pages_v_blocks_interest_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_interest_form_parent_id_idx" ON "_pages_v_blocks_interest_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_interest_form_path_idx" ON "_pages_v_blocks_interest_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_interest_form_background_image_idx" ON "_pages_v_blocks_interest_form" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_interest_form_form_idx" ON "_pages_v_blocks_interest_form" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_interest_form_form_logo_idx" ON "_pages_v_blocks_interest_form" USING btree ("form_logo_id");
  CREATE INDEX "_pricing_cards_link_v_cards_features_order_idx" ON "_pricing_cards_link_v_cards_features" USING btree ("_order");
  CREATE INDEX "_pricing_cards_link_v_cards_features_parent_id_idx" ON "_pricing_cards_link_v_cards_features" USING btree ("_parent_id");
  CREATE INDEX "_pricing_cards_link_v_cards_order_idx" ON "_pricing_cards_link_v_cards" USING btree ("_order");
  CREATE INDEX "_pricing_cards_link_v_cards_parent_id_idx" ON "_pricing_cards_link_v_cards" USING btree ("_parent_id");
  CREATE INDEX "_pricing_cards_link_v_order_idx" ON "_pricing_cards_link_v" USING btree ("_order");
  CREATE INDEX "_pricing_cards_link_v_parent_id_idx" ON "_pricing_cards_link_v" USING btree ("_parent_id");
  CREATE INDEX "_pricing_cards_link_v_path_idx" ON "_pricing_cards_link_v" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_who_can_benefit_items_order_idx" ON "_pages_v_blocks_who_can_benefit_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_who_can_benefit_items_parent_id_idx" ON "_pages_v_blocks_who_can_benefit_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_who_can_benefit_order_idx" ON "_pages_v_blocks_who_can_benefit" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_who_can_benefit_parent_id_idx" ON "_pages_v_blocks_who_can_benefit" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_who_can_benefit_path_idx" ON "_pages_v_blocks_who_can_benefit" USING btree ("_path");
  CREATE INDEX "_outcome_cta_link_v_cards_order_idx" ON "_outcome_cta_link_v_cards" USING btree ("_order");
  CREATE INDEX "_outcome_cta_link_v_cards_parent_id_idx" ON "_outcome_cta_link_v_cards" USING btree ("_parent_id");
  CREATE INDEX "_outcome_cta_link_v_order_idx" ON "_outcome_cta_link_v" USING btree ("_order");
  CREATE INDEX "_outcome_cta_link_v_parent_id_idx" ON "_outcome_cta_link_v" USING btree ("_parent_id");
  CREATE INDEX "_outcome_cta_link_v_path_idx" ON "_outcome_cta_link_v" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_who_benefit_detail_sections_order_idx" ON "_pages_v_blocks_who_benefit_detail_sections" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_who_benefit_detail_sections_parent_id_idx" ON "_pages_v_blocks_who_benefit_detail_sections" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_who_benefit_detail_order_idx" ON "_pages_v_blocks_who_benefit_detail" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_who_benefit_detail_parent_id_idx" ON "_pages_v_blocks_who_benefit_detail" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_who_benefit_detail_path_idx" ON "_pages_v_blocks_who_benefit_detail" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_who_benefit_detail_image_idx" ON "_pages_v_blocks_who_benefit_detail" USING btree ("image_id");
  CREATE INDEX "header_nav_items_children_order_idx" ON "header_nav_items_children" USING btree ("_order");
  CREATE INDEX "header_nav_items_children_parent_id_idx" ON "header_nav_items_children" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_logo_id_media_id_fk" FOREIGN KEY ("hero_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_logo_id_media_id_fk" FOREIGN KEY ("version_hero_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_cta_logo_id_media_id_fk" FOREIGN KEY ("cta_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_hero_hero_logo_idx" ON "pages" USING btree ("hero_logo_id");
  CREATE INDEX "_pages_v_version_hero_version_hero_logo_idx" ON "_pages_v" USING btree ("version_hero_logo_id");
  CREATE INDEX "footer_cta_logo_idx" ON "footer" USING btree ("cta_logo_id");
  DROP TYPE "public"."enum_footer_nav_items_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_blog_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_full_width_banner_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_full_width_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_us_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_us_card_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_us" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_vision_mission_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_vision_mission" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_procurement_solutions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_section_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "svc_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "svc_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "svc" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_service_detail_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_how_we_work_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_how_we_work" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_interest_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_cards_link_cards_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_cards_link_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pricing_cards_link" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_who_can_benefit_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_who_can_benefit" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "outcome_cta_link_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "outcome_cta_link" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_who_benefit_detail_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_who_benefit_detail" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_blog_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_full_width_banner_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_full_width_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_us_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_us_card_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_us" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_vision_mission_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_vision_mission" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_procurement_solutions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_section_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_svc_v_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_svc_v_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_svc_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_service_detail_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_how_we_work_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_how_we_work" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_interest_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pricing_cards_link_v_cards_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pricing_cards_link_v_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pricing_cards_link_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_who_can_benefit_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_who_can_benefit" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_outcome_cta_link_v_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_outcome_cta_link_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_who_benefit_detail_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_who_benefit_detail" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_children" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_social_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_blog_section" CASCADE;
  DROP TABLE "pages_blocks_full_width_banner_links" CASCADE;
  DROP TABLE "pages_blocks_full_width_banner" CASCADE;
  DROP TABLE "pages_blocks_about_section" CASCADE;
  DROP TABLE "pages_blocks_about_us_features" CASCADE;
  DROP TABLE "pages_blocks_about_us_card_points" CASCADE;
  DROP TABLE "pages_blocks_about_us" CASCADE;
  DROP TABLE "pages_blocks_vision_mission_values" CASCADE;
  DROP TABLE "pages_blocks_vision_mission" CASCADE;
  DROP TABLE "pages_blocks_procurement_solutions" CASCADE;
  DROP TABLE "pages_blocks_services_section_services" CASCADE;
  DROP TABLE "pages_blocks_services_section" CASCADE;
  DROP TABLE "svc_items" CASCADE;
  DROP TABLE "svc_features" CASCADE;
  DROP TABLE "svc" CASCADE;
  DROP TABLE "pages_blocks_service_detail_section" CASCADE;
  DROP TABLE "pages_blocks_how_we_work_steps" CASCADE;
  DROP TABLE "pages_blocks_how_we_work" CASCADE;
  DROP TABLE "pages_blocks_interest_form" CASCADE;
  DROP TABLE "pricing_cards_link_cards_features" CASCADE;
  DROP TABLE "pricing_cards_link_cards" CASCADE;
  DROP TABLE "pricing_cards_link" CASCADE;
  DROP TABLE "pages_blocks_who_can_benefit_items" CASCADE;
  DROP TABLE "pages_blocks_who_can_benefit" CASCADE;
  DROP TABLE "outcome_cta_link_cards" CASCADE;
  DROP TABLE "outcome_cta_link" CASCADE;
  DROP TABLE "pages_blocks_who_benefit_detail_sections" CASCADE;
  DROP TABLE "pages_blocks_who_benefit_detail" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_section" CASCADE;
  DROP TABLE "_pages_v_blocks_full_width_banner_links" CASCADE;
  DROP TABLE "_pages_v_blocks_full_width_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_about_section" CASCADE;
  DROP TABLE "_pages_v_blocks_about_us_features" CASCADE;
  DROP TABLE "_pages_v_blocks_about_us_card_points" CASCADE;
  DROP TABLE "_pages_v_blocks_about_us" CASCADE;
  DROP TABLE "_pages_v_blocks_vision_mission_values" CASCADE;
  DROP TABLE "_pages_v_blocks_vision_mission" CASCADE;
  DROP TABLE "_pages_v_blocks_procurement_solutions" CASCADE;
  DROP TABLE "_pages_v_blocks_services_section_services" CASCADE;
  DROP TABLE "_pages_v_blocks_services_section" CASCADE;
  DROP TABLE "_svc_v_items" CASCADE;
  DROP TABLE "_svc_v_features" CASCADE;
  DROP TABLE "_svc_v" CASCADE;
  DROP TABLE "_pages_v_blocks_service_detail_section" CASCADE;
  DROP TABLE "_pages_v_blocks_how_we_work_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_how_we_work" CASCADE;
  DROP TABLE "_pages_v_blocks_interest_form" CASCADE;
  DROP TABLE "_pricing_cards_link_v_cards_features" CASCADE;
  DROP TABLE "_pricing_cards_link_v_cards" CASCADE;
  DROP TABLE "_pricing_cards_link_v" CASCADE;
  DROP TABLE "_pages_v_blocks_who_can_benefit_items" CASCADE;
  DROP TABLE "_pages_v_blocks_who_can_benefit" CASCADE;
  DROP TABLE "_outcome_cta_link_v_cards" CASCADE;
  DROP TABLE "_outcome_cta_link_v" CASCADE;
  DROP TABLE "_pages_v_blocks_who_benefit_detail_sections" CASCADE;
  DROP TABLE "_pages_v_blocks_who_benefit_detail" CASCADE;
  DROP TABLE "header_nav_items_children" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_logo_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_hero_logo_id_media_id_fk";
  
  ALTER TABLE "footer" DROP CONSTRAINT "footer_cta_logo_id_media_id_fk";
  
  DROP INDEX "pages_hero_hero_logo_idx";
  DROP INDEX "_pages_v_version_hero_version_hero_logo_idx";
  DROP INDEX "footer_cta_logo_idx";
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_label" SET NOT NULL;
  ALTER TABLE "header" ALTER COLUMN "ctalink_label" SET NOT NULL;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  ALTER TABLE "pages" DROP COLUMN "hero_logo_id";
  ALTER TABLE "pages" DROP COLUMN "hero_heading";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_logo_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_heading";
  ALTER TABLE "footer" DROP COLUMN "cta_heading";
  ALTER TABLE "footer" DROP COLUMN "cta_description";
  ALTER TABLE "footer" DROP COLUMN "cta_button_type";
  ALTER TABLE "footer" DROP COLUMN "cta_button_new_tab";
  ALTER TABLE "footer" DROP COLUMN "cta_button_url";
  ALTER TABLE "footer" DROP COLUMN "cta_button_label";
  ALTER TABLE "footer" DROP COLUMN "cta_logo_id";
  ALTER TABLE "footer" DROP COLUMN "contact_address";
  ALTER TABLE "footer" DROP COLUMN "contact_phone";
  ALTER TABLE "footer" DROP COLUMN "contact_email";
  ALTER TABLE "footer" DROP COLUMN "copyright";
  DROP TYPE "public"."enum_pages_blocks_blog_section_view_more_link_type";
  DROP TYPE "public"."enum_pages_blocks_blog_section_view_more_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_full_width_banner_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_full_width_banner_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_about_us_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_about_us_cta_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_vision_mission_values_icon";
  DROP TYPE "public"."enum_pages_blocks_procurement_solutions_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_procurement_solutions_cta_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_services_section_services_link_type";
  DROP TYPE "public"."enum_svc_layout";
  DROP TYPE "public"."enum_svc_display_type";
  DROP TYPE "public"."enum_svc_cta_link_type";
  DROP TYPE "public"."enum_svc_cta_link_appearance";
  DROP TYPE "public"."enum_pricing_cards_link_cards_cta_link_type";
  DROP TYPE "public"."enum_pricing_cards_link_cards_cta_link_appearance";
  DROP TYPE "public"."enum_outcome_cta_link_cta_card_cta_link_type";
  DROP TYPE "public"."enum_outcome_cta_link_cta_card_cta_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_blog_section_view_more_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_blog_section_view_more_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_full_width_banner_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_full_width_banner_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_about_us_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_about_us_cta_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_vision_mission_values_icon";
  DROP TYPE "public"."enum__pages_v_blocks_procurement_solutions_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_procurement_solutions_cta_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_services_section_services_link_type";
  DROP TYPE "public"."enum__svc_v_layout";
  DROP TYPE "public"."enum__svc_v_display_type";
  DROP TYPE "public"."enum__svc_v_cta_link_type";
  DROP TYPE "public"."enum__svc_v_cta_link_appearance";
  DROP TYPE "public"."enum__pricing_cards_link_v_cards_cta_link_type";
  DROP TYPE "public"."enum__pricing_cards_link_v_cards_cta_link_appearance";
  DROP TYPE "public"."enum__outcome_cta_link_v_cta_card_cta_link_type";
  DROP TYPE "public"."enum__outcome_cta_link_v_cta_card_cta_link_appearance";
  DROP TYPE "public"."enum_header_nav_items_children_link_type";
  DROP TYPE "public"."enum_footer_columns_links_link_type";
  DROP TYPE "public"."enum_footer_cta_button_type";`)
}
