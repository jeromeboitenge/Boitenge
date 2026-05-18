'use client';

interface AnalyticsEvent {
  type: 'page_view' | 'project_view' | 'contact_form' | 'download_cv' | 'external_link';
  page?: string;
  projectId?: string;
  projectName?: string;
  referrer?: string;
  userAgent?: string;
  timestamp: number;
  sessionId: string;
  location?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
}

class AnalyticsTracker {
  private sessionId: string;
  private apiUrl: string;

  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://portifolio-backend-ptck.onrender.com';
  }

  private getOrCreateSessionId(): string {
    if (typeof window === 'undefined') return '';
    
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  private async getLocationData() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        return {
          country: data.country_name,
          city: data.city,
          latitude: data.latitude,
          longitude: data.longitude,
        };
      }
    } catch {
      // Silently fail - location is optional
    }
    return undefined;
  }

  private async sendEvent(event: Omit<AnalyticsEvent, 'timestamp' | 'sessionId' | 'location'>) {
    try {
      const location = await this.getLocationData();
      
      const fullEvent: AnalyticsEvent = {
        ...event,
        timestamp: Date.now(),
        sessionId: this.sessionId,
        location,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      };

      // Store locally
      const events = this.getStoredEvents();
      events.push(fullEvent);
      localStorage.setItem('analytics_events', JSON.stringify(events.slice(-1000))); // Keep last 1000 events

      // Send to backend (optional - if you want to store on server)
      // await fetch(`${this.apiUrl}/api/analytics`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(fullEvent),
      // });
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  private getStoredEvents(): AnalyticsEvent[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('analytics_events');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  // Public tracking methods
  trackPageView(page: string) {
    this.sendEvent({ type: 'page_view', page });
  }

  trackProjectView(projectId: string, projectName: string) {
    this.sendEvent({ type: 'project_view', projectId, projectName });
  }

  trackContactForm() {
    this.sendEvent({ type: 'contact_form' });
  }

  trackCVDownload() {
    this.sendEvent({ type: 'download_cv' });
  }

  trackExternalLink(url: string) {
    this.sendEvent({ type: 'external_link', page: url });
  }

  // Get analytics data
  getAnalytics() {
    const events = this.getStoredEvents();
    
    const pageViews = events.filter(e => e.type === 'page_view');
    const projectViews = events.filter(e => e.type === 'project_view');
    const contactForms = events.filter(e => e.type === 'contact_form');
    
    // Unique visitors (by session)
    const uniqueSessions = new Set(events.map(e => e.sessionId)).size;
    
    // Popular pages
    const pageViewCounts: Record<string, number> = {};
    pageViews.forEach(e => {
      if (e.page) {
        pageViewCounts[e.page] = (pageViewCounts[e.page] || 0) + 1;
      }
    });
    
    // Popular projects
    const projectViewCounts: Record<string, { name: string; count: number }> = {};
    projectViews.forEach(e => {
      if (e.projectId && e.projectName) {
        if (!projectViewCounts[e.projectId]) {
          projectViewCounts[e.projectId] = { name: e.projectName, count: 0 };
        }
        projectViewCounts[e.projectId].count++;
      }
    });
    
    // Visitor locations
    const locationCounts: Record<string, number> = {};
    events.forEach(e => {
      if (e.location?.country) {
        locationCounts[e.location.country] = (locationCounts[e.location.country] || 0) + 1;
      }
    });
    
    // Time series data (last 7 days)
    const last7Days = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentEvents = events.filter(e => e.timestamp > last7Days);
    
    const dailyViews: Record<string, number> = {};
    recentEvents.forEach(e => {
      const date = new Date(e.timestamp).toLocaleDateString();
      dailyViews[date] = (dailyViews[date] || 0) + 1;
    });
    
    return {
      totalViews: events.length,
      uniqueVisitors: uniqueSessions,
      pageViews: Object.entries(pageViewCounts)
        .map(([page, count]) => ({ page, count }))
        .sort((a, b) => b.count - a.count),
      popularProjects: Object.entries(projectViewCounts)
        .map(([id, data]) => ({ id, name: data.name, views: data.count }))
        .sort((a, b) => b.views - a.views),
      contactFormSubmissions: contactForms.length,
      visitorLocations: Object.entries(locationCounts)
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count),
      dailyViews: Object.entries(dailyViews)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
      recentEvents: recentEvents.slice(-50).reverse(),
    };
  }
}

export const analytics = new AnalyticsTracker();
