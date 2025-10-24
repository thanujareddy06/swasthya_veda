import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  users: {
    id: string;
    email: string;
    full_name: string;
    role: 'practitioner' | 'patient';
    avatar_url?: string;
    created_at: string;
    updated_at: string;
  };
  patient_profiles: {
    id: string;
    user_id: string;
    practitioner_id?: string;
    age?: number;
    gender?: 'male' | 'female' | 'other';
    height_cm?: number;
    weight_kg?: number;
    bmi?: number;
    prakriti?: {
      vata: number;
      pitta: number;
      kapha: number;
    };
    vikriti?: {
      vata: number;
      pitta: number;
      kapha: number;
    };
    activity_level?: string;
    health_goals?: string[];
    created_at: string;
    updated_at: string;
  };
  foods: {
    id: string;
    name: string;
    name_sanskrit?: string;
    category: string;
    description?: string;
    calories_per_100g: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
    fiber_g: number;
    rasa?: string[];
    guna?: string[];
    virya?: string;
    vipaka?: string;
    dosha_effect?: {
      vata: string;
      pitta: string;
      kapha: string;
    };
    health_benefits?: string[];
    image_url?: string;
  };
};
