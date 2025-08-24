'use client';

import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, Cell, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { dummyAnalytics } from '@/lib/dummy-data';

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <Card className="lg:col-span-3 shadow-lg">
        <CardHeader>
          <CardTitle>Daily User Engagement</CardTitle>
          <CardDescription>Active users over the last 7 days.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[250px] w-full">
            <ResponsiveContainer>
              <LineChart data={dummyAnalytics.dailyEngagement} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2 shadow-lg">
        <CardHeader>
          <CardTitle>Subject Distribution</CardTitle>
          <CardDescription>Breakdown of questions by subject.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[250px] w-full">
            <ResponsiveContainer>
              <BarChart data={dummyAnalytics.subjectDistribution} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" hide />
                <YAxis dataKey="subject" type="category" tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {dummyAnalytics.subjectDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
