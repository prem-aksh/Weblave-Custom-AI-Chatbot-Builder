/*
  # Remove Chatbot Schema

  1. Changes
    - Drop `chatbots` table and its associated policies
    - Keep only authentication-related tables and functionality

  2. Security
    - No changes to existing authentication security
*/

-- Drop chatbots table and its policies
DROP TABLE IF EXISTS chatbots;

-- Keep only the profiles table and its policies for authentication
-- No changes needed to the profiles table as it's tied to authentication