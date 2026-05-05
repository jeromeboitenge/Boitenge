"use client";

import { FormEvent, useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { ProjectData, projectsData } from '../data/projectsData'; 
import { ArrowRight, ArrowLeft } from 'lucide-react'; 

// Define the number of projects to show by default
const DEFAULT_PROJECTS_COUNT = 3;

const emptyDraft = {
  title: '',
  description: '',
  image: '/your-project-image.jpg',
  tags: 'React, Node.js, PostgreSQL',
  highlights: 'Saved 30% development time,Designed a modular component system',
  demoLink: 'https://your-demo-link.com',
};

export default function ProjectsPage() {
  const [showAll, setShowAll] = useState(false);
  const [draft, setDraft] = useState(emptyDraft);
  const [previewProjects, setPreviewProjects] = useState<ProjectData[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  useEffect(() => {
    const storedAuth = typeof window !== 'undefined' ? localStorage.getItem('projectEditorAuth') : null;
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const getStoredUser = () => {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem('projectEditorUser');
    if (!raw) return null;

    try {
      return JSON.parse(raw) as { email: string; password: string };
    } catch {
      return null;
    }
  };

  const saveUser = (email: string, password: string) => {
    localStorage.setItem('projectEditorUser', JSON.stringify({ email, password }));
  };

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setAuthError('');
    setAuthSuccess('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setAuthError('Please enter both email and password.');
      return;
    }

    const storedUser = getStoredUser();
    if (!storedUser) {
      setAuthError('No account found yet. Please sign up first.');
      return;
    }

    if (loginEmail.trim() !== storedUser.email || loginPassword !== storedUser.password) {
      setAuthError('Incorrect email or password.');
      return;
    }

    setIsAuthenticated(true);
    localStorage.setItem('projectEditorAuth', 'true');
    setAuthSuccess('Logged in successfully. You can now make changes.');
    setShowLoginForm(false);
    setLoginPassword('');
  };

  const handleSignupSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setAuthError('');
    setAuthSuccess('');

    if (!signupEmail.trim() || !signupPassword.trim() || !signupConfirmPassword.trim()) {
      setAuthError('Fill in all signup fields.');
      return;
    }

    if (!signupEmail.includes('@') || !signupEmail.includes('.')) {
      setAuthError('Enter a valid email address.');
      return;
    }

    if (signupPassword.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }

    saveUser(signupEmail.trim(), signupPassword);
    setIsAuthenticated(true);
    localStorage.setItem('projectEditorAuth', 'true');
    setAuthSuccess('Account created and logged in successfully.');
    setShowSignupForm(false);
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirmPassword('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('projectEditorAuth');
    setAuthSuccess('Logged out successfully.');
  };

  const allProjects = [...projectsData, ...previewProjects];
  const projectsToShow = showAll
    ? allProjects
    : [...projectsData.slice(0, DEFAULT_PROJECTS_COUNT), ...previewProjects];

  const isMoreAvailable = projectsData.length > DEFAULT_PROJECTS_COUNT && !showAll;
  const isViewLessAvailable = showAll;

  return (
    // ⬅️ FIX 1: Apply dark mode colors to the main container background
    <div className="bg-gradient-to-b from-white via-primary/5 to-transparent dark:from-dark dark:via-dark/95 dark:to-dark" id="projects">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        
        {/* === Header Section (Ensure Text is Dark Mode Ready) === */}
        <div className="mx-auto max-w-3xl text-center space-y-6 animate-fade-up">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-primary/70">
            Featured Work
          </p>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl"> {/* ⬅️ FIX 2: Dark text for dark mode */}
            My Projects
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 sm:text-xl"> {/* ⬅️ FIX 3: Dark text for dark mode */}
            A collection of the software I’ve designed, developed, and deployed.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projectsToShow.map((project, index) => (
            <ProjectCard  key={project.id || index} {...project} /> 
          ))}
        </div>

        {/* === Conditional Buttons (Styling Updated for Dark Mode) === */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => {
              if (isAuthenticated) {
                handleLogout();
              } else {
                setShowLoginForm((current) => !current);
                setShowSignupForm(false);
              }
            }}
            className="px-8 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
          >
            {isAuthenticated
              ? 'Logout from project editor'
              : showLoginForm
              ? 'Cancel login'
              : 'Login to edit projects'}
          </button>

          {!isAuthenticated && (
            <button
              type="button"
              onClick={() => {
                setShowSignupForm((current) => !current);
                setShowLoginForm(false);
              }}
              className="px-8 py-3 rounded-full border border-primary bg-white text-primary font-semibold hover:bg-primary/10 transition-all shadow-md"
            >
              {showSignupForm ? 'Cancel signup' : 'Sign up to edit'}
            </button>
          )}

          {isAuthenticated && isMoreAvailable && (
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 flex items-center gap-2"
            >
              View All Projects <ArrowRight size={18} />
            </button>
          )}

          {isAuthenticated && isViewLessAvailable && (
            <button
              onClick={() => {
                setShowAll(false);
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:border-primary hover:text-primary transition-colors flex items-center gap-2 shadow-md"
            >
              <ArrowLeft size={18} /> View Less
            </button>
          )}
        </div>

        {authSuccess && (
          <p className="mt-4 text-center text-sm text-emerald-500">{authSuccess}</p>
        )}
        {authError && !showSignupForm && !showLoginForm && (
          <p className="mt-4 text-center text-sm text-red-500">{authError}</p>
        )}

        {!isAuthenticated && showLoginForm && (
          <div className="mx-auto mt-6 max-w-xl rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">Secure access</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Login to manage your projects</h3>
            {authError && <p className="mt-3 text-sm text-red-500">{authError}</p>}
            <form onSubmit={handleLoginSubmit} className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                Email address
                <input
                  value={loginEmail}
                  onChange={(event) => setLoginEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                Password
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                  placeholder="Enter password"
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary/90"
              >
                Login
              </button>
            </form>
          </div>
        )}

        {!isAuthenticated && showSignupForm && (
          <div className="mx-auto mt-6 max-w-xl rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">Create access</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Sign up to edit portfolio content</h3>
            {authError && <p className="mt-3 text-sm text-red-500">{authError}</p>}
            <form onSubmit={handleSignupSubmit} className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                Email address
                <input
                  value={signupEmail}
                  onChange={(event) => setSignupEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                Password
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(event) => setSignupPassword(event.target.value)}
                  placeholder="Enter password"
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                Confirm password
                <input
                  type="password"
                  value={signupConfirmPassword}
                  onChange={(event) => setSignupConfirmPassword(event.target.value)}
                  placeholder="Repeat password"
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary/90"
              >
                Sign Up
              </button>
            </form>
          </div>
        )}

        <div className="mt-14 grid gap-10 xl:grid-cols-[1.4fr_1fr]">
          <div className="relative rounded-[2rem] border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-950">
            {!isAuthenticated && (
              <div className="pointer-events-auto absolute inset-0 rounded-[2rem] bg-slate-950/75 backdrop-blur-sm" />
            )}
            <div className={`${!isAuthenticated ? 'opacity-60' : ''}`}>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">
                Add a Project
              </p>
              <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                Submit project details instantly.
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Fill the form below to preview a new project in this portfolio. To make it permanent, copy the generated project object into <code className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-100">app/data/projectsData.ts</code> and upload the image to <code className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-100">public/</code>.
              </p>

              {!isAuthenticated && (
                <p className="mt-4 rounded-3xl bg-primary/5 px-4 py-3 text-sm text-primary dark:bg-primary/10 dark:text-white">
                  You must login before editing or adding projects.
                </p>
              )}

            <form
              onSubmit={(event) => {
                event.preventDefault();
                const nextId = allProjects.length + 1;
                const newProject: ProjectData = {
                  id: nextId,
                  title: draft.title.trim(),
                  description: draft.description.trim(),
                  image: draft.image.trim() || '/your-project-image.jpg',
                  tags: draft.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
                  highlights: draft.highlights.split(',').map((item) => item.trim()).filter(Boolean),
                  demoLink: draft.demoLink.trim(),
                };
                setPreviewProjects((current) => [...current, newProject]);
                setDraft(emptyDraft);
                setShowAll(true);
              }}
              className="mt-8 grid gap-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                  Project title
                  <input
                    required
                    disabled={!isAuthenticated}
                    value={draft.title}
                    onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                    placeholder="E-Commerce Analytics Dashboard"
                    className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                </label>
                <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                  Demo link
                  <input
                    required
                    disabled={!isAuthenticated}
                    value={draft.demoLink}
                    onChange={(event) => setDraft({ ...draft, demoLink: event.target.value })}
                    placeholder="https://your-demo-link.com"
                    className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                Description
                <textarea
                  required
                  disabled={!isAuthenticated}
                  value={draft.description}
                  onChange={(event) => setDraft({ ...draft, description: event.target.value })}
                  placeholder="A clean dashboard that helps stores analyze revenue, inventory, and user behavior in real time."
                  rows={4}
                  className="rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                  Tags (comma separated)
                  <input
                    disabled={!isAuthenticated}
                    value={draft.tags}
                    onChange={(event) => setDraft({ ...draft, tags: event.target.value })}
                    placeholder="React, TypeScript, Firebase"
                    className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                </label>
                <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                  Image path
                  <input
                    required
                    disabled={!isAuthenticated}
                    value={draft.image}
                    onChange={(event) => setDraft({ ...draft, image: event.target.value })}
                    placeholder="/your-project-image.jpg"
                    className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm text-slate-700 dark:text-slate-200">
                Highlights (comma separated)
                <input
                  disabled={!isAuthenticated}
                  value={draft.highlights}
                  onChange={(event) => setDraft({ ...draft, highlights: event.target.value })}
                  placeholder="Saved 30% dev time,Improved mobile performance"
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </label>

              <button
                type="submit"
                disabled={!isAuthenticated}
                className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Preview this project
              </button>
            </form>
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-slate-900 p-6 text-slate-100 shadow-xl shadow-slate-900/30">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Guidance</p>
            <h3 className="mt-3 text-xl font-semibold text-white">How to add it permanently</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <li>1. Upload your project image to <code className="rounded-full bg-slate-800 px-2 py-1 text-xs">public/</code>.</li>
              <li>2. Copy the previewed project object into <code className="rounded-full bg-slate-800 px-2 py-1 text-xs">app/data/projectsData.ts</code>.</li>
              <li>3. Give it a unique <code className="rounded-full bg-slate-800 px-2 py-1 text-xs">id</code> and a valid <code className="rounded-full bg-slate-800 px-2 py-1 text-xs">demoLink</code>.</li>
              <li>4. Save the file and refresh the portfolio page to show the project permanently.</li>
            </ul>
            <p className="mt-5 rounded-3xl bg-slate-950/80 px-4 py-4 text-sm text-slate-400">
              Tip: If you want to use a live demo link, ensure the address begins with <span className="font-semibold text-white">https://</span> so the preview button works correctly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}