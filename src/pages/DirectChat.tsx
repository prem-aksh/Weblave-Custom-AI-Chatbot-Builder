import React, { useState, useRef } from 'react';
import { Send, Upload, Loader2, FileText, X, Bot, Copy, Check } from 'lucide-react';
import { ChatMessage } from '../components/ChatMessage';
import { sendMessage } from '../api';
import { ChatbotWidget } from '../components/ChatbotWidget';
import type { ChatState, Message } from '../types';

function DirectChat() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    loading: false,
    error: null,
    currentPdf: null
  });
  
  const [input, setInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showChatbotCreator, setShowChatbotCreator] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [chatbotConfig, setChatbotConfig] = useState({
    name: '',
    welcomeMessage: 'Hello! How can I help you today?',
    commands: [] as { trigger: string; response: string }[],
    apiKey: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      loading: true,
      error: null
    }));

    setInput('');

    try {
      const response = await sendMessage(input, state.currentPdf);
      
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, {
          role: 'assistant',
          content: response,
          timestamp: Date.now()
        }],
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to get response. Please try again.'
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setState(prev => ({ ...prev, currentPdf: file }));
    }
  };

  const removePdf = () => {
    setState(prev => ({ ...prev, currentPdf: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCreateChatbot = () => {
    // Convert chat history to chatbot commands
    const commands = state.messages.reduce((acc, curr, index, array) => {
      if (curr.role === 'user' && index + 1 < array.length && array[index + 1].role === 'assistant') {
        acc.push({
          trigger: curr.content,
          response: array[index + 1].content
        });
      }
      return acc;
    }, [] as { trigger: string; response: string }[]);

    setChatbotConfig(prev => ({
      ...prev,
      commands
    }));
    setShowChatbotCreator(true);
  };

  const generateEmbedCode = () => {
    const botCode = `
<!-- Weblave Chatbot -->
<script>
(function() {
  const botConfig = {
    name: "${chatbotConfig.name}",
    welcomeMessage: "${chatbotConfig.welcomeMessage}",
    commands: ${JSON.stringify(chatbotConfig.commands)},
    ${chatbotConfig.apiKey ? `apiKey: "${chatbotConfig.apiKey}",` : ''}
  };

  function createChatbot() {
    const container = document.createElement('div');
    container.id = 'weblave-chatbot';
    document.body.appendChild(container);

    const style = document.createElement('style');
    style.textContent = \`
      #weblave-chatbot {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        font-family: system-ui, -apple-system, sans-serif;
      }
      .weblave-chatbot-button {
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        width: 56px;
        height: 56px;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s;
      }
      .weblave-chatbot-button:hover {
        transform: scale(1.05);
      }
      .weblave-chat-window {
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 350px;
        height: 500px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: none;
        flex-direction: column;
        transition: opacity 0.3s, transform 0.3s;
      }
      .weblave-chat-window.open {
        display: flex;
        animation: slideIn 0.3s ease-out;
      }
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .weblave-chat-header {
        padding: 16px;
        background: #2563eb;
        color: white;
        border-radius: 12px 12px 0 0;
        font-weight: 600;
      }
      .weblave-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        scroll-behavior: smooth;
      }
      .weblave-chat-input {
        padding: 16px;
        border-top: 1px solid #e5e7eb;
      }
      .weblave-chat-input input {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        transition: border-color 0.2s;
      }
      .weblave-chat-input input:focus {
        outline: none;
        border-color: #2563eb;
        box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
      }
      .weblave-message {
        margin-bottom: 12px;
        max-width: 80%;
        animation: messageIn 0.3s ease-out;
      }
      @keyframes messageIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .weblave-message.bot {
        margin-right: auto;
        background: #f3f4f6;
        padding: 10px 14px;
        border-radius: 14px;
        color: #1f2937;
      }
      .weblave-message.user {
        margin-left: auto;
        background: #2563eb;
        color: white;
        padding: 10px 14px;
        border-radius: 14px;
      }
      .weblave-typing {
        display: flex;
        gap: 4px;
        padding: 8px 12px;
        background: #f3f4f6;
        border-radius: 12px;
        width: fit-content;
        margin-bottom: 12px;
      }
      .weblave-typing-dot {
        width: 6px;
        height: 6px;
        background: #6b7280;
        border-radius: 50%;
        animation: typing 1.4s infinite;
      }
      .weblave-typing-dot:nth-child(2) { animation-delay: 0.2s; }
      .weblave-typing-dot:nth-child(3) { animation-delay: 0.4s; }
      @keyframes typing {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-4px); }
      }
    \`;
    document.head.appendChild(style);

    let isOpen = false;
    const button = document.createElement('button');
    button.className = 'weblave-chatbot-button';
    button.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
    
    const chatWindow = document.createElement('div');
    chatWindow.className = 'weblave-chat-window';
    
    // Initialize chat window content
    chatWindow.innerHTML = \`
      <div class="weblave-chat-header">
        <h3>\${botConfig.name}</h3>
      </div>
      <div class="weblave-chat-messages" id="weblave-messages">
        <div class="weblave-message bot">\${botConfig.welcomeMessage}</div>
      </div>
      <div class="weblave-chat-input">
        <input type="text" placeholder="Type your message...">
      </div>
    \`;

    container.appendChild(button);
    container.appendChild(chatWindow);

    button.addEventListener('click', () => {
      isOpen = !isOpen;
      chatWindow.style.display = isOpen ? 'flex' : 'none';
      if (isOpen) {
        chatWindow.classList.add('open');
      }
    });

    const input = chatWindow.querySelector('input');
    const messages = chatWindow.querySelector('#weblave-messages');

    function showTypingIndicator() {
      const typing = document.createElement('div');
      typing.className = 'weblave-typing';
      typing.innerHTML = \`
        <div class="weblave-typing-dot"></div>
        <div class="weblave-typing-dot"></div>
        <div class="weblave-typing-dot"></div>
      \`;
      messages.appendChild(typing);
      messages.scrollTop = messages.scrollHeight;
      return typing;
    }

    function removeTypingIndicator(element) {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }

    input.addEventListener('keypress', async (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        const userMessage = input.value.trim();
        
        // Add user message
        messages.innerHTML += \`
          <div class="weblave-message user">\${userMessage}</div>
        \`;

        // Clear input
        input.value = '';
        messages.scrollTop = messages.scrollHeight;

        // Show typing indicator
        const typingIndicator = showTypingIndicator();

        // Find matching command
        const command = botConfig.commands.find(cmd => 
          userMessage.toLowerCase().includes(cmd.trigger.toLowerCase())
        );

        let response;
        if (command) {
          // Simulate natural response time for predefined commands
          await new Promise(resolve => setTimeout(resolve, 500));
          response = command.response;
        } else if (botConfig.apiKey) {
          try {
            const aiResponse = await fetch(
              'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + botConfig.apiKey,
                },
                body: JSON.stringify({
                  contents: [{ parts: [{ text: userMessage }] }]
                })
              }
            );
            
            if (!aiResponse.ok) {
              throw new Error('API request failed');
            }

            const data = await aiResponse.json();
            response = data.candidates[0].content.parts[0].text;
          } catch (error) {
            response = "I'm sorry, I couldn't process that request. Please try again later.";
          }
        } else {
          await new Promise(resolve => setTimeout(resolve, 500));
          response = "I'm sorry, I don't understand that command.";
        }

        // Remove typing indicator and add bot response
        removeTypingIndicator(typingIndicator);
        messages.innerHTML += \`
          <div class="weblave-message bot">\${response}</div>
        \`;

        // Scroll to bottom
        messages.scrollTop = messages.scrollHeight;
      }
    });
  }

  // Initialize chatbot when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createChatbot);
  } else {
    createChatbot();
  }
})();
</script>`;

    return botCode;
  };

  const handleCopyCode = () => {
    const code = generateEmbedCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-gray-800 text-white flex items-center justify-between">
          <h1 className="text-xl font-semibold">Weblave - Direct Command</h1>
          <button
            onClick={handleCreateChatbot}
            className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            disabled={state.messages.length === 0}
          >
            <Bot className="w-4 h-4 mr-2" />
            Create Chatbot
          </button>
        </div>
        
        <div className="flex">
          <div className="flex-1">
            <div 
              ref={chatContainerRef}
              className="h-[calc(100vh-240px)] overflow-y-auto p-4"
            >
              {state.messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              
              {state.loading && (
                <div className="flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                </div>
              )}
              
              {state.error && (
                <div className="text-red-500 text-center py-2">
                  {state.error}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Upload className="w-6 h-6" />
                </button>
                
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <button
                  type="submit"
                  disabled={state.loading || !input.trim()}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </form>
          </div>

          {state.currentPdf && (
            <div className="w-80 border-l p-4 bg-gray-50">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-blue-500 mr-2" />
                  <h3 className="font-medium text-gray-700 truncate">
                    {state.currentPdf.name}
                  </h3>
                </div>
                <button
                  onClick={removePdf}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">
                  PDF loaded and ready for analysis. Ask questions about its contents!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Chatbot Creator Modal */}
      {showChatbotCreator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Create Chatbot from Chat</h2>
              <button
                onClick={() => setShowChatbotCreator(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Chatbot Name
                </label>
                <input
                  type="text"
                  value={chatbotConfig.name}
                  onChange={(e) => setChatbotConfig(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="My AI Assistant"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Welcome Message
                </label>
                <input
                  type="text"
                  value={chatbotConfig.welcomeMessage}
                  onChange={(e) => setChatbotConfig(prev => ({ ...prev, welcomeMessage: e.target.value }))}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Hello! How can I help you today?"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Learned Commands
                </label>
                <div className="space-y-2">
                  {chatbotConfig.commands.map((cmd, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded">
                      <p className="font-medium">Trigger: "{cmd.trigger}"</p>
                      <p className="text-gray-600 mt-1">Response: "{cmd.response}"</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Gemini API Key (Optional)
                </label>
                <input
                  type="password"
                  value={chatbotConfig.apiKey}
                  onChange={(e) => setChatbotConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Gemini API Key for AI responses"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Add an API key to enable AI responses for unknown commands
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowCode(true)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  View Code
                </button>
                <button
                  onClick={() => setShowPreview(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={!chatbotConfig.name}
                >
                  Preview Chatbot
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Code View Modal */}
      {showCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Embed Code</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 mr-2" />
                      Copy Code
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowCode(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">
                {generateEmbedCode()}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Preview */}
      {showPreview && (
        <ChatbotWidget
          name={chatbotConfig.name}
          welcomeMessage={chatbotConfig.welcomeMessage}
          commands={chatbotConfig.commands}
          apiKey={chatbotConfig.apiKey}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}

export default DirectChat;