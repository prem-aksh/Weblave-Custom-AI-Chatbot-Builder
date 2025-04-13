import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Bot, ArrowRight } from 'lucide-react';

function LandingPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-gray-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl font-sans">
                  <span className="block">Transform your</span>
                  <span className="block text-custom-medium">conversations with AI</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Weblave brings you powerful AI tools to enhance your communication and automate your workflows. Start with direct chat or create your own custom chatbot.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/direct-chat"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-custom-dark hover:bg-custom-medium md:py-4 md:text-lg md:px-10"
                    >
                      Try Direct Chat
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/chatbot-generator"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-custom-dark bg-custom-light hover:bg-custom-lightest md:py-4 md:text-lg md:px-10"
                    >
                      Create Chatbot
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="AI Technology"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-custom-dark font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              AI-powered solutions for everyone
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {/* Direct Chat Feature */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-custom-dark text-white">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Direct Chat</p>
                <div className="mt-2 ml-16 text-base text-gray-500">
                  Engage in real-time conversations with our advanced AI. Upload documents and get instant analysis and responses.
                  <Link to="/direct-chat" className="mt-3 inline-flex items-center text-custom-dark hover:text-custom-medium">
                    Try it now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Chatbot Generator Feature */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-custom-dark text-white">
                  <Bot className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Chatbot Generator</p>
                <div className="mt-2 ml-16 text-base text-gray-500">
                  Create custom chatbots tailored to your needs. Train them with your data and deploy them anywhere.
                  <Link to="/chatbot-generator" className="mt-3 inline-flex items-center text-custom-dark hover:text-custom-medium">
                    Coming soon <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;