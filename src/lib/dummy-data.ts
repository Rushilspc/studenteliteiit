export const dummyAnalytics = {
  overview: {
    dailyActiveUsers: 42,
    totalUsers: 50,
    satisfactionRate: 84,
    totalQuestions: 1247,
    avgSessionTime: 4.8,
  },
  dailyEngagement: [
    { date: 'Aug 17', users: 38 },
    { date: 'Aug 18', users: 41 },
    { date: 'Aug 19', users: 45 },
    { date: 'Aug 20', users: 39 },
    { date: 'Aug 21', users: 42 },
    { date: 'Aug 22', users: 47 },
    { date: 'Aug 23', users: 42 },
  ],
  subjectDistribution: [
    { subject: 'Math', count: 387, fill: 'hsl(var(--chart-1))' },
    { subject: 'Physics', count: 298, fill: 'hsl(var(--chart-2))' },
    { subject: 'Chemistry', count: 234, fill: 'hsl(var(--chart-3))' },
    { subject: 'Biology', count: 328, fill: 'hsl(var(--chart-4))' },
  ],
  satisfactionBreakdown: [
    { name: 'Positive', value: 84, fill: 'hsl(var(--secondary))' },
    { name: 'Negative', value: 16, fill: 'hsl(var(--destructive))' },
  ],
  recentActivity: [
    { id: 1, student: 'Arjun Kumar', action: 'Asked a Physics doubt', time: '2 min ago', satisfaction: 'positive' as const },
    { id: 2, student: 'Priya Mehta', action: 'Uploaded Chemistry question', time: '5 min ago', satisfaction: 'positive' as const },
    { id: 3, student: 'Rohan Sharma', action: 'Asked a Biology question', time: '12 min ago', satisfaction: 'negative' as const },
    { id: 4, student: 'Sneha Patil', action: 'Asked a Math doubt', time: '28 min ago', satisfaction: 'positive' as const },
    { id: 5, student: 'Vikram Singh', action: 'Asked a Physics question', time: '45 min ago', satisfaction: 'positive' as const },
  ],
  students: [
    { id: 'S001', name: 'Arjun Kumar', engagement: 92, last_active: '2 min ago' },
    { id: 'S002', name: 'Priya Mehta', engagement: 88, last_active: '5 min ago' },
    { id: 'S003', name: 'Rohan Sharma', engagement: 76, last_active: '12 min ago' },
    { id: 'S004', name: 'Sneha Patil', engagement: 95, last_active: '28 min ago' },
    { id: 'S005', name: 'Vikram Singh', engagement: 81, last_active: '45 min ago' },
    { id: 'S006', name: 'Ananya Reddy', engagement: 65, last_active: '2 hours ago' },
    { id: 'S007', name: 'Kabir Das', engagement: 72, last_active: '3 hours ago' },
  ]
};
