'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <div className="bg-primary/10 p-3 rounded-full">
        <BrainCircuit className="w-8 h-8 text-primary" />
      </div>
      <span className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-400 text-transparent bg-clip-text">
        AI Guru
      </span>
    </div>
  );
}

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd have validation and an API call here.
    // For the demo, we'll just redirect to the chat page.
    router.push('/chat');
  };

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <div className="absolute top-4 right-4 z-20 flex items-center gap-4">
        <Image src="/logo.png" alt="Elite IIT Logo" width={200} height={40} />
        <Link href="/admin">
          <Button variant="ghost">
            Admin
          </Button>
        </Link>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        <Card className="w-full max-w-sm shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <Logo />
            <CardTitle className="text-2xl">Student Portal Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder=" "
                  className="pt-6 peer"
                  required
                  defaultValue="student123"
                />
                <Label
                  htmlFor="username"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Username
                </Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder=" "
                  className="pt-6 peer pr-10"
                  required
                  defaultValue="password"
                />
                <Label
                  htmlFor="password"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-3 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-full px-2 text-muted-foreground hover:text-foreground"
                  aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                >
                  {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-lg font-bold bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-primary-foreground shadow-lg"
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
