import React from 'react';
import { Brain, Image as ImageIcon, MessageSquare, Sparkles } from 'lucide-react';

export function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          About Converse AI
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover how Converse AI is revolutionizing the way we interact with artificial intelligence
          through natural conversations and advanced image analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            At Converse AI, we're dedicated to making artificial intelligence more accessible and
            useful for everyone. Our platform combines cutting-edge language models with advanced
            image processing capabilities to create a truly versatile AI assistant.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
              <h3 className="font-medium text-gray-900 dark:text-white">
                Advanced AI
              </h3>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
              <h3 className="font-medium text-gray-900 dark:text-white">
                Innovation
              </h3>
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
            alt="AI Technology"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Natural Language Processing
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Engage in fluid conversations with our AI that understands context and nuance.
            </p>
          </div>
          <div>
            <ImageIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Image Analysis
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get detailed insights and descriptions from any image you share.
            </p>
          </div>
          <div>
            <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Continuous Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our AI continuously improves through interactions, providing better responses over time.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Technology Stack
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Built with cutting-edge technologies including Google's Gemini AI, React, and advanced
          image processing capabilities to deliver a seamless and powerful user experience.
        </p>
      </div>
    </div>
  );
}