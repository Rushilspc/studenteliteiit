'use client';

import { useState, useRef, useEffect } from 'react';
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
      text: "Hello! I'm Usha Ma'am, your Mentor at EliteIIT. How can I help you with Physics, Chemistry, Math, or Biology today? Ask a question or upload an image of your doubt. 📚✨",
      isUser: false,
      timestamp: Date.now(),
    },
  ]);
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (messageText: string, imageDataUri?: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: messageText,
      isUser: true,
      timestamp: Date.now(),
      imageUrl: imageDataUri,
    };
    
    setIsPending(true);
    setMessages((prev) => [...prev, userMessage]);

    const aiResponseId = `ai-${Date.now()}`;
    const aiLoadingMessage: Message = {
      id: aiResponseId,
      text: '',
      isUser: false,
      timestamp: Date.now(),
      isLoading: true,
    };
    setMessages((prev) => [...prev, aiLoadingMessage]);

    const result = await sendMessageAction(messageText, imageDataUri);

    let aiResponseMessage: Message;
    if (result.error) {
       aiResponseMessage = {
        id: aiResponseId,
        text: result.error,
        isUser: false,
        timestamp: Date.now(),
        isLoading: false,
      };
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: result.error,
      });
    } else {
       aiResponseMessage = {
        id: aiResponseId,
        text: result.answer!,
        isUser: false,
        timestamp: Date.now(),
        isLoading: false,
      };
    }
    
    setMessages(prev => prev.map(msg => msg.id === aiResponseId ? aiResponseMessage : msg));
    setIsPending(false);
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
