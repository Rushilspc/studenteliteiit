import { dummyAnalytics } from '@/lib/dummy-data';
import StatCard from './components/StatCard';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { RecentActivity } from './components/RecentActivity';
import { StudentList } from './components/StudentList';
import { BarChart, Book, Clock, Heart, Users } from 'lucide-react';

export default function AdminDashboard() {
  const { overview } = dummyAnalytics;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-6">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard 
            title="Daily Active Users" 
            value={`${overview.dailyActiveUsers}/${overview.totalUsers}`} 
            Icon={Users} 
            color="text-sky-500" 
          />
          <StatCard 
            title="Satisfaction Rate" 
            value={`${overview.satisfactionRate}%`} 
            Icon={Heart} 
            color="text-green-500" 
          />
          <StatCard 
            title="Total Questions" 
            value={overview.totalQuestions.toLocaleString()} 
            Icon={Book} 
            color="text-purple-500"
          />
          <StatCard 
            title="Avg Session Time" 
            value={`${overview.avgSessionTime} min`} 
            Icon={Clock} 
            color="text-orange-500"
          />
        </div>

        <div className="mb-6">
          <AnalyticsCharts />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <StudentList />
            </div>
            <div>
                <RecentActivity />
            </div>
        </div>

      </main>
    </div>
  );
}
