/*
  # Chatbot Schema

  1. New Tables
    - `chatbots`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `name` (text)
      - `welcome_message` (text)
      - `knowledge_base` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `chatbots` table
    - Add policies for authenticated users to:
      - Create their own chatbots
      - Read their own chatbots
      - Update their own chatbots
      - Delete their own chatbots
*/

CREATE TABLE IF NOT EXISTS chatbots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  welcome_message text NOT NULL DEFAULT 'Hello! How can I help you today?',
  knowledge_base text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE chatbots ENABLE ROW LEVEL SECURITY;

-- Create policies
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