"use client";

import { useState } from "react";
import "./app.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setLoading(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 3000);
  };

  return (
    <main className="conversion-optimized">
      {/* Hero Section - High Converting */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-headline">
            Start Investing Today, Build Wealth Tomorrow
          </h1>
          <p className="hero-subheadline">
            Join thousands of investors making smarter financial decisions. 
            Get started with as little as $1.
          </p>
          
          {/* Primary CTA - Email Capture */}
          <form onSubmit={handleSubmit} className="cta-form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="email-input"
                disabled={loading}
              />
              <button 
                type="submit" 
                className="cta-button primary"
                disabled={loading}
              >
                {loading ? "Getting Started..." : "Get Started Free"}
              </button>
            </div>
          </form>

          {/* Success Message */}
          {submitted && (
            <div className="success-message">
              ✓ Check your email to get started!
            </div>
          )}

          <p className="form-note">No credit card required • Free forever</p>
        </div>

        {/* Visual Element */}
        <div className="hero-visual">
          <div className="chart-placeholder">
            <svg viewBox="0 0 200 120" className="chart-svg">
              <polyline points="10,100 40,70 70,80 100,40 130,60 160,20 190,30" />
            </svg>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="social-proof">
        <h2>Trusted by Investors Worldwide</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Active Investors</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">$2.5B+</div>
            <div className="stat-label">Assets Managed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4.9★</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose ToInvested?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Smart Analytics</h3>
            <p>Track your portfolio performance with real-time insights and detailed analytics.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Bank-Level Security</h3>
            <p>Your investments are protected with enterprise-grade encryption and security.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Low Fees</h3>
            <p>Invest with minimal fees. More of your money works for you.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile First</h3>
            <p>Manage your investments on the go with our mobile app.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Learn & Grow</h3>
            <p>Access educational resources and expert insights to improve your strategy.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Global Markets</h3>
            <p>Invest in stocks, ETFs, and crypto from markets around the world.</p>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-indicators">
        <h2>Backed by Industry Leaders</h2>
        <div className="logos-grid">
          <div className="logo-placeholder">TechCrunch</div>
          <div className="logo-placeholder">Forbes</div>
          <div className="logo-placeholder">Bloomberg</div>
          <div className="logo-placeholder">CNBC</div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="secondary-cta">
        <h2>Ready to Start Your Investment Journey?</h2>
        <p>Join thousands of investors who are building their wealth with ToInvested.</p>
        <button className="cta-button secondary">
          Open Your Free Account
        </button>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>How much do I need to start?</h3>
            <p>You can start investing with as little as $1. There's no minimum account balance.</p>
          </div>
          <div className="faq-item">
            <h3>Is my money safe?</h3>
            <p>Yes. We use bank-level security and your investments are insured up to $500,000.</p>
          </div>
          <div className="faq-item">
            <h3>What are the fees?</h3>
            <p>We charge 0% commission on trades. Some investments may have small management fees.</p>
          </div>
          <div className="faq-item">
            <h3>Can I withdraw anytime?</h3>
            <p>Yes, you can withdraw your money anytime. Most withdrawals process within 1-2 business days.</p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="footer-cta">
        <h3>Don't Miss Out on Your Financial Future</h3>
        <p>Start investing today with ToInvested</p>
        <button className="cta-button primary">Get Started Now</button>
      </section>
    </main>
  );
}
