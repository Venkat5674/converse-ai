import React from 'react';
import { ArrowRight, MessageSquare, Image, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to <span className="text-blue-600 dark:text-blue-400">Converse AI</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Experience the next generation of AI-powered conversations. Analyze images, generate responses,
          and interact naturally with our advanced AI assistant.
        </p>
        <Link
          to="/use"
          className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
        >
          Try It Now
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Natural Conversations
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Engage in fluid, context-aware conversations with our AI that understands and responds naturally.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
            <Image className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Image Analysis
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Upload images and get detailed analysis, descriptions, and insights powered by advanced AI.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Fast & Efficient
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Get instant responses with our optimized AI processing, making conversations smooth and efficient.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 sm:p-12">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Experience the Future?
        </h2>
        <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
          Join thousands of users already leveraging the power of Converse AI for their conversations
          and image analysis needs.
        </p>
        <Link
          to="/use"
          className="inline-flex items-center px-6 py-3 text-lg font-medium text-blue-600 bg-white hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          Start Chatting
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}