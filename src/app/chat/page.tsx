'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import ChatHeader from './components/ChatHeader';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import type { Message } from '@/lib/types';
import { sendMessageAction } from './actions';
import { useToast } from "@/hooks/use-toast";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: "Hello! I'm Usha Ma'am, your AI Guru. How can I help you with Physics, Chemistry, Math, or Biology today? Ask a question or upload an image of your doubt. 📚✨",
      isUser: false,
      timestamp: Date.now(),
    },
  ]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSendMessage = (messageText: string, imageDataUri?: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: messageText,
      isUser: true,
      timestamp: Date.now(),
      imageUrl: imageDataUri,
    };

    const loadingMessage: Message = {
      id: `ai-loading-${Date.now()}`,
      text: '',
      isUser: false,
      timestamp: Date.now(),
      isLoading: true,
    }

    setMessages((prev) => [...prev, userMessage, loadingMessage]);

    startTransition(async () => {
      const result = await sendMessageAction(messageText, imageDataUri);
      
      const aiResponse: Message = {
        id: `ai-${Date.now()}`,
        text: "Oops! Something went wrong. Please try again.",
        isUser: false,
        timestamp: Date.now(),
      };

      if (result.answer) {
        aiResponse.text = result.answer;
      } else if(result.error) {
        aiResponse.text = result.error;
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: result.error,
        });
      }

      setMessages((prev) => {
        const newMessages = prev.filter(msg => !msg.isLoading);
        return [...newMessages, aiResponse];
      });
    });
  };

  const handleFeedback = (messageId: string, feedback: 'positive' | 'negative') => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId ? { ...msg, feedback } : msg
      )
    );
    toast({
      title: "Feedback Submitted!",
      description: "Thank you for helping us improve.",
    });
  };


  return (
    <div className="flex flex-col h-screen max-h-screen w-full max-w-md mx-auto bg-white dark:bg-card">
      <ChatHeader />
      <ChatArea messages={messages} onFeedback={handleFeedback} />
      <ChatInput onSendMessage={handleSendMessage} isSending={isPending} />
    </div>
  );
}
