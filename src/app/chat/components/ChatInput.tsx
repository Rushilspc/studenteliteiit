'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Paperclip, Send, X, ArrowUp } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

type ChatInputProps = {
  onSendMessage: (message: string, imageDataUri?: string) => void;
  isSending: boolean;
};

export default function ChatInput({ onSendMessage, isSending }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSend = () => {
    if ((!message.trim() && !imagePreview) || isSending) return;
    onSendMessage(message, imagePreview || undefined);
    setMessage('');
    setImagePreview(null);
    if(fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 border-t bg-background">
        {imagePreview && (
            <div className="relative w-full mb-2 p-2 border rounded-lg">
                <Image src={imagePreview} alt="Preview" width={100} height={100} className="rounded-md" />
                <Button variant="ghost" size="icon" className="absolute top-0 right-0 h-8 w-8 rounded-full bg-black/50 text-white" onClick={() => {
                    setImagePreview(null)
                    if(fileInputRef.current) fileInputRef.current.value = '';
                }}>
                    <X className="h-4 w-4" />
                </Button>
            </div>
        )}
      <div className="flex items-end gap-2">
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask your doubt..."
          className="flex-1 resize-none max-h-40 min-h-[44px]"
          rows={1}
          disabled={isSending}
        />
        <Button variant="ghost" size="icon" className="shrink-0" onClick={() => fileInputRef.current?.click()}>
            <Camera className="h-6 w-6" />
        </Button>
        <Button 
            className="shrink-0 h-11 w-11 bg-gradient-to-r from-primary to-purple-500 text-white rounded-full disabled:opacity-70" 
            onClick={handleSend}
            disabled={(!message.trim() && !imagePreview) || isSending}
            aria-label="Send Message"
        >
            <ArrowUp className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
