import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { sendMessage } from '../api';

interface Command {
  trigger: string;
  response: string;
}

interface ChatbotWidgetProps {
  name: string;
  welcomeMessage: string;
  commands: Command[];
  apiKey?: string;
  onClose?: () => void;
}

interface Message {
  content: string;
  isUser: boolean;
  timestamp: number;
}

export function ChatbotWidget({ name, welcomeMessage, commands, apiKey, onClose }: ChatbotWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    { content: welcomeMessage, isUser: false, timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { content: input, isUser: true, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Check for predefined commands first
      const command = commands.find(cmd => 
        input.toLowerCase().includes(cmd.trigger.toLowerCase())
      );

      let response;
      if (command) {
        response = command.response;
      } else if (apiKey) {
        // Use the same sendMessage function from direct chat
        response = await sendMessage(input);
      } else {
        response = "I'm sorry, I don't understand that command.";
      }

      setMessages(prev => [...prev, {
        content: response,
        isUser: false,
        timestamp: Date.now()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        content: "I'm sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-blue-500 text-white rounded-t-lg">
          <h3 className="font-medium text-lg">{name} - Preview Mode</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-blue-600 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}