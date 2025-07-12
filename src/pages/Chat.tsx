import React from 'react';
import { ChatMessage } from '../components/chat/ChatMessage';
import { ChatInput } from '../components/chat/ChatInput';
import { generateGeminiResponse, analyzeImageWithGemini } from '../lib/gemini';

export function Chat() {
  const [messages, setMessages] = React.useState<Array<{
    id: string;
    message: string;
    isBot: boolean;
    image?: string;
    originalPrompt?: string;
    isTyping?: boolean;
  }>>([
    {
      id: '1',
      message: "Hello! I'm Converse AI. I can help you with text generation, image creation, and image analysis. How can I assist you today?",
      isBot: true,
    },
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [editingMessageId, setEditingMessageId] = React.useState<string | null>(null);
  const [editedMessage, setEditedMessage] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = async (messageId: string, text: string) => {
    const words = text.split(' ');
    let currentText = '';
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? '' : ' ') + words[i];
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, message: currentText, isTyping: i < words.length - 1 }
          : msg
      ));
      await new Promise(resolve => setTimeout(resolve, 30));
    }
    
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isTyping: false }
        : msg
    ));
  };

  const handleSendMessage = async (message: string, regenerateId?: string) => {
    if (!regenerateId) {
      const newMessage = {
        id: Date.now().toString(),
        message,
        isBot: false,
      };
      setMessages((prev) => [...prev, newMessage]);
    }
    setIsLoading(true);

    try {
      if (message.toLowerCase().startsWith('generate image')) {
        const prompt = message.slice('generate image'.length).trim();
        const imageUrl = await generateImage(prompt);
        const newMessageId = Date.now().toString();
        setMessages((prev) => [
          ...prev,
          {
            id: newMessageId,
            message: 'Here\'s your generated image:',
            isBot: true,
            image: imageUrl,
            originalPrompt: message,
          },
        ]);
      } else if (message.toLowerCase().includes('who are you') || message.toLowerCase().includes('who developed you')) {
        const newMessageId = Date.now().toString();
        setMessages((prev) => [
          ...prev,
          {
            id: newMessageId,
            message: '',
            isBot: true,
            originalPrompt: message,
            isTyping: true,
          },
        ]);
        await simulateTyping(newMessageId, "I am Converse AI, a Multi-model Chatbot developed by Venkatesh Pamudurti.");
      } else {
        const response = await generateGeminiResponse(message);
        const newMessageId = Date.now().toString();
        
        setMessages((prev) => {
          const newMessages = regenerateId 
            ? prev.map(msg => msg.id === regenerateId ? {
                ...msg,
                message: '',
                isTyping: true,
              } : msg)
            : [...prev, {
                id: newMessageId,
                message: '',
                isBot: true,
                originalPrompt: message,
                isTyping: true,
              }];
          return newMessages;
        });

        await simulateTyping(regenerateId || newMessageId, response);
      }
    } catch (error) {
      const newMessageId = Date.now().toString();
      setMessages((prev) => [
        ...prev,
        {
          id: newMessageId,
          message: "Sorry, I encountered an error while processing your request. Please try again.",
          isBot: true,
          originalPrompt: message,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async (messageId: string) => {
    const messageToRegenerate = messages.find(msg => msg.id === messageId);
    if (messageToRegenerate?.originalPrompt) {
      await handleSendMessage(messageToRegenerate.originalPrompt, messageId);
    }
  };

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const newMessage = {
        id: Date.now().toString(),
        message: 'Image uploaded:',
        isBot: false,
        image: e.target?.result as string,
      };
      setMessages((prev) => [...prev, newMessage]);
      setIsLoading(true);

      try {
        const analysis = await analyzeImageWithGemini(file);
        const newMessageId = Date.now().toString();
        setMessages((prev) => [
          ...prev,
          {
            id: newMessageId,
            message: '',
            isBot: true,
            isTyping: true,
          },
        ]);
        await simulateTyping(newMessageId, analysis);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            message: "Sorry, I encountered an error while analyzing the image. Please try again.",
            isBot: true,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleEditMessage = (id: string, message: string) => {
    setEditingMessageId(id);
    setEditedMessage(message);
  };

  const handleSaveEdit = async (id: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, message: editedMessage } : msg
      )
    );
    setEditingMessageId(null);
    setEditedMessage('');

    const editedMsg = messages.find((msg) => msg.id === id);
    if (editedMsg && !editedMsg.isBot) {
      await handleSendMessage(editedMessage);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="h-[calc(100vh-10rem)] flex flex-col rounded-lg shadow-sm bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg.message}
              isBot={msg.isBot}
              image={msg.image}
              isEditing={editingMessageId === msg.id}
              editedMessage={editedMessage}
              onEdit={() => handleEditMessage(msg.id, msg.message)}
              onSaveEdit={() => handleSaveEdit(msg.id)}
              onEditChange={setEditedMessage}
              onRegenerate={() => handleRegenerate(msg.id)}
              isTyping={msg.isTyping}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t p-4 dark:border-gray-700">
          <ChatInput
            onSend={handleSendMessage}
            onImageUpload={handleImageUpload}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}