import { dummyAnalytics } from '@/lib/dummy-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function RecentActivity() {
  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {dummyAnalytics.recentActivity.map((activity) => (
            <li key={activity.id} className="flex items-start gap-4">
               <Avatar className="h-9 w-9">
                  <AvatarFallback>{activity.student.charAt(0)}</AvatarFallback>
                </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.student}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              {activity.satisfaction === 'positive' ? (
                <ThumbsUp className="h-5 w-5 text-green-500" />
              ) : (
                <ThumbsDown className="h-5 w-5 text-red-500" />
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
