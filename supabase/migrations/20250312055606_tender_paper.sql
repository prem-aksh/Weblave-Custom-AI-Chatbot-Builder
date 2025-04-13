/*
  # Remove Chatbot Tables
  
  This migration removes all chatbot-related tables while preserving authentication tables.
*/

-- Drop chatbot_websites table first (due to foreign key constraint)
DROP TABLE IF EXISTS chatbot_websites;

-- Drop chatbots table
DROP TABLE IF EXISTS chatbots;