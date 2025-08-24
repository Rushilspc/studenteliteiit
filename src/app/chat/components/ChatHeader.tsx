'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';

export default function ChatHeader() {
  return (
    <header className="flex items-center p-3 border-b bg-primary/5 dark:bg-primary/10 shadow-sm">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://placehold.co/40x40.png" alt="Usha Ma'am" data-ai-hint="teacher woman" />
          <AvatarFallback>UM</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-foreground">Usha Ma'am</h1>
          <p className="text-sm text-green-500 flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Online
          </p>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2">
         <Avatar>
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <Link href="/">
            <Button variant="ghost" size="icon" aria-label="Logout">
                <LogOut className="h-5 w-5" />
            </Button>
        </Link>
      </div>
    </header>
  );
}
