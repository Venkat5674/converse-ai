import React from 'react';
import { Send, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  onImageUpload: (file: File) => void;
  isLoading?: boolean;
  isDarkMode?: boolean;
}

export function ChatInput({ onSend, onImageUpload, isLoading, isDarkMode }: ChatInputProps) {
  const [message, setMessage] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onSend(message);
        setMessage('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "p-2 transition-colors duration-200",
          isDarkMode
            ? "text-gray-300 hover:text-gray-100"
            : "text-gray-500 hover:text-gray-700"
        )}
      >
        <ImageIcon className="w-6 h-6" />
      </button>
      <div className="flex-1">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className={cn(
            "w-full resize-none rounded-lg border p-3 transition-colors duration-200",
            isDarkMode
              ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500"
              : "bg-white text-gray-800 border-gray-200 focus:ring-blue-500"
          )}
          rows={1}
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={!message.trim() || isLoading}
        className={cn(
          "p-3 rounded-lg transition-colors duration-200",
          isDarkMode
            ? "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700"
            : "bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300",
          "disabled:cursor-not-allowed text-white"
        )}
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}