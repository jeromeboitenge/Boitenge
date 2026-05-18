'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaUsers, FaEnvelope, FaGlobeAmericas, FaChartLine, FaProjectDiagram, FaMapMarkerAlt } from 'react-icons/fa';
import { analytics } from '@/lib/analytics';

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = () => {
      const data = analytics.getAnalytics();
      setAnalyticsData(data);
      setIsLoading(false);
    };

    loadAnalytics();
    // Refresh every 30 seconds
    const interval = setInterval(loadAnalytics, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Track visitor behavior and portfolio performance
          </p>
        </div>
        <button
          onClick={() => {
            const data = analytics.getAnalytics();
            setAnalyticsData(data);
          }}
          className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaEye />}
          label="Total Views"
          value={analyticsData.totalViews}
          color="blue"
        />
        <StatCard
          icon={<FaUsers />}
          label="Unique Visitors"
          value={analyticsData.uniqueVisitors}
          color="green"
        />
        <StatCard
          icon={<FaEnvelope />}
          label="Contact Forms"
          value={analyticsData.contactFormSubmissions}
          color="purple"
        />
        <StatCard
          icon={<FaGlobeAmericas />}
          label="Countries"
          value={analyticsData.visitorLocations.length}
          color="orange"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Views Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FaChartLine className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Daily Views</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Last 7 days</p>
            </div>
          </div>
          <div className="space-y-3">
            {analyticsData.dailyViews.map((day: any, idx: number) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-xs text-slate-600 dark:text-slate-400 w-24">
                  {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-8 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(day.count / Math.max(...analyticsData.dailyViews.map((d: any) => d.count))) * 100}%` }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="h-full bg-gradient-to-r from-primary to-accent flex items-center justify-end pr-3"
                  >
                    <span className="text-xs font-bold text-white">{day.count}</span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Projects */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <FaProjectDiagram className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Popular Projects</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Most viewed</p>
            </div>
          </div>
          <div className="space-y-3">
            {analyticsData.popularProjects.slice(0, 5).map((project: any, idx: number) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{idx + 1}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {project.name}
                  </span>
                </div>
                <span className="text-sm font-bold text-primary">{project.views} views</span>
              </motion.div>
            ))}
            {analyticsData.popularProjects.length === 0 && (
              <p className="text-center text-slate-500 dark:text-slate-400 py-8">
                No project views yet
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Visitor Locations & Popular Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitor Locations */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <FaMapMarkerAlt className="text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Visitor Locations</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">By country</p>
            </div>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {analyticsData.visitorLocations.slice(0, 10).map((location: any, idx: number) => (
              <motion.div
                key={location.country}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getCountryFlag(location.country)}</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {location.country}
                  </span>
                </div>
                <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                  {location.count} visits
                </span>
              </motion.div>
            ))}
            {analyticsData.visitorLocations.length === 0 && (
              <p className="text-center text-slate-500 dark:text-slate-400 py-8">
                No location data yet
              </p>
            )}
          </div>
        </div>

        {/* Popular Pages */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <FaChartLine className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Popular Pages</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Most visited</p>
            </div>
          </div>
          <div className="space-y-3">
            {analyticsData.pageViews.slice(0, 8).map((page: any, idx: number) => (
              <motion.div
                key={page.page}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl"
              >
                <span className="text-sm font-mono text-slate-700 dark:text-slate-300">
                  {page.page}
                </span>
                <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                  {page.count}
                </span>
              </motion.div>
            ))}
            {analyticsData.pageViews.length === 0 && (
              <p className="text-center text-slate-500 dark:text-slate-400 py-8">
                No page views yet
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {analyticsData.recentEvents.map((event: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.02 }}
              className="flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <div className={`w-2 h-2 rounded-full ${getEventColor(event.type)}`}></div>
              <span className="text-xs text-slate-500 dark:text-slate-400 w-20">
                {new Date(event.timestamp).toLocaleTimeString()}
              </span>
              <span className="text-sm text-slate-700 dark:text-slate-300 flex-1">
                {getEventDescription(event)}
              </span>
              {event.location?.country && (
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {event.location.country}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: any) {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center text-xl`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

function getEventColor(type: string) {
  const colors: Record<string, string> = {
    page_view: 'bg-blue-500',
    project_view: 'bg-green-500',
    contact_form: 'bg-purple-500',
    download_cv: 'bg-orange-500',
    external_link: 'bg-pink-500',
  };
  return colors[type] || 'bg-slate-500';
}

function getEventDescription(event: any) {
  switch (event.type) {
    case 'page_view':
      return `Viewed ${event.page}`;
    case 'project_view':
      return `Viewed project: ${event.projectName}`;
    case 'contact_form':
      return 'Submitted contact form';
    case 'download_cv':
      return 'Downloaded CV';
    case 'external_link':
      return `Clicked external link: ${event.page}`;
    default:
      return event.type;
  }
}

function getCountryFlag(country: string) {
  const flags: Record<string, string> = {
    'United States': '🇺🇸',
    'United Kingdom': '🇬🇧',
    'Canada': '🇨🇦',
    'Germany': '🇩🇪',
    'France': '🇫🇷',
    'Rwanda': '🇷🇼',
    'Kenya': '🇰🇪',
    'Uganda': '🇺🇬',
    'Tanzania': '🇹🇿',
    'Nigeria': '🇳🇬',
    'South Africa': '🇿🇦',
    'India': '🇮🇳',
    'China': '🇨🇳',
    'Japan': '🇯🇵',
    'Australia': '🇦🇺',
  };
  return flags[country] || '🌍';
}
