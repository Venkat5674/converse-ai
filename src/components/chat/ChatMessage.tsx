import React from 'react';
import { Bot, User, Download, Edit2, Check, Copy, CheckCheck, RefreshCw } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChatMessageProps {
  message: string;
  isBot?: boolean;
  image?: string;
  isDarkMode?: boolean;
  isEditing?: boolean;
  editedMessage?: string;
  onEdit?: () => void;
  onSaveEdit?: () => void;
  onEditChange?: (value: string) => void;
  onRegenerate?: () => void;
  isTyping?: boolean;
}

export function ChatMessage({
  message,
  isBot = false,
  image,
  isDarkMode = false,
  isEditing = false,
  editedMessage = '',
  onEdit,
  onSaveEdit,
  onEditChange,
  onRegenerate,
  isTyping = false,
}: ChatMessageProps) {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatMessage = (text: string) => {
    // Split the message into parts based on code blocks
    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        // Handle code blocks
        const lines = part.slice(3, -3).split('\n');
        const language = lines[0] || 'plaintext';
        const code = lines.slice(1).join('\n');

        return (
          <div key={index} className="my-4 rounded-lg overflow-hidden">
            <div className={cn(
              "flex justify-between items-center px-4 py-2",
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            )}>
              <span className="text-sm font-medium">{language}</span>
              <button
                onClick={() => handleCopy(code)}
                className={cn(
                  "p-1 rounded transition-colors duration-200",
                  isDarkMode
                    ? "hover:bg-gray-600"
                    : "hover:bg-gray-200"
                )}
              >
                {isCopied ? (
                  <CheckCheck className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <SyntaxHighlighter
              language={language.toLowerCase()}
              style={isDarkMode ? oneDark : oneLight}
              customStyle={{
                margin: 0,
                padding: '1rem',
                background: isDarkMode ? '#1f2937' : '#f9fafb',
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        );
      } else {
        // Handle other formatting
        return part.split('\n').map((line, lineIndex) => {
          // Handle bold text with **
          line = line.replace(/\*\*(.*?)\*\*/g, '<h3 class="font-bold text-lg inline">$1</h3>');
          
          // Handle bullet points with *
          if (line.trim().startsWith('* ')) {
            line = `<li class="ml-4">• ${line.slice(2)}</li>`;
          }
          
          // Handle inline code with `
          line = line.replace(/`(.*?)`/g, '<em class="bg-gray-200 dark:bg-gray-700 px-1 rounded">$1</em>');

          return (
            <div
              key={`${index}-${lineIndex}`}
              className="my-1"
              dangerouslySetInnerHTML={{ __html: line }}
            />
          );
        });
      }
    });
  };

  return (
    <div
      className={cn(
        'flex gap-3 p-4 rounded-lg transition-colors duration-200',
        isDarkMode
          ? isBot ? 'bg-gray-700' : 'bg-gray-800'
          : isBot ? 'bg-gray-50' : 'bg-white'
      )}
    >
      <div className="flex-shrink-0">
        {isBot ? (
          <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src="https://i.ibb.co/0px2rjSX/image.png" 
              alt="Bot Logo" 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
      <div className="flex-1 space-y-2">
        {isEditing ? (
          <div className="flex gap-2">
            <textarea
              value={editedMessage}
              onChange={(e) => onEditChange?.(e.target.value)}
              className={cn(
                "flex-1 p-2 rounded-lg border resize-none",
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-800 border-gray-200"
              )}
              rows={3}
            />
            <button
              onClick={onSaveEdit}
              className={cn(
                "p-2 rounded-lg",
                isDarkMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              )}
            >
              <Check className="w-5 h-5 text-white" />
            </button>
          </div>
        ) : (
          <div className="group relative">
            <div className={cn(
              "text-sm",
              isDarkMode ? "text-gray-100" : "text-gray-800"
            )}>
              {formatMessage(message)}
              {isTyping && (
                <span className="inline-flex ml-2">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </span>
              )}
            </div>
            <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
              {!isBot && (
                <button
                  onClick={onEdit}
                  className={cn(
                    "p-1 rounded-lg",
                    isDarkMode
                      ? "bg-gray-600 hover:bg-gray-500"
                      : "bg-gray-100 hover:bg-gray-200"
                  )}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
              {isBot && (
                <button
                  onClick={onRegenerate}
                  className={cn(
                    "p-1 rounded-lg",
                    isDarkMode
                      ? "bg-gray-600 hover:bg-gray-500"
                      : "bg-gray-100 hover:bg-gray-200"
                  )}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => handleCopy(message)}
                className={cn(
                  "p-1 rounded-lg",
                  isDarkMode
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-gray-100 hover:bg-gray-200"
                )}
              >
                {isCopied ? (
                  <CheckCheck className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        )}
        {image && (
          <div className="relative group">
            <img
              src={image}
              alt="Generated"
              className="rounded-lg max-w-full h-auto object-cover"
            />
            <button
              onClick={() => handleDownload(image)}
              className={cn(
                "absolute top-2 right-2 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-100"
              )}
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}