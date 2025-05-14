import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { addToWaitlist } from '../services/firebase/waitlist';
import './WaitlistPage.css';

const WaitlistPage: React.FC = () => {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract referral code from URL if present
  const queryParams = new URLSearchParams(location.search);
  const referralCode = queryParams.get('ref');
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interest, setInterest] = useState<'viewer' | 'creator' | 'both'>('viewer');
  const [submitted, setSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState({
    days: 30,
    hours: 12,
    minutes: 34,
    seconds: 56
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    
    // Check if user has already submitted to waitlist
    const hasSubmitted = localStorage.getItem('waitlist_submitted') === 'true';
    const savedEmail = localStorage.getItem('waitlist_email');
    
    if (hasSubmitted && savedEmail) {
      setEmail(savedEmail);
      setSubmitted(true);
    }
  }, [isAuthenticated, navigate]);

  // Validate form
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(email) && name.trim().length > 0);
  }, [email, name]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Add to Firebase waitlist
      await addToWaitlist({
        name,
        email,
        interest,
        referredBy: referralCode || undefined
      });
      
      // Store in local storage for persistence
      localStorage.setItem('waitlist_submitted', 'true');
      localStorage.setItem('waitlist_email', email);
      
      setSubmitted(true);
      setIsSubmitting(false);
    } catch (err: any) {
      console.error('Error submitting to waitlist:', err);
      setError(err.message || 'Something went wrong. Please try again later.');
      setIsSubmitting(false);
    }
  };

  // Handle share links
  const handleShare = (platform: 'twitter' | 'facebook' | 'email') => {
    const shareUrl = `${window.location.origin}?ref=${encodeURIComponent(email.split('@')[0])}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const shareText = "I'm on the waitlist for Lificosm - the premium human-first streaming platform. Join me!";
    
    let shareLink = '';
    
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'email':
        shareLink = `mailto:?subject=${encodeURIComponent('Join me on Lificosm')}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank');
    }
  };

  return (
    <div className="lf-waitlist-page">
      {/* Floating particles background */}
      <div className="lf-particles-container">
        <div className="lf-particle p1"></div>
        <div className="lf-particle p2"></div>
        <div className="lf-particle p3"></div>
        <div className="lf-particle p4"></div>
        <div className="lf-particle p5"></div>
        <div className="lf-particle p6"></div>
      </div>

      {/* Video background */}
      <div className="lf-video-bg">
        <div className="lf-video-overlay"></div>
        <video autoPlay loop muted playsInline className="lf-bg-video">
          <source src="/videos/premium-stream-bg.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <img src="/images/premium-stream-bg.jpg" alt="Premium streaming background" />
        </video>
      </div>

      {/* Main content container */}
      <div className="lf-waitlist-container">
        <div className="lf-waitlist-header">
          <div className="lf-logo-container">
            <div className="lf-logo-symbol"></div>
            <div className="lf-logo-text">Lificosm</div>
          </div>
          <div className="lf-nav-links">
            <Link to="/about" className="lf-nav-link">About</Link>
            <Link to="/features" className="lf-nav-link">Features</Link>
            <Link to="/login" className="lf-nav-link-button">Sign In</Link>
          </div>
        </div>

        <div className="lf-waitlist-content">
          <div className="lf-waitlist-left">
            <h1 className="lf-headline">
              Experience <span className="lf-text-gradient">Premium</span> Human-First Streaming
            </h1>
            <p className="lf-subheadline">
              Join Lificosm's exclusive waitlist for early access to the future of verified human connection through high-quality streaming experiences.
            </p>

            {/* Trust indicators */}
            <div className="lf-trust-indicators">
              <div className="lf-trust-item">
                <span className="lf-trust-icon biometric"></span>
                <span className="lf-trust-text">Verified Humans</span>
              </div>
              <div className="lf-trust-item">
                <span className="lf-trust-icon security"></span>
                <span className="lf-trust-text">Secure Platform</span>
              </div>
              <div className="lf-trust-item">
                <span className="lf-trust-icon privacy"></span>
                <span className="lf-trust-text">Privacy Focused</span>
              </div>
            </div>

            {/* Launch countdown */}
            <div className="lf-countdown-container">
              <h3 className="lf-countdown-title">Launching In</h3>
              <div className="lf-countdown">
                <div className="lf-countdown-item">
                  <div className="lf-countdown-number">{countdown.days}</div>
                  <div className="lf-countdown-label">Days</div>
                </div>
                <div className="lf-countdown-item">
                  <div className="lf-countdown-number">{countdown.hours}</div>
                  <div className="lf-countdown-label">Hours</div>
                </div>
                <div className="lf-countdown-item">
                  <div className="lf-countdown-number">{countdown.minutes}</div>
                  <div className="lf-countdown-label">Minutes</div>
                </div>
                <div className="lf-countdown-item">
                  <div className="lf-countdown-number">{countdown.seconds}</div>
                  <div className="lf-countdown-label">Seconds</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lf-waitlist-right">
            {!submitted ? (
              <div className="lf-waitlist-form-container">
                <div className="lf-form-header">
                  <h2>Join Exclusive Waitlist</h2>
                  <p>Limited spots available for early access</p>
                </div>

                <form className="lf-waitlist-form" onSubmit={handleSubmit}>
                  <div className="lf-form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="lf-form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="lf-form-group">
                    <label>I'm interested in becoming a:</label>
                    <div className="lf-radio-group">
                      <label className={`lf-radio-label ${interest === 'viewer' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="interest"
                          value="viewer"
                          checked={interest === 'viewer'}
                          onChange={() => setInterest('viewer')}
                        />
                        <span className="lf-radio-text">Viewer</span>
                      </label>
                      <label className={`lf-radio-label ${interest === 'creator' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="interest"
                          value="creator"
                          checked={interest === 'creator'}
                          onChange={() => setInterest('creator')}
                        />
                        <span className="lf-radio-text">Creator</span>
                      </label>
                      <label className={`lf-radio-label ${interest === 'both' ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="interest"
                          value="both"
                          checked={interest === 'both'}
                          onChange={() => setInterest('both')}
                        />
                        <span className="lf-radio-text">Both</span>
                      </label>
                    </div>
                  </div>

                  {error && <div className="lf-form-error">{error}</div>}

                  <button 
                    type="submit" 
                    className={`lf-submit-button ${!isValid ? 'disabled' : ''} ${isSubmitting ? 'submitting' : ''}`}
                    disabled={!isValid || isSubmitting}
                  >
                    {isSubmitting ? 
                      <span className="lf-button-loader"></span> : 
                      'Join Waitlist'
                    }
                  </button>

                  <div className="lf-form-footer">
                    By joining, you agree to our 
                    <Link to="/terms"> Terms of Service</Link> and 
                    <Link to="/privacy"> Privacy Policy</Link>
                  </div>
                </form>
              </div>
            ) : (
              <div className="lf-waitlist-success">
                <div className="lf-success-icon"></div>
                <h2>You're on the List!</h2>
                <p>Thank you for joining our waitlist, {name || 'valued user'}! We'll notify you at <strong>{email}</strong> when Lificosm is ready.</p>
                <div className="lf-referral-box">
                  <p>Want to move up the waitlist? Share with friends:</p>
                  <div className="lf-share-links">
                    <button 
                      className="lf-share-button twitter"
                      onClick={() => handleShare('twitter')}
                    >
                      Twitter
                    </button>
                    <button 
                      className="lf-share-button facebook"
                      onClick={() => handleShare('facebook')}
                    >
                      Facebook
                    </button>
                    <button 
                      className="lf-share-button email"
                      onClick={() => handleShare('email')}
                    >
                      Email
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Social proof section */}
        <div className="lf-social-proof">
          <div className="lf-social-proof-header">
            <h2>Trusted By Early Adopters</h2>
          </div>
          <div className="lf-testimonials">
            <div className="lf-testimonial-card">
              <div className="lf-testimonial-content">
                "Lificosm's commitment to human verification sets a new standard for streaming platforms. Can't wait for the launch!"
              </div>
              <div className="lf-testimonial-author">
                <div className="lf-author-avatar av1"></div>
                <div className="lf-author-info">
                  <div className="lf-author-name">Sarah Johnson</div>
                  <div className="lf-author-title">Digital Creator</div>
                </div>
              </div>
            </div>
            <div className="lf-testimonial-card">
              <div className="lf-testimonial-content">
                "The preview I saw was impressive. The UI is intuitive and the streaming quality is exceptional. This will change everything."
              </div>
              <div className="lf-testimonial-author">
                <div className="lf-author-avatar av2"></div>
                <div className="lf-author-info">
                  <div className="lf-author-name">Marcus Chen</div>
                  <div className="lf-author-title">Tech Influencer</div>
                </div>
              </div>
            </div>
            <div className="lf-testimonial-card">
              <div className="lf-testimonial-content">
                "The biometric verification feature alone makes this worth the wait. Finally, a platform that values authenticity."
              </div>
              <div className="lf-testimonial-author">
                <div className="lf-author-avatar av3"></div>
                <div className="lf-author-info">
                  <div className="lf-author-name">Elena Rivera</div>
                  <div className="lf-author-title">Early Investor</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="lf-waitlist-footer">
          <div className="lf-footer-content">
            <div className="lf-footer-logo">
              <div className="lf-logo-symbol small"></div>
              <div className="lf-logo-text small">Lificosm</div>
            </div>
            <div className="lf-footer-links">
              <Link to="/about">About</Link>
              <Link to="/features">Features</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="lf-footer-social">
              <a href="#" className="lf-social-icon twitter" aria-label="Twitter"></a>
              <a href="#" className="lf-social-icon instagram" aria-label="Instagram"></a>
              <a href="#" className="lf-social-icon linkedin" aria-label="LinkedIn"></a>
              <a href="#" className="lf-social-icon youtube" aria-label="YouTube"></a>
            </div>
          </div>
          <div className="lf-footer-copyright">
            © {new Date().getFullYear()} Lificosm. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default WaitlistPage;