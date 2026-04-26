/**
 * Conversion Tracking & Analytics Utility
 * Implements proven conversion optimization patterns
 */

export interface ConversionEvent {
  type: 'email_capture' | 'cta_click' | 'form_submit' | 'page_view' | 'scroll_depth' | 'time_on_page';
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface ConversionMetrics {
  totalVisitors: number;
  emailCaptures: number;
  conversionRate: number;
  averageTimeOnPage: number;
  scrollDepth: number;
}

class ConversionTracker {
  private events: ConversionEvent[] = [];
  private sessionStart: number = Date.now();
  private maxScrollDepth: number = 0;
  private pageStartTime: number = Date.now();

  constructor() {
    this.initializeTracking();
  }

  /**
   * Initialize conversion tracking on page load
   */
  private initializeTracking(): void {
    if (typeof window === 'undefined') return;

    // Track page view
    this.trackEvent('page_view');

    // Track scroll depth
    window.addEventListener('scroll', () => this.trackScrollDepth());

    // Track time on page
    window.addEventListener('beforeunload', () => this.trackTimeOnPage());

    // Track visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackTimeOnPage();
      }
    });
  }

  /**
   * Track a conversion event
   */
  public trackEvent(type: ConversionEvent['type'], metadata?: Record<string, any>): void {
    const event: ConversionEvent = {
      type,
      timestamp: Date.now(),
      metadata,
    };

    this.events.push(event);

    // Send to analytics service
    this.sendToAnalytics(event);

    // Log for debugging
    console.log('[Conversion Tracking]', type, metadata);
  }

  /**
   * Track email capture (primary conversion)
   */
  public trackEmailCapture(email: string): void {
    this.trackEvent('email_capture', {
      email: this.hashEmail(email),
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track CTA button clicks
   */
  public trackCTAClick(buttonText: string, location: string): void {
    this.trackEvent('cta_click', {
      buttonText,
      location,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track form submissions
   */
  public trackFormSubmit(formName: string, success: boolean): void {
    this.trackEvent('form_submit', {
      formName,
      success,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track scroll depth (engagement metric)
   */
  private trackScrollDepth(): void {
    if (typeof window === 'undefined') return;

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const scrollDepth = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;

    if (scrollDepth > this.maxScrollDepth) {
      this.maxScrollDepth = scrollDepth;

      // Track milestones
      if (this.maxScrollDepth > 25 && this.maxScrollDepth < 26) {
        this.trackEvent('scroll_depth', { depth: 25 });
      } else if (this.maxScrollDepth > 50 && this.maxScrollDepth < 51) {
        this.trackEvent('scroll_depth', { depth: 50 });
      } else if (this.maxScrollDepth > 75 && this.maxScrollDepth < 76) {
        this.trackEvent('scroll_depth', { depth: 75 });
      } else if (this.maxScrollDepth > 90) {
        this.trackEvent('scroll_depth', { depth: 90 });
      }
    }
  }

  /**
   * Track time on page
   */
  private trackTimeOnPage(): void {
    const timeOnPage = (Date.now() - this.pageStartTime) / 1000; // in seconds
    this.trackEvent('time_on_page', { seconds: Math.round(timeOnPage) });
  }

  /**
   * Get conversion metrics
   */
  public getMetrics(): ConversionMetrics {
    const emailCaptures = this.events.filter(e => e.type === 'email_capture').length;
    const totalEvents = this.events.length;

    return {
      totalVisitors: 1, // Would be aggregated server-side
      emailCaptures,
      conversionRate: totalEvents > 0 ? (emailCaptures / totalEvents) * 100 : 0,
      averageTimeOnPage: this.getAverageTimeOnPage(),
      scrollDepth: this.maxScrollDepth,
    };
  }

  /**
   * Get average time on page from events
   */
  private getAverageTimeOnPage(): number {
    const timeEvents = this.events.filter(e => e.type === 'time_on_page');
    if (timeEvents.length === 0) return 0;

    const totalTime = timeEvents.reduce((sum, e) => sum + (e.metadata?.seconds || 0), 0);
    return Math.round(totalTime / timeEvents.length);
  }

  /**
   * Hash email for privacy
   */
  private hashEmail(email: string): string {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      const char = email.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  }

  /**
   * Send event to analytics service
   */
  private sendToAnalytics(event: ConversionEvent): void {
    // This would send to your analytics backend
    // Example: POST to /api/analytics
    if (typeof window !== 'undefined' && navigator.sendBeacon) {
      const data = JSON.stringify(event);
      navigator.sendBeacon('/api/analytics', data);
    }
  }

  /**
   * Get all events (for debugging)
   */
  public getEvents(): ConversionEvent[] {
    return [...this.events];
  }

  /**
   * Clear events
   */
  public clearEvents(): void {
    this.events = [];
  }
}

// Export singleton instance
export const conversionTracker = new ConversionTracker();

/**
 * Proven Conversion Optimization Patterns
 */
export const conversionPatterns = {
  /**
   * Pattern 1: Value Proposition First
   * Lead with clear, compelling value proposition
   */
  valueProposition: {
    headline: 'Start Investing Today, Build Wealth Tomorrow',
    subheadline: 'Join thousands of investors making smarter financial decisions.',
    cta: 'Get Started Free',
  },

  /**
   * Pattern 2: Urgency & Scarcity
   * Create sense of urgency without being aggressive
   */
  urgency: {
    badge: 'Limited Time Offer',
    message: 'Join 50K+ investors already building their wealth',
    countdown: true,
  },

  /**
   * Pattern 3: Social Proof
   * Show trust indicators and user testimonials
   */
  socialProof: {
    userCount: '50K+',
    assetsManaged: '$2.5B+',
    rating: '4.9★',
    testimonials: true,
    mediaLogos: ['TechCrunch', 'Forbes', 'Bloomberg', 'CNBC'],
  },

  /**
   * Pattern 4: Low Friction Signup
   * Minimize form fields and barriers to entry
   */
  lowFriction: {
    requiredFields: ['email'],
    noPasswordRequired: true,
    socialSignup: true,
    guestCheckout: false,
  },

  /**
   * Pattern 5: Clear Value Stack
   * Show specific benefits and features
   */
  valueStack: [
    '0% Commission on Trades',
    'Start with as Little as $1',
    'Bank-Level Security',
    'Real-Time Analytics',
    'Mobile App Included',
    'Expert Insights',
  ],

  /**
   * Pattern 6: Trust Indicators
   * Display security, privacy, and compliance badges
   */
  trustIndicators: {
    security: 'Bank-Level Encryption',
    insurance: 'FDIC Insured up to $500K',
    compliance: 'SEC Regulated',
    privacy: 'Your data is never sold',
  },

  /**
   * Pattern 7: Multiple CTAs
   * Place CTAs at strategic locations
   */
  ctaPlacement: [
    'Hero Section (Primary)',
    'After Social Proof',
    'After Features',
    'FAQ Section',
    'Footer',
  ],

  /**
   * Pattern 8: Objection Handling
   * Address common concerns proactively
   */
  objectionHandling: {
    'How much do I need?': 'Start with as little as $1',
    'Is it safe?': 'Bank-level security and FDIC insurance',
    'What are the fees?': '0% commission on trades',
    'Can I withdraw anytime?': 'Yes, withdraw anytime in 1-2 business days',
  },

  /**
   * Pattern 9: Micro-conversions
   * Track engagement before main conversion
   */
  microConversions: [
    'Email capture',
    'CTA click',
    'Scroll to features',
    'FAQ interaction',
    'Form focus',
  ],

  /**
   * Pattern 10: Personalization
   * Customize experience based on user behavior
   */
  personalization: {
    dynamic_headlines: true,
    behavior_based_cta: true,
    exit_intent_popup: true,
    time_based_offers: true,
  },
};

/**
 * A/B Testing Variants
 */
export const abTestVariants = {
  headline: {
    variant_a: 'Start Investing Today, Build Wealth Tomorrow',
    variant_b: 'Your Path to Financial Freedom Starts Here',
    variant_c: 'Invest Smarter, Grow Faster',
  },
  cta_text: {
    variant_a: 'Get Started Free',
    variant_b: 'Start Investing Now',
    variant_c: 'Open Free Account',
  },
  cta_color: {
    variant_a: '#00d4aa', // Teal
    variant_b: '#0066ff', // Blue
    variant_c: '#ff6b6b', // Red
  },
};

export default conversionTracker;
