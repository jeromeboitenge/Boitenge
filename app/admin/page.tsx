/**
 * Admin Dashboard Page
 * Main dashboard for portfolio management
 * Requirements: 6.1
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthGuard } from '@/components/auth';
import { useAuth } from '@/components/auth';
import { apiClient } from '@/lib/api-client';
import { Project, Skill, Experience, Certificate, Message } from '@/types';
import { FaProjectDiagram, FaCode, FaBriefcase, FaCertificate, FaPlus, FaEdit, FaTrash, FaEye, FaEnvelope, FaEnvelopeOpen, FaChartLine, FaClock, FaCheckCircle, FaUser } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectFormModal from '@/components/ProjectFormModal';
import SkillFormModal from '@/components/SkillFormModal';
import CertificateFormModal from '@/components/CertificateFormModal';
import ExperienceFormModal from '@/components/ExperienceFormModal';
import AdminDiagnostics from '@/components/AdminDiagnostics';
import RoleChecker from '@/components/RoleChecker';
import CertificateViewer from '@/components/CertificateViewer';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import ProfileImageCard from '@/components/ProfileImageCard';
import CvCard from '@/components/CvCard';
import { toast, Toaster } from 'react-hot-toast';
import { buildBackendUrl } from '@/lib/backend-config';

type TabType = 'analytics' | 'profile' | 'projects' | 'skills' | 'experience' | 'certificates' | 'messages';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ projects: 0, skills: 0, experience: 0, certificates: 0, messages: 0 });
  const [quickStats, setQuickStats] = useState({
    totalMessages: 0,
    unreadMessages: 0,
    recentMessages: 0,
    responseRate: 100
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      
      // Ensure token is set in apiClient
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        try {
          const authData = JSON.parse(authStorage);
          const token = authData?.state?.token;
          if (token) {
            apiClient.setToken(token);
          }
        } catch (e) {
          console.error('Failed to parse auth data:', e);
        }
      }
      
      // Fetch all data including messages
      const [projectsData, skillsData, experienceData, certificatesData, messagesData] = await Promise.all([
        apiClient.getProjects(),
        apiClient.getSkills(),
        apiClient.getExperience(),
        apiClient.getCertificates(),
        apiClient.getMessages(),
      ]);
      
      setProjects(projectsData);
      setSkills(skillsData);
      setExperiences(experienceData);
      setCertificates(certificatesData);
      setMessages(messagesData);
      
      setStats({
        projects: projectsData.length,
        skills: skillsData.length,
        experience: experienceData.length,
        certificates: certificatesData.length,
        messages: messagesData.filter(m => !m.isRead).length,
      });
      
      // Calculate quick stats
      const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const recentMsgs = messagesData.filter(m => new Date(m.createdAt) > last24Hours);
      
      setQuickStats({
        totalMessages: messagesData.length,
        unreadMessages: messagesData.filter(m => !m.isRead).length,
        recentMessages: recentMsgs.length,
        responseRate: messagesData.length > 0 ? Math.round((messagesData.filter(m => m.isRead).length / messagesData.length) * 100) : 100
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleDelete = async (type: TabType, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const authStorage = localStorage.getItem('auth-storage');
      let accessToken = null;
      
      if (authStorage) {
        try {
          const authData = JSON.parse(authStorage);
          accessToken = authData?.state?.token || null;
        } catch (e) {
          console.error('Failed to parse auth data:', e);
        }
      }

      const endpoints: Partial<Record<TabType, string>> = {
        projects: buildBackendUrl(`/api/projects/${id}`),
        skills: buildBackendUrl(`/api/skills/${id}`),
        experience: buildBackendUrl(`/api/experience/${id}`),
        certificates: buildBackendUrl(`/api/certificates/${id}`),
        messages: buildBackendUrl(`/api/messages/${id}`)
      };

      const endpoint = endpoints[type];
      if (!endpoint) {
        throw new Error('Invalid delete action');
      }

      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete error:', response.status, errorText);
        throw new Error('Failed to delete');
      }

      toast.success('Item deleted successfully!');
      
      // Update local state immediately
      if (type === 'projects') {
        setProjects(projects.filter(p => p.id !== id));
      } else if (type === 'skills') {
        setSkills(skills.filter(s => s.id !== id));
      } else if (type === 'experience') {
        setExperiences(experiences.filter(e => e.id !== id));
      } else if (type === 'certificates') {
        setCertificates(certificates.filter(c => c.id !== id));
      }
      
      // Refresh from backend
      await fetchAllData();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  const tabs: { id: TabType; label: string; icon: JSX.Element; count?: number }[] = [
    { id: 'analytics', label: 'Analytics', icon: <FaChartLine /> },
    { id: 'profile', label: 'Profile', icon: <FaUser /> },
    { id: 'messages' as TabType, label: 'Messages', icon: <FaEnvelope />, count: stats.messages },
    { id: 'projects' as TabType, label: 'Projects', icon: <FaProjectDiagram />, count: stats.projects },
    { id: 'skills' as TabType, label: 'Skills', icon: <FaCode />, count: stats.skills },
    { id: 'experience' as TabType, label: 'Experience', icon: <FaBriefcase />, count: stats.experience },
    { id: 'certificates' as TabType, label: 'Certificates', icon: <FaCertificate />, count: stats.certificates },
  ];

  return (
    <AuthGuard>
      <Toaster position="top-right" />
      <AdminDiagnostics />
      <RoleChecker />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-3 py-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white sm:gap-3 sm:text-2xl">
                  <span className="text-primary">Portfolio</span>
                  <span className="text-slate-600 dark:text-slate-400">Admin</span>
                </h1>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400 sm:mt-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Welcome back, <span className="font-semibold">{user?.name}</span>
                </p>
              </div>
              <div className="flex w-full items-center justify-end gap-2 sm:w-auto sm:gap-3">
                <Link
                  href="/admin/profile"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition-colors hover:border-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 sm:px-4"
                >
                  <FaUser className="text-xs" />
                  <span className="max-[380px]:hidden">Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-red-200 px-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/40 sm:px-4"
                >
                  <FaSignOutAlt className="text-xs" />
                  <span className="max-[380px]:hidden">Sign out</span>
                </button>
              </div>
                  className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/40"
          </div>
                  <FaSignOutAlt className="text-xs" />
        </header>

        {/* Quick Stats Bar */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <FaEnvelope className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Total Messages</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{quickStats.totalMessages}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <FaClock className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Unread</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{quickStats.unreadMessages}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <FaChartLine className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Last 24h</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{quickStats.recentMessages}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <FaCheckCircle className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Response Rate</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{quickStats.responseRate}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex gap-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className={`rounded-full px-2 py-0.5 text-xs ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'analytics' && <AnalyticsDashboard />}
                {activeTab === 'profile' && <ProfileManagement />}
                {activeTab === 'messages' && <MessagesManager messages={messages} onRefresh={fetchAllData} />}
                {activeTab === 'projects' && <ProjectsManager projects={projects} onDelete={handleDelete} onRefresh={fetchAllData} />}
                {activeTab === 'skills' && <SkillsManager skills={skills} onRefresh={fetchAllData} />}
                {activeTab === 'experience' && <ExperienceManager experiences={experiences} onRefresh={fetchAllData} />}
                {activeTab === 'certificates' && <CertificatesManager certificates={certificates} onRefresh={fetchAllData} />}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </AuthGuard>
  );
}

// Profile Management Component
function ProfileManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Profile assets</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage the photo and CV shown to portfolio visitors.</p>
        </div>
        <Link href="/admin/profile" className="text-sm font-semibold text-primary hover:text-primary/80">
          Open full settings
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        <ProfileImageCard />
        <CvCard />
      </div>
    </div>
  );
}

// Projects Manager Component
function ProjectsManager({ projects, onDelete, onRefresh }: { projects: Project[]; onDelete: (type: TabType, id: string) => void; onRefresh: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedProject(undefined);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    onRefresh();
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Projects</h2>
        <button 
          onClick={handleAdd}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          <FaPlus /> Add Project
        </button>
      </div>

      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
        project={selectedProject}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-2 text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700">
            <FaProjectDiagram className="text-6xl text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Projects Yet</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Get started by creating your first project</p>
            <button 
              onClick={handleAdd}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              <FaPlus /> Create Your First Project
            </button>
          </div>
        ) : (
          projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -2 }}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-primary/50 transition-all"
          >
            {project.imageUrl && (
              <div className="h-48 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-semibold">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => window.open(project.liveUrl, '_blank')}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
                >
                  <FaEye /> View
                </button>
                <button 
                  onClick={() => handleEdit(project)}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
                >
                  <FaEdit /> Edit
                </button>
                <button 
                  onClick={() => onDelete('projects', project.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))
        )}
      </div>
    </div>
  );
}

// Skills Manager Component
function SkillsManager({ skills, onRefresh }: { skills: Skill[]; onRefresh: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | undefined>();

  const handleEdit = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedSkill(undefined);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    onRefresh();
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    try {
      const authStorage = localStorage.getItem('auth-storage');
      let accessToken = null;
      
      if (authStorage) {
        try {
          const authData = JSON.parse(authStorage);
          accessToken = authData?.state?.token || null;
        } catch (e) {
          console.error('Failed to parse auth data:', e);
        }
      }

      await fetch(buildBackendUrl(`/api/skills/${id}`), {
        method: 'DELETE',
        headers: {
          ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
        }
      });
      toast.success('Skill deleted!');
      onRefresh();
    } catch (error) {
      toast.error('Failed to delete skill');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Skills</h2>
        <button 
          onClick={handleAdd}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          <FaPlus /> Add Skill
        </button>
      </div>

      <SkillFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
        skill={selectedSkill}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <motion.div
            key={skill.id}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:border-primary/50 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{skill.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">{skill.category}</p>
              </div>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                {skill.proficiency}%
              </span>
            </div>
            
            <div className="mb-4">
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handleEdit(skill)}
                className="flex-1 flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-2 rounded-lg font-semibold text-sm transition-colors"
              >
                <FaEdit /> Edit
              </button>
              <button 
                onClick={() => handleDelete(skill.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-2 rounded-lg font-semibold text-sm transition-colors"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Experience Manager Component
function ExperienceManager({ experiences, onRefresh }: { experiences: Experience[]; onRefresh: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | undefined>();

  const handleEdit = (experience: Experience) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedExperience(undefined);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    onRefresh();
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    
    try {
      const authStorage = localStorage.getItem('auth-storage');
      let accessToken = null;
      
      if (authStorage) {
        try {
          const authData = JSON.parse(authStorage);
          accessToken = authData?.state?.token || null;
        } catch (e) {
          console.error('Failed to parse auth data:', e);
        }
      }

      await fetch(buildBackendUrl(`/api/experience/${id}`), {
        method: 'DELETE',
        headers: {
          ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
        }
      });
      toast.success('Experience deleted!');
      onRefresh();
    } catch (error) {
      toast.error('Failed to delete experience');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Experience</h2>
        <button 
          onClick={handleAdd}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          <FaPlus /> Add Experience
        </button>
      </div>

      <ExperienceFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
        experience={selectedExperience}
      />

      <div className="space-y-4">
        {experiences.map((exp) => (
          <motion.div
            key={exp.id}
            whileHover={{ y: -2 }}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:border-primary/50 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.company}</h3>
                <p className="text-primary font-semibold mt-1">{exp.position}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  {exp.startDate.toLocaleDateString()} - {exp.endDate ? exp.endDate.toLocaleDateString() : 'Present'}
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(exp)}
                  className="p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => handleDelete(exp.id)}
                  className="p-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 mb-4">{exp.description}</p>
            
            {exp.achievements.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {exp.achievements.map((achievement, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-xs font-semibold">
                    {achievement}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Certificates Manager Component
function CertificatesManager({ certificates, onRefresh }: { certificates: Certificate[]; onRefresh: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | undefined>();
  const [viewingCertificate, setViewingCertificate] = useState<Certificate | null>(null);

  const handleEdit = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedCertificate(undefined);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    onRefresh();
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;
    
    try {
      const authStorage = localStorage.getItem('auth-storage');
      let accessToken = null;
      
      if (authStorage) {
        try {
          const authData = JSON.parse(authStorage);
          accessToken = authData?.state?.token || null;
        } catch (e) {
          console.error('Failed to parse auth data:', e);
        }
      }

      await fetch(buildBackendUrl(`/api/certificates/${id}`), {
        method: 'DELETE',
        headers: {
          ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
        }
      });
      toast.success('Certificate deleted!');
      onRefresh();
    } catch (error) {
      toast.error('Failed to delete certificate');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Certificates</h2>
        <button 
          onClick={handleAdd}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          <FaPlus /> Add Certificate
        </button>
      </div>

      <CertificateFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
        certificate={selectedCertificate}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            whileHover={{ y: -2 }}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:border-primary/50 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{cert.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{cert.issuer}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                  Issued: {cert.issueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                </p>
              </div>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                Verified
              </span>
            </div>

            {cert.credentialUrl && (
              <button
                onClick={() => setViewingCertificate(cert)}
                className="text-sm text-primary hover:text-primary/80 font-semibold mb-4 flex items-center gap-2"
              >
                <FaEye /> View Certificate
              </button>
            )}

            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => handleEdit(cert)}
                className="flex-1 flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
              >
                <FaEdit /> Edit
              </button>
              <button 
                onClick={() => handleDelete(cert.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certificate Viewer Modal */}
      {viewingCertificate && (
        <CertificateViewer
          isOpen={!!viewingCertificate}
          onClose={() => setViewingCertificate(null)}
          certificateName={viewingCertificate.name}
          certificateUrl={viewingCertificate.imageUrl || viewingCertificate.credentialUrl}
          issuer={viewingCertificate.issuer}
          issueDate={viewingCertificate.issueDate}
        />
      )}
    </div>
  );
}

// Messages Manager Component
function MessagesManager({ messages, onRefresh }: { messages: Message[]; onRefresh: () => void }) {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleMarkAsRead = async (id: string) => {
    try {
      await apiClient.markMessageAsRead(id);
      toast.success('Message marked as read');
      onRefresh();
    } catch (error) {
      toast.error('Failed to mark message as read');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const authStorage = localStorage.getItem('auth-storage');
      let accessToken = null;
      
      if (authStorage) {
        try {
          const authData = JSON.parse(authStorage);
          accessToken = authData?.state?.token || null;
        } catch (e) {
          console.error('Failed to parse auth data:', e);
        }
      }

      await fetch(buildBackendUrl(`/api/messages/${id}`), {
        method: 'DELETE',
        headers: {
          ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
        }
      });
      toast.success('Message deleted!');
      onRefresh();
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const unreadMessages = messages.filter(m => !m.isRead);
  const readMessages = messages.filter(m => m.isRead);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Contact Messages</h2>
        <div className="flex items-center gap-2">
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
            {unreadMessages.length} Unread
          </span>
        </div>
      </div>

      {/* Unread Messages */}
      {unreadMessages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <FaEnvelope className="text-primary" />
            Unread Messages
          </h3>
          {unreadMessages.map((message) => (
            <motion.div
              key={message.id}
              whileHover={{ y: -2 }}
              className="bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20 p-6 hover:border-primary/50 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{message.name}</h3>
                    <span className="px-2 py-1 bg-primary text-white rounded-full text-xs font-semibold">NEW</span>
                  </div>
                  <a href={`mailto:${message.email}`} className="text-sm text-primary hover:underline font-medium">
                    {message.email}
                  </a>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {message.createdAt.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMarkAsRead(message.id)}
                    className="p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                    title="Mark as read"
                  >
                    <FaEnvelopeOpen />
                  </button>
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="p-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{message.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Read Messages */}
      {readMessages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-2">
            <FaEnvelopeOpen className="text-slate-400" />
            Read Messages
          </h3>
          {readMessages.map((message) => (
            <motion.div
              key={message.id}
              whileHover={{ y: -2 }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-all opacity-75"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{message.name}</h3>
                  <a href={`mailto:${message.email}`} className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary hover:underline">
                    {message.email}
                  </a>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {message.createdAt.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(message.id)}
                  className="p-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{message.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {messages.length === 0 && (
        <div className="text-center py-20">
          <FaEnvelope className="text-6xl text-slate-300 dark:text-slate-700 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 text-lg">No messages yet</p>
          <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">Messages from your contact form will appear here</p>
        </div>
      )}
    </div>
  );
}
