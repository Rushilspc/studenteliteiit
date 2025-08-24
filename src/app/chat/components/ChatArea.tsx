'use client';

import type { Message } from '@/lib/types';
import MessageBubble from './MessageBubble';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useRef } from 'react';

type ChatAreaProps = {
  messages: Message[];
  onFeedback: (messageId: string, feedback: 'positive' | 'negative') => void;
};

export default function ChatArea({ messages, onFeedback }: ChatAreaProps) {
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTo({
        top: scrollViewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  
  return (
    <ScrollArea className="flex-1" viewportRef={scrollViewportRef}>
      <div className="p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} onFeedback={onFeedback} />
        ))}
      </div>
    </ScrollArea>
  );
}
