/*
  # Chatbot Generator Schema

  1. New Tables
    - `chatbots`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `name` (text)
      - `welcome_message` (text)
      - `theme` (jsonb) - Stores color scheme, font settings, etc.
      - `settings` (jsonb) - Stores behavior settings like auto-show, position, etc.
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `chatbot_websites`
      - `id` (uuid, primary key)
      - `chatbot_id` (uuid, references chatbots)
      - `domain` (text)
      - `is_active` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create chatbots table
CREATE TABLE IF NOT EXISTS chatbots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  welcome_message text NOT NULL DEFAULT 'Hello! How can I help you today?',
  theme jsonb DEFAULT '{"primaryColor": "#2563eb", "fontFamily": "Inter, sans-serif", "buttonStyle": "rounded"}',
  settings jsonb DEFAULT '{"position": "bottom-right", "autoShow": false, "showAfterSeconds": 5}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chatbot_websites table
CREATE TABLE IF NOT EXISTS chatbot_websites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chatbot_id uuid REFERENCES chatbots(id) ON DELETE CASCADE NOT NULL,
  domain text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE chatbots ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_websites ENABLE ROW LEVEL SECURITY;

-- Create policies for chatbots
CREATE POLICY "Users can create their own chatbots"
  ON chatbots
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own chatbots"
  ON chatbots
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own chatbots"
  ON chatbots
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own chatbots"
  ON chatbots
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for chatbot_websites
CREATE POLICY "Users can manage websites for their chatbots"
  ON chatbot_websites
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chatbots
      WHERE chatbots.id = chatbot_websites.chatbot_id
      AND chatbots.user_id = auth.uid()
    )
  );