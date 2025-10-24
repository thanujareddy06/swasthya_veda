/*
  # Ayurvedic Food Database Schema

  ## Overview
  This migration creates the core database schema for the AyurWell AI platform,
  combining modern nutrition data with traditional Ayurvedic classifications.

  ## 1. New Tables

  ### `foods`
  Central food database containing both modern nutrition and Ayurvedic attributes
  - `id` (uuid, primary key)
  - `name` (text) - Common name of the food
  - `name_sanskrit` (text) - Sanskrit/traditional name
  - `category` (text) - Food category (grains, vegetables, fruits, etc.)
  - `description` (text) - Brief description
  
  **Modern Nutrition Attributes:**
  - `calories_per_100g` (numeric) - Energy content
  - `protein_g` (numeric) - Protein content
  - `carbs_g` (numeric) - Carbohydrate content
  - `fat_g` (numeric) - Fat content
  - `fiber_g` (numeric) - Dietary fiber
  - `vitamins` (jsonb) - Vitamin content (flexible structure)
  - `minerals` (jsonb) - Mineral content (flexible structure)
  
  **Ayurvedic Attributes:**
  - `rasa` (text[]) - Six tastes (sweet, sour, salty, pungent, bitter, astringent)
  - `guna` (text[]) - Qualities (heavy, light, oily, dry, hot, cold, etc.)
  - `virya` (text) - Potency (heating or cooling)
  - `vipaka` (text) - Post-digestive effect (sweet, sour, pungent)
  - `dosha_effect` (jsonb) - Effect on Vata, Pitta, Kapha (increases/decreases/balances)
  - `best_season` (text[]) - Optimal seasons for consumption
  - `best_time` (text[]) - Optimal times of day
  
  **Additional:**
  - `contraindications` (text[]) - Health conditions to avoid
  - `health_benefits` (text[]) - Therapeutic properties
  - `image_url` (text) - Food image
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `users`
  User accounts for practitioners and patients
  - `id` (uuid, primary key, references auth.users)
  - `email` (text, unique)
  - `full_name` (text)
  - `role` (text) - 'practitioner' or 'patient'
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `patient_profiles`
  Comprehensive patient health and Ayurvedic profiles
  - `id` (uuid, primary key)
  - `user_id` (uuid, references users)
  - `practitioner_id` (uuid, references users) - Assigned doctor
  - `age` (integer)
  - `gender` (text)
  - `height_cm` (numeric)
  - `weight_kg` (numeric)
  - `bmi` (numeric, computed)
  
  **Ayurvedic Constitution:**
  - `prakriti` (jsonb) - Birth constitution (Vata, Pitta, Kapha percentages)
  - `vikriti` (jsonb) - Current imbalance
  
  **Lifestyle:**
  - `activity_level` (text)
  - `occupation` (text)
  - `sleep_hours` (numeric)
  - `water_intake_liters` (numeric)
  - `bowel_pattern` (text)
  - `digestion_strength` (text)
  - `stress_level` (integer) - 1-10 scale
  
  **Health:**
  - `health_conditions` (text[])
  - `allergies` (text[])
  - `medications` (text[])
  - `health_goals` (text[])
  
  **Preferences:**
  - `dietary_preferences` (text[]) - vegetarian, vegan, etc.
  - `food_dislikes` (text[])
  
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `meal_plans`
  AI-generated personalized meal plans
  - `id` (uuid, primary key)
  - `patient_id` (uuid, references patient_profiles)
  - `created_by` (uuid, references users) - Practitioner
  - `plan_name` (text)
  - `start_date` (date)
  - `end_date` (date)
  - `duration_days` (integer)
  - `goal` (text) - Plan objective
  - `ai_reasoning` (text) - AI explanation for plan
  - `status` (text) - active, completed, archived
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `meal_plan_days`
  Daily meal schedules within a plan
  - `id` (uuid, primary key)
  - `meal_plan_id` (uuid, references meal_plans)
  - `day_number` (integer) - Day 1, 2, 3, etc.
  - `date` (date)
  - `weather_condition` (text) - For seasonal adaptation
  - `temperature` (numeric)
  - `notes` (text)
  - `created_at` (timestamptz)

  ### `meals`
  Individual meals in a day
  - `id` (uuid, primary key)
  - `meal_plan_day_id` (uuid, references meal_plan_days)
  - `meal_type` (text) - breakfast, lunch, dinner, snack
  - `meal_time` (time)
  - `meal_name` (text)
  - `recipe_instructions` (text)
  - `ayurvedic_reasoning` (text)
  - `nutrition_reasoning` (text)
  - `total_calories` (numeric)
  - `total_protein` (numeric)
  - `total_carbs` (numeric)
  - `total_fat` (numeric)
  - `dosha_impact` (jsonb)
  - `created_at` (timestamptz)

  ### `meal_food_items`
  Foods within each meal with quantities
  - `id` (uuid, primary key)
  - `meal_id` (uuid, references meals)
  - `food_id` (uuid, references foods)
  - `quantity_grams` (numeric)
  - `serving_size` (text) - Human-readable (1 cup, 2 pieces, etc.)

  ### `health_journal`
  Daily logs and tracking
  - `id` (uuid, primary key)
  - `patient_id` (uuid, references patient_profiles)
  - `date` (date)
  - `mood` (text)
  - `energy_level` (integer) - 1-10
  - `digestion_quality` (text)
  - `sleep_quality` (integer) - 1-10
  - `water_intake` (numeric)
  - `exercise_minutes` (integer)
  - `stress_level` (integer) - 1-10
  - `symptoms` (text[])
  - `notes` (text)
  - `meal_adherence` (boolean) - Followed plan?
  - `created_at` (timestamptz)

  ### `dosha_assessments`
  Historical Prakriti/Vikriti assessments
  - `id` (uuid, primary key)
  - `patient_id` (uuid, references patient_profiles)
  - `assessment_type` (text) - 'prakriti' or 'vikriti'
  - `assessment_date` (date)
  - `vata_score` (integer)
  - `pitta_score` (integer)
  - `kapha_score` (integer)
  - `responses` (jsonb) - Quiz responses
  - `ai_analysis` (text)
  - `created_at` (timestamptz)

  ### `chat_messages`
  AyurWell AI chatbot conversation history
  - `id` (uuid, primary key)
  - `user_id` (uuid, references users)
  - `role` (text) - 'user' or 'assistant'
  - `content` (text)
  - `timestamp` (timestamptz)

  ## 2. Security
  - Enable RLS on all tables
  - Patients can only view/edit their own data
  - Practitioners can view their assigned patients
  - Public read access to foods table for browsing

  ## 3. Indexes
  - Food search optimization
  - Patient lookup by practitioner
  - Meal plan queries

  ## 4. Functions
  - Auto-update timestamps
  - BMI calculation
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('practitioner', 'patient')),
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create foods table
CREATE TABLE IF NOT EXISTS foods (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  name_sanskrit text,
  category text NOT NULL,
  description text,
  
  -- Modern nutrition
  calories_per_100g numeric DEFAULT 0,
  protein_g numeric DEFAULT 0,
  carbs_g numeric DEFAULT 0,
  fat_g numeric DEFAULT 0,
  fiber_g numeric DEFAULT 0,
  vitamins jsonb DEFAULT '{}'::jsonb,
  minerals jsonb DEFAULT '{}'::jsonb,
  
  -- Ayurvedic attributes
  rasa text[] DEFAULT ARRAY[]::text[],
  guna text[] DEFAULT ARRAY[]::text[],
  virya text,
  vipaka text,
  dosha_effect jsonb DEFAULT '{}'::jsonb,
  best_season text[] DEFAULT ARRAY[]::text[],
  best_time text[] DEFAULT ARRAY[]::text[],
  
  -- Additional
  contraindications text[] DEFAULT ARRAY[]::text[],
  health_benefits text[] DEFAULT ARRAY[]::text[],
  image_url text,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create patient profiles table
CREATE TABLE IF NOT EXISTS patient_profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  practitioner_id uuid REFERENCES users(id),
  
  -- Basic info
  age integer,
  gender text CHECK (gender IN ('male', 'female', 'other')),
  height_cm numeric,
  weight_kg numeric,
  bmi numeric,
  
  -- Ayurvedic constitution
  prakriti jsonb DEFAULT '{}'::jsonb,
  vikriti jsonb DEFAULT '{}'::jsonb,
  
  -- Lifestyle
  activity_level text,
  occupation text,
  sleep_hours numeric,
  water_intake_liters numeric,
  bowel_pattern text,
  digestion_strength text,
  stress_level integer CHECK (stress_level BETWEEN 1 AND 10),
  
  -- Health
  health_conditions text[] DEFAULT ARRAY[]::text[],
  allergies text[] DEFAULT ARRAY[]::text[],
  medications text[] DEFAULT ARRAY[]::text[],
  health_goals text[] DEFAULT ARRAY[]::text[],
  
  -- Preferences
  dietary_preferences text[] DEFAULT ARRAY[]::text[],
  food_dislikes text[] DEFAULT ARRAY[]::text[],
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(user_id)
);

-- Create meal plans table
CREATE TABLE IF NOT EXISTS meal_plans (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  created_by uuid REFERENCES users(id),
  plan_name text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  duration_days integer NOT NULL,
  goal text,
  ai_reasoning text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create meal plan days table
CREATE TABLE IF NOT EXISTS meal_plan_days (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  meal_plan_id uuid REFERENCES meal_plans(id) ON DELETE CASCADE,
  day_number integer NOT NULL,
  date date NOT NULL,
  weather_condition text,
  temperature numeric,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create meals table
CREATE TABLE IF NOT EXISTS meals (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  meal_plan_day_id uuid REFERENCES meal_plan_days(id) ON DELETE CASCADE,
  meal_type text NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  meal_time time,
  meal_name text NOT NULL,
  recipe_instructions text,
  ayurvedic_reasoning text,
  nutrition_reasoning text,
  total_calories numeric DEFAULT 0,
  total_protein numeric DEFAULT 0,
  total_carbs numeric DEFAULT 0,
  total_fat numeric DEFAULT 0,
  dosha_impact jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create meal food items table
CREATE TABLE IF NOT EXISTS meal_food_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  meal_id uuid REFERENCES meals(id) ON DELETE CASCADE,
  food_id uuid REFERENCES foods(id),
  quantity_grams numeric NOT NULL,
  serving_size text
);

-- Create health journal table
CREATE TABLE IF NOT EXISTS health_journal (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  date date NOT NULL,
  mood text,
  energy_level integer CHECK (energy_level BETWEEN 1 AND 10),
  digestion_quality text,
  sleep_quality integer CHECK (sleep_quality BETWEEN 1 AND 10),
  water_intake numeric,
  exercise_minutes integer DEFAULT 0,
  stress_level integer CHECK (stress_level BETWEEN 1 AND 10),
  symptoms text[] DEFAULT ARRAY[]::text[],
  notes text,
  meal_adherence boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create dosha assessments table
CREATE TABLE IF NOT EXISTS dosha_assessments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES patient_profiles(id) ON DELETE CASCADE,
  assessment_type text NOT NULL CHECK (assessment_type IN ('prakriti', 'vikriti')),
  assessment_date date NOT NULL DEFAULT CURRENT_DATE,
  vata_score integer NOT NULL,
  pitta_score integer NOT NULL,
  kapha_score integer NOT NULL,
  responses jsonb DEFAULT '{}'::jsonb,
  ai_analysis text,
  created_at timestamptz DEFAULT now()
);

-- Create chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  timestamp timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plan_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_food_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_journal ENABLE ROW LEVEL SECURITY;
ALTER TABLE dosha_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE foods ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for patient_profiles
CREATE POLICY "Patients can view own profile"
  ON patient_profiles FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    practitioner_id = auth.uid()
  );

CREATE POLICY "Patients can update own profile"
  ON patient_profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Patients can insert own profile"
  ON patient_profiles FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for meal_plans
CREATE POLICY "View meal plans"
  ON meal_plans FOR SELECT
  TO authenticated
  USING (
    patient_id IN (
      SELECT id FROM patient_profiles WHERE user_id = auth.uid() OR practitioner_id = auth.uid()
    )
  );

CREATE POLICY "Practitioners can create meal plans"
  ON meal_plans FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Practitioners can update meal plans"
  ON meal_plans FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

-- RLS Policies for meal_plan_days
CREATE POLICY "View meal plan days"
  ON meal_plan_days FOR SELECT
  TO authenticated
  USING (
    meal_plan_id IN (
      SELECT id FROM meal_plans WHERE patient_id IN (
        SELECT id FROM patient_profiles WHERE user_id = auth.uid() OR practitioner_id = auth.uid()
      )
    )
  );

-- RLS Policies for meals
CREATE POLICY "View meals"
  ON meals FOR SELECT
  TO authenticated
  USING (
    meal_plan_day_id IN (
      SELECT id FROM meal_plan_days WHERE meal_plan_id IN (
        SELECT id FROM meal_plans WHERE patient_id IN (
          SELECT id FROM patient_profiles WHERE user_id = auth.uid() OR practitioner_id = auth.uid()
        )
      )
    )
  );

-- RLS Policies for meal_food_items
CREATE POLICY "View meal food items"
  ON meal_food_items FOR SELECT
  TO authenticated
  USING (
    meal_id IN (
      SELECT id FROM meals WHERE meal_plan_day_id IN (
        SELECT id FROM meal_plan_days WHERE meal_plan_id IN (
          SELECT id FROM meal_plans WHERE patient_id IN (
            SELECT id FROM patient_profiles WHERE user_id = auth.uid() OR practitioner_id = auth.uid()
          )
        )
      )
    )
  );

-- RLS Policies for health_journal
CREATE POLICY "Patients can view own journal"
  ON health_journal FOR SELECT
  TO authenticated
  USING (
    patient_id IN (
      SELECT id FROM patient_profiles WHERE user_id = auth.uid() OR practitioner_id = auth.uid()
    )
  );

CREATE POLICY "Patients can insert journal entries"
  ON health_journal FOR INSERT
  TO authenticated
  WITH CHECK (
    patient_id IN (
      SELECT id FROM patient_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Patients can update own journal"
  ON health_journal FOR UPDATE
  TO authenticated
  USING (
    patient_id IN (
      SELECT id FROM patient_profiles WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    patient_id IN (
      SELECT id FROM patient_profiles WHERE user_id = auth.uid()
    )
  );

-- RLS Policies for dosha_assessments
CREATE POLICY "View dosha assessments"
  ON dosha_assessments FOR SELECT
  TO authenticated
  USING (
    patient_id IN (
      SELECT id FROM patient_profiles WHERE user_id = auth.uid() OR practitioner_id = auth.uid()
    )
  );

CREATE POLICY "Insert dosha assessments"
  ON dosha_assessments FOR INSERT
  TO authenticated
  WITH CHECK (
    patient_id IN (
      SELECT id FROM patient_profiles WHERE user_id = auth.uid()
    )
  );

-- RLS Policies for chat_messages
CREATE POLICY "Users can view own messages"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own messages"
  ON chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for foods (public read)
CREATE POLICY "Anyone can view foods"
  ON foods FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_foods_category ON foods(category);
CREATE INDEX IF NOT EXISTS idx_foods_name ON foods USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_patient_profiles_user_id ON patient_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_patient_profiles_practitioner_id ON patient_profiles(practitioner_id);
CREATE INDEX IF NOT EXISTS idx_meal_plans_patient_id ON meal_plans(patient_id);
CREATE INDEX IF NOT EXISTS idx_meal_plan_days_meal_plan_id ON meal_plan_days(meal_plan_id);
CREATE INDEX IF NOT EXISTS idx_meals_meal_plan_day_id ON meals(meal_plan_day_id);
CREATE INDEX IF NOT EXISTS idx_health_journal_patient_id ON health_journal(patient_id);
CREATE INDEX IF NOT EXISTS idx_health_journal_date ON health_journal(date);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_foods_updated_at BEFORE UPDATE ON foods
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patient_profiles_updated_at BEFORE UPDATE ON patient_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meal_plans_updated_at BEFORE UPDATE ON meal_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate BMI
CREATE OR REPLACE FUNCTION calculate_bmi()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.height_cm > 0 AND NEW.weight_kg > 0 THEN
    NEW.bmi = NEW.weight_kg / ((NEW.height_cm / 100) * (NEW.height_cm / 100));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for BMI calculation
CREATE TRIGGER calculate_patient_bmi BEFORE INSERT OR UPDATE ON patient_profiles
  FOR EACH ROW EXECUTE FUNCTION calculate_bmi();