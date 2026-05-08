/**
 * Admin Dashboard Page
 * Main dashboard for portfolio management
 * Requirements: 6.1
 */

'use client';

import React from 'react';
import { AuthGuard } from '@/components/auth';
import { useAuth } from '@/components/auth';

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Portfolio Admin
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Welcome back, {user?.name}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Projects Card */}
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                        <span className="text-white font-semibold">P</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                          Projects
                        </dt>
                        <dd className="text-lg font-medium text-gray-900 dark:text-white">
                          Manage portfolio projects
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                  <div className="text-sm">
                    <button className="font-medium text-blue-600 hover:text-blue-500">
                      View all projects
                    </button>
                  </div>
                </div>
              </div>

              {/* Skills Card */}
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                        <span className="text-white font-semibold">S</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                          Skills
                        </dt>
                        <dd className="text-lg font-medium text-gray-900 dark:text-white">
                          Manage technical skills
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                  <div className="text-sm">
                    <button className="font-medium text-green-600 hover:text-green-500">
                      View all skills
                    </button>
                  </div>
                </div>
              </div>

              {/* Experience Card */}
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                        <span className="text-white font-semibold">E</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                          Experience
                        </dt>
                        <dd className="text-lg font-medium text-gray-900 dark:text-white">
                          Manage work experience
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                  <div className="text-sm">
                    <button className="font-medium text-purple-600 hover:text-purple-500">
                      View all experience
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Add New Project
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Add New Skill
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Add Experience
                  </button>
                  <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Add Certificate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}