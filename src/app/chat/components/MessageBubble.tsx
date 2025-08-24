import type { Message } from '@/lib/types';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type MessageBubbleProps = {
  message: Message;
  onFeedback: (messageId: string, feedback: 'positive' | 'negative') => void;
};

const TypingIndicator = () => (
    <div className="flex items-center space-x-1">
        <span className="text-sm text-muted-foreground">Typing</span>
        <div className="flex items-center space-x-1">
            <div className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-bounce"></div>
        </div>
    </div>
);


export default function MessageBubble({ message, onFeedback }: MessageBubbleProps) {
  const { id, text, isUser, timestamp, imageUrl, feedback, isLoading } = message;

  const time = new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex flex-col max-w-xs lg:max-w-md ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={cn(
            'px-4 py-3 rounded-2xl break-words',
            isUser
              ? 'bg-gradient-to-r from-primary to-purple-500 text-primary-foreground rounded-br-lg'
              : 'bg-gray-100 dark:bg-slate-700 text-foreground rounded-bl-lg'
          )}
        >
          {isLoading ? (
            <TypingIndicator />
          ) : (
            <>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="User upload"
                  width={300}
                  height={200}
                  className="rounded-lg mb-2"
                />
              )}
              {text && <p className="text-sm whitespace-pre-wrap">{text}</p>}
            </>
          )}
        </div>
        <div className="flex items-center mt-1.5 space-x-2">
          <span className="text-xs text-muted-foreground">{time}</span>
          {!isUser && !isLoading && (
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                className={cn('h-6 w-6', feedback === 'positive' && 'text-secondary bg-secondary/10')}
                onClick={() => onFeedback(id, 'positive')}
                disabled={!!feedback}
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className={cn('h-6 w-6', feedback === 'negative' && 'text-destructive bg-destructive/10')}
                onClick={() => onFeedback(id, 'negative')}
                disabled={!!feedback}
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
