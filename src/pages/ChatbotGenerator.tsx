import React, { useState } from 'react';
import { Bot, Plus, X, Copy, Check, Trash } from 'lucide-react';
import { ChatbotWidget } from '../components/ChatbotWidget';

interface Command {
  trigger: string;
  response: string;
}

interface ChatbotConfig {
  name: string;
  welcomeMessage: string;
  commands: Command[];
  apiKey?: string;
}

function ChatbotGenerator() {
  const [isCreating, setIsCreating] = useState(false);
  const [config, setConfig] = useState<ChatbotConfig>({
    name: '',
    welcomeMessage: '',
    commands: [],
  });
  const [newCommand, setNewCommand] = useState({ trigger: '', response: '' });
  const [useAI, setUseAI] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleAddCommand = () => {
    if (newCommand.trigger && newCommand.response) {
      setConfig(prev => ({
        ...prev,
        commands: [...prev.commands, newCommand],
      }));
      setNewCommand({ trigger: '', response: '' });
    }
  };

  const handleRemoveCommand = (index: number) => {
    setConfig(prev => ({
      ...prev,
      commands: prev.commands.filter((_, i) => i !== index),
    }));
  };

  const generateEmbedCode = () => {
    const botCode = `
<!-- Weblave Chatbot -->
<script>
(function() {
  const botConfig = {
    name: "${config.name}",
    welcomeMessage: "${config.welcomeMessage}",
    commands: ${JSON.stringify(config.commands)},
    ${config.apiKey ? `apiKey: "${config.apiKey}",` : ''}
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
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Chatbot Generator</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Chatbot
        </button>
      </div>

      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Create New Chatbot</h2>
              <button
                onClick={() => setIsCreating(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={config.name}
                  onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="My Chatbot"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Welcome Message
                </label>
                <input
                  type="text"
                  value={config.welcomeMessage}
                  onChange={(e) => setConfig(prev => ({ ...prev, welcomeMessage: e.target.value }))}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Hello! How can I help you today?"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Commands
                </label>
                <div className="space-y-4">
                  {config.commands.map((cmd, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <div className="flex-1">
                        <p className="font-medium">Trigger: {cmd.trigger}</p>
                        <p className="text-gray-600">Response: {cmd.response}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveCommand(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={newCommand.trigger}
                      onChange={(e) => setNewCommand(prev => ({ ...prev, trigger: e.target.value }))}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Command trigger (e.g., 'pricing')"
                    />
                    <textarea
                      value={newCommand.response}
                      onChange={(e) => setNewCommand(prev => ({ ...prev, response: e.target.value }))}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Response"
                      rows={3}
                    />
                    <button
                      onClick={handleAddCommand}
                      className="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200"
                    >
                      Add Command
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={useAI}
                    onChange={(e) => {
                      setUseAI(e.target.checked);
                      if (!e.target.checked) {
                        setConfig(prev => ({ ...prev, apiKey: undefined }));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Enable AI responses (Gemini API)</span>
                </label>

                {useAI && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        API Key
                      </label>
                      <input
                        type="password"
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          apiKey: e.target.value,
                        }))}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your Gemini API Key"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowPreview(true)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Preview Chatbot
                </button>
                <button
                  onClick={() => setShowCode(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPreview && (
        <ChatbotWidget
          name={config.name}
          welcomeMessage={config.welcomeMessage}
          commands={config.commands}
          apiKey={config.apiKey}
          onClose={() => setShowPreview(false)}
        />
      )}

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
    </div>
  );
}

export default ChatbotGenerator;