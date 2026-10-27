/**
 * Admin Dashboard Page
 * Main dashboard for portfolio management
 * Requirements: 6.1
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth';
import { apiClient } from '@/lib/api-client';
import { PORTFOLIO_DATA_UPDATED_EVENT, unifiedApiClient } from '@/lib/unified-api-client';
import { Project, Skill, Experience, Certificate, Message } from '@/types';
import { FaProjectDiagram, FaCode, FaBriefcase, FaCertificate, FaPlus, FaEdit, FaTrash, FaEye, FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, MoreHorizontal, Search, Wrench } from 'lucide-react';
import ProjectFormModal from '@/components/ProjectFormModal';
import SkillFormModal from '@/components/SkillFormModal';
import CertificateFormModal from '@/components/CertificateFormModal';
import ExperienceFormModal from '@/components/ExperienceFormModal';
import CertificateViewer from '@/components/CertificateViewer';
import ProfileImageCard from '@/components/ProfileImageCard';
import ProfileDetailsCard from '@/components/ProfileDetailsCard';
import CvCard from '@/components/CvCard';
import { toast } from 'react-hot-toast';
import { buildBackendUrl } from '@/lib/backend-config';
import AdminOverview from '@/components/admin/AdminOverview';
import DataToolbar from '@/components/admin/DataToolbar';

type TabType = 'analytics' | 'profile' | 'projects' | 'skills' | 'experience' | 'certificates' | 'messages';

export function AdminSectionPage({ section }: { section: TabType }) {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quickStats, setQuickStats] = useState({
    totalMessages: 0,
    unreadMessages: 0,
    recentMessages: 0,
    responseRate: 100
  });

  const fetchContentData = async () => {
    const [projectsData, skillsData, experienceData, certificatesData] = await Promise.all([
      unifiedApiClient.getProjects(),
      unifiedApiClient.getSkills(),
      unifiedApiClient.getExperience(),
      unifiedApiClient.getCertificates(),
    ]);

    setProjects(projectsData);
    setSkills(skillsData);
    setExperiences(experienceData);
    setCertificates(certificatesData);
  };

  const updateMessageStats = (messagesData: Message[]) => {
    const unreadMessages = messagesData.filter((message) => !message.isRead).length;
    const recentMessages = messagesData.filter(
      (message) => new Date(message.createdAt).getTime() > Date.now() - 24 * 60 * 60 * 1000
    ).length;

    setMessages(messagesData);
    setQuickStats({
      totalMessages: messagesData.length,
      unreadMessages,
      recentMessages,
      responseRate: messagesData.length
        ? Math.round(((messagesData.length - unreadMessages) / messagesData.length) * 100)
        : 100,
    });
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    const refreshContent = () => {
      void fetchContentData().catch((error) => {
        console.error('Failed to refresh portfolio content:', error);
      });
    };

    window.addEventListener(PORTFOLIO_DATA_UPDATED_EVENT, refreshContent);
    return () => window.removeEventListener(PORTFOLIO_DATA_UPDATED_EVENT, refreshContent);
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
      
      await fetchContentData();
      void apiClient.getMessages().then(updateMessageStats);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (type: TabType, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const authStorage = localStorage.getItem('auth-storage');
      let token = null;
      
      if (authStorage) {
        try {
          const authData = JSON.parse(authStorage);
          token = authData?.state?.token || null;
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
          ...(token && { 'Authorization': 'Bearer ' + token }),
        },
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

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <div className="grid animate-pulse grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" role="status" aria-label="Loading owner data">
          {Array.from({ length: 4 }, (_, index) => <div key={index} className="h-28 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />)}
        </div>
      ) : (
        <motion.div key={section} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
          {section === 'analytics' && <AdminOverview userName={user?.name || 'Owner'} projects={projects} skills={skills} experiences={experiences} certificates={certificates} messages={messages} quickStats={quickStats} />}
          {section === 'profile' && <ProfileManagement />}
          {section === 'messages' && <MessagesManager messages={messages} onRefresh={fetchAllData} />}
          {section === 'projects' && <ProjectsManager projects={projects} onDelete={handleDelete} onRefresh={fetchAllData} />}
          {section === 'skills' && <SkillsManager skills={skills} onRefresh={fetchAllData} />}
          {section === 'experience' && <ExperienceManager experiences={experiences} onRefresh={fetchAllData} />}
          {section === 'certificates' && <CertificatesManager certificates={certificates} onRefresh={fetchAllData} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AdminDashboard() {
  return <AdminSectionPage section="analytics" />;
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

      <ProfileDetailsCard />
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
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [technologyFilter, setTechnologyFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [actionProjectId, setActionProjectId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get('q') || '');
    if (params.get('create') === '1') setIsModalOpen(true);
  }, []);

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

  const filteredProjects = projects
    .filter((project) => {
      const matchesQuery = `${project.title} ${project.description} ${project.technologies.join(' ')}`.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === 'all' || (statusFilter === 'published' ? project.isPublished : !project.isPublished);
      const matchesTechnology = technologyFilter === 'all' || project.technologies.includes(technologyFilter);
      return matchesQuery && matchesStatus && matchesTechnology;
    })
    .sort((a, b) => sortBy === 'name' ? a.title.localeCompare(b.title) : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div><h2 className="text-xl font-semibold text-slate-950 dark:text-white">Projects</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{projects.length} projects · {projects.filter((project) => project.isPublished).length} published</p></div>
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

      <DataToolbar
        search={query}
        onSearchChange={setQuery}
        placeholder="Search projects or technologies"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        filters={<div className="flex flex-wrap gap-2"><select aria-label="Filter projects by status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"><option value="all">All status</option><option value="published">Published</option><option value="draft">Draft</option></select><select aria-label="Filter projects by technology" value={technologyFilter} onChange={(event) => setTechnologyFilter(event.target.value)} className="h-10 max-w-36 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"><option value="all">All tech</option>{[...new Set(projects.flatMap((project) => project.technologies))].sort().map((technology) => <option key={technology} value={technology}>{technology}</option>)}</select><select aria-label="Sort projects" value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"><option value="recent">Recently updated</option><option value="name">Name A–Z</option></select></div>}
      />

      {!filteredProjects.length ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900"><FaProjectDiagram className="mx-auto mb-4 text-3xl text-slate-300 dark:text-slate-600" /><h3 className="text-base font-semibold text-slate-900 dark:text-white">{projects.length ? 'No matching projects' : 'No projects yet'}</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{projects.length ? 'Try another search or status filter.' : 'Add a project to start building your portfolio.'}</p>{!projects.length && <button onClick={handleAdd} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-700"><FaPlus /> Add project</button>}</div>
      ) : viewMode === 'table' ? (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"><table className="w-full min-w-[720px] text-left text-sm"><thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"><tr><th className="px-4 py-3">Project</th><th className="px-4 py-3">Technology</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Updated</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800">{filteredProjects.map((project) => <tr key={project.id}><td className="px-4 py-3"><div className="flex items-center gap-3"><div className="h-11 w-16 shrink-0 overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800">{project.imageUrl && <img src={project.imageUrl} alt="" className="h-full w-full object-cover" />}</div><span className="font-medium text-slate-900 dark:text-white">{project.title}</span></div></td><td className="px-4 py-3 text-slate-500">{project.technologies.slice(0, 3).join(', ')}{project.technologies.length > 3 ? ` +${project.technologies.length - 3}` : ''}</td><td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${project.isPublished ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>{project.isPublished ? 'Published' : 'Draft'}</span></td><td className="px-4 py-3 text-xs text-slate-500">{new Date(project.updatedAt).toLocaleDateString()}</td><td className="px-4 py-3"><div className="flex justify-end gap-2"><button onClick={() => handleEdit(project)} className="rounded-md px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10">Edit</button><button onClick={() => onDelete('projects', project.id)} aria-label={`Delete ${project.title}`} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30"><FaTrash /></button></div></td></tr>)}</tbody></table></div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredProjects.map((project) => <article key={project.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"><div className="relative aspect-[16/9] bg-slate-100 dark:bg-slate-800">{project.imageUrl ? <img src={project.imageUrl} alt={`${project.title} preview`} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-xs text-slate-400">No preview</div>}</div><div className="p-4"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="truncate text-sm font-semibold text-slate-950 dark:text-white">{project.title}</h3><p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{project.description}</p></div><span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-medium ${project.isPublished ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>{project.isPublished ? 'Published' : 'Draft'}</span></div><div className="mt-3 flex flex-wrap gap-1.5">{project.technologies.slice(0, 3).map((tech) => <span key={tech} className="rounded-md bg-slate-100 px-2 py-1 text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">{tech}</span>)}{project.technologies.length > 3 && <span className="px-1 py-1 text-[10px] text-slate-500">+{project.technologies.length - 3} more</span>}</div><div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800"><button onClick={() => handleEdit(project)} className="text-xs font-semibold text-primary hover:underline">Edit project</button><div className="relative flex items-center gap-1"><a href={project.liveUrl || '#'} target="_blank" rel="noreferrer" aria-label={`View ${project.title}`} className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><ExternalLink size={15} /></a><button type="button" onClick={() => setActionProjectId(actionProjectId === project.id ? null : project.id)} aria-label={`More actions for ${project.title}`} aria-expanded={actionProjectId === project.id} className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><MoreHorizontal size={16} /></button>{actionProjectId === project.id && <button type="button" onClick={() => { setActionProjectId(null); onDelete('projects', project.id); }} className="absolute right-0 top-9 z-10 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-700 shadow-lg dark:border-red-900 dark:bg-slate-900 dark:text-red-300">Delete project</button>}</div></div></div></article>)}</div>
      )}
    </div>
  );
}

// Skills Manager Component
function SkillsManager({ skills, onRefresh }: { skills: Skill[]; onRefresh: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | undefined>();
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [actionSkillId, setActionSkillId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get('q') || '');
    if (params.get('create') === '1') setIsModalOpen(true);
  }, []);

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

  const categories = [...new Set(skills.map((skill) => skill.category))].sort();
  const filteredSkills = skills.filter((skill) => {
    const matchesQuery = `${skill.name} ${skill.category}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (categoryFilter === 'all' || skill.category === categoryFilter);
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    try {
      const authStorage = localStorage.getItem('auth-storage');
      let token = null;
      
      if (authStorage) {
        try {
          const authData = JSON.parse(authStorage);
          token = authData?.state?.token || null;
        } catch (e) {
          console.error('Failed to parse auth data:', e);
        }
      }

      await fetch(buildBackendUrl(`/api/skills/${id}`), {
        method: 'DELETE',
        headers: {
          ...(token && { 'Authorization': 'Bearer ' + token })
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
        <div><h2 className="text-xl font-semibold text-slate-950 dark:text-white">Skills</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{skills.length} skills across {categories.length} categories</p></div>
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

      <DataToolbar search={query} onSearchChange={setQuery} placeholder="Search skills" viewMode={viewMode} onViewModeChange={setViewMode} filters={<select aria-label="Filter skills by category" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"><option value="all">All categories</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select>} />

      {!filteredSkills.length ? <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900"><Wrench className="mx-auto mb-3 text-slate-300 dark:text-slate-600" size={28} /><h3 className="text-sm font-semibold text-slate-900 dark:text-white">{skills.length ? 'No matching skills' : 'No skills yet'}</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{skills.length ? 'Try another search or category.' : 'Add skills to show your areas of expertise.'}</p>{!skills.length && <button onClick={handleAdd} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white"><FaPlus /> Add skill</button>}</div> : viewMode === 'table' ? (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"><table className="w-full min-w-[640px] text-left text-sm"><thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-950"><tr><th className="px-4 py-3">Skill</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Proficiency</th><th className="px-4 py-3">Experience</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800">{filteredSkills.map((skill) => <tr key={skill.id}><td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{skill.name}</td><td className="px-4 py-3 capitalize text-slate-500">{skill.category}</td><td className="px-4 py-3"><div className="flex items-center gap-2"><div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-primary" style={{ width: `${skill.proficiency}%` }} /></div><span className="text-xs tabular-nums text-slate-500">{skill.proficiency}%</span></div></td><td className="px-4 py-3 text-slate-500">{skill.yearsOfExperience} yrs</td><td className="px-4 py-3 text-right"><button onClick={() => handleEdit(skill)} className="rounded-md px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10">Edit</button><button onClick={() => handleDelete(skill.id)} aria-label={`Delete ${skill.name}`} className="ml-1 rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30"><FaTrash /></button></td></tr>)}</tbody></table></div>
      ) : <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{filteredSkills.map((skill) => <article key={skill.id} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><div className="flex items-start justify-between gap-3"><div><h3 className="text-sm font-semibold text-slate-950 dark:text-white">{skill.name}</h3><p className="mt-1 text-xs capitalize text-slate-500 dark:text-slate-400">{skill.category}</p></div><span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold tabular-nums text-primary">{skill.proficiency}%</span></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-primary" style={{ width: `${skill.proficiency}%` }} /></div><div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800"><span className="text-xs text-slate-500">{skill.yearsOfExperience} years experience</span><div className="relative"><button onClick={() => setActionSkillId(actionSkillId === skill.id ? null : skill.id)} aria-label={`Actions for ${skill.name}`} aria-expanded={actionSkillId === skill.id} className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><MoreHorizontal size={16} /></button>{actionSkillId === skill.id && <div className="absolute right-0 top-9 z-10 flex min-w-32 flex-col rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900"><button onClick={() => { setActionSkillId(null); handleEdit(skill); }} className="rounded-md px-3 py-2 text-left text-xs font-semibold text-primary hover:bg-primary/10">Edit skill</button><button onClick={() => { setActionSkillId(null); handleDelete(skill.id); }} className="rounded-md px-3 py-2 text-left text-xs font-semibold text-red-700 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/30">Delete</button></div>}</div></div></article>)}</div>}
    </div>
  );
}

// Experience Manager Component
function ExperienceManager({ experiences, onRefresh }: { experiences: Experience[]; onRefresh: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | undefined>();
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const filteredExperiences = experiences.filter((item) => `${item.company} ${item.position} ${item.description}`.toLowerCase().includes(query.toLowerCase()));

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
      let token = null;
      
      if (authStorage) {
        try {
          const authData = JSON.parse(authStorage);
          token = authData?.state?.token || null;
        } catch (e) {
          console.error('Failed to parse auth data:', e);
        }
      }

      await fetch(buildBackendUrl(`/api/experience/${id}`), {
        method: 'DELETE',
        headers: {
          ...(token && { 'Authorization': 'Bearer ' + token })
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

      <DataToolbar search={query} onSearchChange={setQuery} placeholder="Search roles, companies, or descriptions" viewMode={viewMode} onViewModeChange={setViewMode} />

      {viewMode === 'table' ? <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"><table className="w-full min-w-[700px] text-left text-sm"><thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-950"><tr><th className="px-4 py-3">Company</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Period</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800">{filteredExperiences.map((exp) => <tr key={exp.id}><td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{exp.company}</td><td className="px-4 py-3 text-slate-600 dark:text-slate-300">{exp.position}</td><td className="px-4 py-3 text-slate-500">{new Date(exp.startDate).toLocaleDateString()} – {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}</td><td className="px-4 py-3 text-right"><button onClick={() => handleEdit(exp)} className="rounded-md px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10">Edit</button><button onClick={() => handleDelete(exp.id)} className="ml-1 rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30" aria-label={`Delete ${exp.position} at ${exp.company}`}><FaTrash /></button></td></tr>)}</tbody></table></div> : <div className="space-y-4">{filteredExperiences.map((exp) => (
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
        ))}</div>}
    </div>
  );
}

// Certificates Manager Component
function CertificatesManager({ certificates, onRefresh }: { certificates: Certificate[]; onRefresh: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | undefined>();
  const [viewingCertificate, setViewingCertificate] = useState<Certificate | null>(null);
  const [query, setQuery] = useState('');
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const filteredCertificates = certificates.filter((certificate) => `${certificate.name} ${certificate.issuer}`.toLowerCase().includes(query.toLowerCase()) && (visibilityFilter === 'all' || (visibilityFilter === 'visible' ? certificate.isVisible : !certificate.isVisible)));

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('create') === '1') setIsModalOpen(true);
  }, []);

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
      let token = null;
      
      if (authStorage) {
        try {
          const authData = JSON.parse(authStorage);
          token = authData?.state?.token || null;
        } catch (e) {
          console.error('Failed to parse auth data:', e);
        }
      }

      await fetch(buildBackendUrl(`/api/certificates/${id}`), {
        method: 'DELETE',
        headers: {
          ...(token && { 'Authorization': 'Bearer ' + token })
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

      <DataToolbar search={query} onSearchChange={setQuery} placeholder="Search certificates or issuers" viewMode={viewMode} onViewModeChange={setViewMode} filters={<select aria-label="Filter certificates by visibility" value={visibilityFilter} onChange={(event) => setVisibilityFilter(event.target.value)} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"><option value="all">All visibility</option><option value="visible">Visible</option><option value="hidden">Hidden</option></select>} />

      {viewMode === 'table' ? <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"><table className="w-full min-w-[700px] text-left text-sm"><thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-950"><tr><th className="px-4 py-3">Certificate</th><th className="px-4 py-3">Issuer</th><th className="px-4 py-3">Issued</th><th className="px-4 py-3">Visibility</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800">{filteredCertificates.map((cert) => <tr key={cert.id}><td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{cert.name}</td><td className="px-4 py-3 text-slate-600 dark:text-slate-300">{cert.issuer}</td><td className="px-4 py-3 text-slate-500">{new Date(cert.issueDate).toLocaleDateString()}</td><td className="px-4 py-3 text-slate-500">{cert.isVisible ? 'Visible' : 'Hidden'}</td><td className="px-4 py-3 text-right"><button onClick={() => handleEdit(cert)} className="rounded-md px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10">Edit</button><button onClick={() => handleDelete(cert.id)} aria-label={`Delete ${cert.name}`} className="ml-1 rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30"><FaTrash /></button></td></tr>)}</tbody></table></div> : <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredCertificates.map((cert) => (
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
        ))}</div>}

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
  const [query, setQuery] = useState('');

  useEffect(() => {
    setQuery(new URLSearchParams(window.location.search).get('q') || '');
  }, []);

  useEffect(() => {
    if (!selectedMessage && messages.length) setSelectedMessage(messages[0]);
    if (selectedMessage && !messages.some((message) => message.id === selectedMessage.id)) {
      setSelectedMessage(messages[0] || null);
    }
  }, [messages, selectedMessage]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await apiClient.markMessageAsRead(id);
      setSelectedMessage((current) => current?.id === id ? { ...current, isRead: true } : current);
      toast.success('Message marked as read');
      onRefresh();
    } catch (error) {
      toast.error('Failed to mark message as read');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      await apiClient.deleteMessage(id);
      toast.success('Message deleted!');
      setSelectedMessage(null);
      onRefresh();
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const filteredMessages = messages.filter((message) => `${message.name} ${message.email} ${message.message}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-xl font-semibold text-slate-950 dark:text-white">Messages</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{messages.filter((message) => !message.isRead).length} unread · {messages.length} total</p></div></header>
      {messages.length ? <div className="grid min-h-[560px] overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.4fr)]">
        <section className="border-b border-slate-200 dark:border-slate-800 lg:border-b-0 lg:border-r" aria-label="Inbox message list">
          <label className="flex h-12 items-center gap-2 border-b border-slate-100 px-4 text-slate-400 dark:border-slate-800"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search inbox" className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white" /></label>
          <div className="max-h-[560px] overflow-y-auto">
            {filteredMessages.map((message) => <button key={message.id} type="button" onClick={() => { setSelectedMessage(message); if (!message.isRead) void handleMarkAsRead(message.id); }} className={`block w-full border-b border-slate-100 px-4 py-4 text-left transition-colors dark:border-slate-800 ${selectedMessage?.id === message.id ? 'bg-primary/5 dark:bg-primary/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}><span className="flex items-center gap-2"><span className={`h-2 w-2 shrink-0 rounded-full ${message.isRead ? 'bg-transparent' : 'bg-primary'}`} /><span className={`min-w-0 flex-1 truncate text-sm ${message.isRead ? 'font-medium' : 'font-semibold'} text-slate-900 dark:text-white`}>{message.name}</span><time className="shrink-0 text-[10px] text-slate-400">{new Date(message.createdAt).toLocaleDateString()}</time></span><span className="mt-1 block truncate pl-4 text-xs text-slate-500">{message.email}</span><span className="mt-2 block line-clamp-2 pl-4 text-xs leading-5 text-slate-500 dark:text-slate-400">{message.message}</span></button>)}
            {!filteredMessages.length && <p className="px-5 py-10 text-center text-sm text-slate-500">No matching messages.</p>}
          </div>
        </section>
        <section className="min-w-0 p-5 sm:p-7" aria-label="Selected message">
          {selectedMessage ? <div className="flex h-full flex-col"><div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800"><div className="min-w-0"><h3 className="text-lg font-semibold text-slate-950 dark:text-white">{selectedMessage.name}</h3><a href={`mailto:${selectedMessage.email}`} className="mt-1 block truncate text-sm text-primary hover:underline">{selectedMessage.email}</a><time className="mt-2 block text-xs text-slate-400">{new Date(selectedMessage.createdAt).toLocaleString()}</time></div><div className="flex gap-2"><a href={`mailto:${selectedMessage.email}`} className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-primary px-3 text-xs font-semibold text-white hover:bg-primary-700"><FaEnvelope /> Reply</a><button type="button" onClick={() => handleDelete(selectedMessage.id)} aria-label="Delete message" className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:border-slate-700 dark:hover:bg-red-950/30"><FaTrash /></button></div></div><p className="flex-1 whitespace-pre-wrap py-6 text-sm leading-7 text-slate-700 dark:text-slate-300">{selectedMessage.message}</p><div className="border-t border-slate-100 pt-4 text-xs text-slate-400 dark:border-slate-800">{selectedMessage.isRead ? 'Read' : 'Unread'}</div></div> : <div className="flex h-full items-center justify-center text-sm text-slate-500">Select a message to read it.</div>}
        </section>
      </div> : <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900"><FaEnvelope className="mx-auto mb-3 text-3xl text-slate-300 dark:text-slate-600" /><h3 className="text-sm font-semibold text-slate-900 dark:text-white">Your inbox is empty</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Messages from your contact form will appear here.</p></div>}
    </div>
  );
}
