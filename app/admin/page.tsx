/**
 * Admin Dashboard Page
 * Main dashboard for portfolio management
 * Requirements: 6.1
 */

'use client';

import React, { useState, useEffect } from 'react';
import { AuthGuard } from '@/components/auth';
import { useAuth } from '@/components/auth';
import { apiClient } from '@/lib/api-client';
import { Project, Skill, Experience, Certificate, Message } from '@/types';
import { FaProjectDiagram, FaCode, FaBriefcase, FaCertificate, FaPlus, FaEdit, FaTrash, FaEye, FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectFormModal from '@/components/ProjectFormModal';
import SkillFormModal from '@/components/SkillFormModal';
import CertificateFormModal from '@/components/CertificateFormModal';
import ExperienceFormModal from '@/components/ExperienceFormModal';
import toast, { Toaster } from 'react-hot-toast';

type TabType = 'projects' | 'skills' | 'experience' | 'certificates';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ projects: 0, skills: 0, experience: 0, certificates: 0 });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      const [projectsData, skillsData, experienceData, certificatesData] = await Promise.all([
        apiClient.getProjects(),
        apiClient.getSkills(),
        apiClient.getExperience(),
        apiClient.getCertificates(),
      ]);
      
      setProjects(projectsData);
      setSkills(skillsData);
      setExperiences(experienceData);
      setCertificates(certificatesData);
      
      setStats({
        projects: projectsData.length,
        skills: skillsData.length,
        experience: experienceData.length,
        certificates: certificatesData.length,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
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

      const endpoints = {
        projects: `https://portifolio-backend-ptck.onrender.com/api/projects/${id}`,
        skills: `https://portifolio-backend-ptck.onrender.com/api/skills/${id}`,
        experience: `https://portifolio-backend-ptck.onrender.com/api/experience/${id}`,
        certificates: `https://portifolio-backend-ptck.onrender.com/api/certificates/${id}`
      };

      const response = await fetch(endpoints[type], {
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

  const tabs = [
    { id: 'projects' as TabType, label: 'Projects', icon: <FaProjectDiagram />, count: stats.projects },
    { id: 'skills' as TabType, label: 'Skills', icon: <FaCode />, count: stats.skills },
    { id: 'experience' as TabType, label: 'Experience', icon: <FaBriefcase />, count: stats.experience },
    { id: 'certificates' as TabType, label: 'Certificates', icon: <FaCertificate />, count: stats.certificates },
  ];

  return (
    <AuthGuard>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Portfolio <span className="text-primary">Admin</span>
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Welcome back, {user?.name}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-lg shadow-red-600/20"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tabs.map((tab) => (
              <motion.div
                key={tab.id}
                whileHover={{ y: -4 }}
                className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-primary shadow-lg shadow-primary/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-primary/50'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      {tab.label}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                      {tab.count}
                    </p>
                  </div>
                  <div className={`text-4xl ${activeTab === tab.id ? 'text-primary' : 'text-slate-400'}`}>
                    {tab.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
            <div className="flex gap-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {tab.count}
                  </span>
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Projects</h2>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-primary/30 transition-all"
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
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -4 }}
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
        ))}
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

      await fetch(`https://portifolio-backend-ptck.onrender.com/api/skills/${id}`, {
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Skills</h2>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-primary/30 transition-all"
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
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:border-primary/50 transition-all"
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

      await fetch(`https://portifolio-backend-ptck.onrender.com/api/experience/${id}`, {
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Experience</h2>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-primary/30 transition-all"
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
            whileHover={{ x: 4 }}
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

      await fetch(`https://portifolio-backend-ptck.onrender.com/api/certificates/${id}`, {
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Certificates</h2>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-primary/30 transition-all"
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
            whileHover={{ y: -4 }}
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
              <a 
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-primary/80 font-semibold mb-4 block"
              >
                View Credential →
              </a>
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
    </div>
  );
}
