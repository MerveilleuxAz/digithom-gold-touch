export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

interface ListRowBase {
  id: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface AboutValueRow extends ListRowBase {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceRow extends ListRowBase {
  icon: string;
  title: string;
  description: string;
  details: string[];
}

export interface FormationThemeRow extends ListRowBase {
  icon: string;
  title: string;
  description: string;
}

export interface ProjectRow extends ListRowBase {
  title: string;
  category: string;
  image_url: string;
  image_alt: string | null;
  description: string | null;
  client: string | null;
  year: string | null;
  project_url: string | null;
}

export interface VideoRow extends ListRowBase {
  title: string;
  description: string | null;
  video_url: string;
  duration: string | null;
}

export interface TestimonialRow extends ListRowBase {
  name: string;
  position: string | null;
  quote: string;
  rating: number;
  avatar_url: string | null;
}

export interface ProfileRow {
  id: string;
  is_admin: boolean;
  created_at: string;
}

export interface ContactMessageRow {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  is_archived: boolean;
  created_at: string;
}

export interface SiteSettingsRow {
  id: number;
  company_name: string;
  tagline: string;
  footer_description: string;
  logo_url: string | null;
  email: string;
  phone_display: string;
  phone_link: string;
  address: string;
  address_map_url: string | null;
  hours_weekdays: string | null;
  hours_saturday: string | null;
  hours_sunday: string | null;
  facebook_url: string | null;
  tiktok_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  updated_at: string;
}

export interface HeroContentRow {
  id: number;
  title: string;
  subtitle: string;
  button_text: string;
  image_url: string;
  image_alt: string;
  label_text: string;
  experience_text: string;
  badge_text: string;
  updated_at: string;
}

export interface AboutContentRow {
  id: number;
  heading: string;
  paragraph_1: string;
  paragraph_2: string;
  checklist: string[];
  updated_at: string;
}

export interface FormationsContentRow {
  id: number;
  section_title: string;
  section_description: string;
  heading: string;
  description: string;
  bullet_1: string;
  bullet_2: string;
  updated_at: string;
}

type InsertOf<Row, DefaultedKeys extends keyof Row> = Omit<Row, DefaultedKeys> &
  Partial<Pick<Row, DefaultedKeys>>;

type ListDefaults = 'id' | 'display_order' | 'is_published' | 'created_at' | 'updated_at';

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: SiteSettingsRow;
        Insert: Partial<SiteSettingsRow>;
        Update: Partial<SiteSettingsRow>;
      };
      hero_content: {
        Row: HeroContentRow;
        Insert: Partial<HeroContentRow>;
        Update: Partial<HeroContentRow>;
      };
      about_content: {
        Row: AboutContentRow;
        Insert: Partial<AboutContentRow>;
        Update: Partial<AboutContentRow>;
      };
      formations_content: {
        Row: FormationsContentRow;
        Insert: Partial<FormationsContentRow>;
        Update: Partial<FormationsContentRow>;
      };
      about_values: {
        Row: AboutValueRow;
        Insert: InsertOf<AboutValueRow, ListDefaults>;
        Update: Partial<AboutValueRow>;
      };
      services: {
        Row: ServiceRow;
        Insert: InsertOf<ServiceRow, ListDefaults>;
        Update: Partial<ServiceRow>;
      };
      formation_themes: {
        Row: FormationThemeRow;
        Insert: InsertOf<FormationThemeRow, ListDefaults>;
        Update: Partial<FormationThemeRow>;
      };
      projects: {
        Row: ProjectRow;
        Insert: InsertOf<ProjectRow, ListDefaults>;
        Update: Partial<ProjectRow>;
      };
      videos: {
        Row: VideoRow;
        Insert: InsertOf<VideoRow, ListDefaults>;
        Update: Partial<VideoRow>;
      };
      testimonials: {
        Row: TestimonialRow;
        Insert: InsertOf<TestimonialRow, ListDefaults>;
        Update: Partial<TestimonialRow>;
      };
      contact_messages: {
        Row: ContactMessageRow;
        Insert: InsertOf<ContactMessageRow, 'id' | 'is_read' | 'is_archived' | 'created_at'>;
        Update: Partial<ContactMessageRow>;
      };
      profiles: {
        Row: ProfileRow;
        Insert: Partial<ProfileRow>;
        Update: Partial<ProfileRow>;
      };
    };
  };
}
