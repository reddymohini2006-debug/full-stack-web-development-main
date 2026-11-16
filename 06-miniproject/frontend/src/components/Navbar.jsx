import React, { useState, useEffect } from 'react';
import studentApi from '../api/studentApi';

export default function Navbar({ activePage, setActivePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backendStatus, setBackendStatus] = useState({ online: false, checking: true, host: '' });

  const checkConnection = async () => {
    setBackendStatus((prev) => ({ ...prev, checking: true }));
    try {
      await studentApi.checkHealth();
      setBackendStatus({ online: true, checking: false, host: studentApi.getBaseUrl() });
    } catch {
      setBackendStatus({ online: false, checking: false, host: studentApi.getBaseUrl() });
    }
  };

  useEffect(() => {
    checkConnection();
    // Re-check health every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleNav = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Brand */}
        <div className="brand-section" onClick={() => handleNav('dashboard')}>
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div className="brand-text">
            <h1>StudentMS</h1>
            <p>Management & Cloud Deployment</p>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li>
            <button
              className={`nav-btn ${activePage === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleNav('dashboard')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              Dashboard
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${activePage === 'students' ? 'active' : ''}`}
              onClick={() => handleNav('students')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              View Students
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${activePage === 'add-student' ? 'active' : ''}`}
              onClick={() => handleNav('add-student')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Student
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${activePage === 'deployment' ? 'active' : ''}`}
              onClick={() => handleNav('deployment')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
              </svg>
              Local vs Cloud
            </button>
          </li>

          {/* Backend Status indicator */}
          <li>
            <div
              className="nav-status-badge"
              title={`API URL: ${backendStatus.host}`}
              onClick={checkConnection}
              style={{ cursor: 'pointer' }}
            >
              <span className={`status-dot ${backendStatus.online ? 'online' : 'offline'}`} />
              <span>{backendStatus.checking ? 'Connecting...' : backendStatus.online ? 'Backend Connected' : 'Backend Offline'}</span>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
