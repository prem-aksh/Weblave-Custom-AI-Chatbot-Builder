import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  // Custom renderer for text formatting
  const customRenderers = {
    text: ({ children }: { children: string }) => {
      // Color formatting rules
      const coloredText = children
        // Names (assumed to be capitalized words)
        .replace(/([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/g, '<span class="text-blue-600 font-semibold">$1</span>')
        // Dates (simple pattern matching)
        .replace(/(\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2})/g, '<span class="text-orange-500">$1</span>')
        // Numbers
        .replace(/(\d+\.?\d*)/g, '<span class="text-purple-600">$1</span>')
        // URLs
        .replace(/(https?:\/\/[^\s]+)/g, '<span class="text-green-600">$1</span>');

      return <span dangerouslySetInnerHTML={{ __html: coloredText }} />;
    }
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''} mb-4`}>
      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-500' : 'bg-gray-600'
      }`}>
        {isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
      </div>
      <div className={`flex-1 px-4 py-2 rounded-lg ${
        isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'
      }`}>
        <ReactMarkdown 
          className="prose max-w-none"
          components={customRenderers}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}