import React, { useState } from 'react';
import studentApi from '../api/studentApi';

export default function DeploymentComparison() {
  const [pingStatus, setPingStatus] = useState(null);
  const [pinging, setPinging] = useState(false);

  const testPing = async () => {
    setPinging(true);
    setPingStatus(null);
    const startTime = performance.now();
    try {
      const data = await studentApi.checkHealth();
      const duration = Math.round(performance.now() - startTime);
      setPingStatus({
        success: true,
        latency: duration,
        message: `Connected successfully (${duration}ms). Service: ${data.service || 'Online'}`,
        data
      });
    } catch (err) {
      setPingStatus({
        success: false,
        message: err.message || 'Connection failed to backend API.'
      });
    } finally {
      setPinging(false);
    }
  };

  const isLocalEnvironment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  return (
    <div className="comparison-container">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Local Execution vs Cloud Deployment</h1>
        <p className="page-subtitle">
          Comparing on-premise workstation architecture against modern multi-cloud serverless & container hosting
        </p>
      </div>

      {/* Cloud Architecture Diagram */}
      <div className="arch-card">
        <div className="arch-header">
          <h2 className="arch-title">Cloud Deployment Architecture</h2>
          <p className="arch-subtitle">
            User requests flow from Edge CDN to containerized Spring Boot and hosted MySQL
          </p>
        </div>

        <div className="arch-flow">
          {/* Node 1: User */}
          <div className="arch-node">
            <span className="arch-node-badge badge-user">Client</span>
            <div className="arch-node-title">End User</div>
            <div className="arch-node-desc">Web Browser / Mobile Client</div>
          </div>

          <div className="arch-arrow">&rarr;</div>

          {/* Node 2: Vercel */}
          <div className="arch-node">
            <span className="arch-node-badge badge-vercel">Frontend Host</span>
            <div className="arch-node-title">Vercel</div>
            <div className="arch-node-desc">React 18 + Vite (Global Edge CDN)</div>
          </div>

          <div className="arch-arrow">&rarr;</div>

          {/* Node 3: Render */}
          <div className="arch-node">
            <span className="arch-node-badge badge-render">Backend Host</span>
            <div className="arch-node-title">Render</div>
            <div className="arch-node-desc">Java 21 Spring Boot (Docker Web Service)</div>
          </div>

          <div className="arch-arrow">&rarr;</div>

          {/* Node 4: MySQL */}
          <div className="arch-node">
            <span className="arch-node-badge badge-mysql">Database</span>
            <div className="arch-node-title">MySQL 8.0</div>
            <div className="arch-node-desc">Hosted Cloud Relational Database</div>
          </div>
        </div>
      </div>

      {/* Live Environment Diagnostic Card */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Live Runtime Diagnostics</h3>
          <span className="nav-status-badge">
            <span className={`status-dot ${isLocalEnvironment ? 'offline' : 'online'}`} />
            {isLocalEnvironment ? 'Local Development Host' : 'Cloud Production Host'}
          </span>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem 1rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Frontend Origin</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', marginTop: '0.25rem', color: 'var(--text-primary)' }}>
                {window.location.origin}
              </div>
            </div>

            <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem 1rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Configured Backend API</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', marginTop: '0.25rem', color: 'var(--text-primary)' }}>
                {studentApi.getBaseUrl()}
              </div>
            </div>

            <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem 1rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Current Protocol</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', marginTop: '0.25rem', color: 'var(--text-primary)' }}>
                {window.location.protocol.replace(':', '').toUpperCase()} {window.location.protocol === 'https:' ? '(Secure SSL/TLS)' : '(Unencrypted Local)'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-sm" onClick={testPing} disabled={pinging}>
              {pinging ? 'Pinging Backend...' : 'Ping REST API Health'}
            </button>

            {pingStatus && (
              <span style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: pingStatus.success ? 'var(--success-text)' : 'var(--danger-text)'
              }}>
                {pingStatus.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Comprehensive Architectural Comparison</h2>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <div className="table-container" style={{ border: 'none' }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="col-feature">Dimension</th>
                  <th className="col-local">Local Execution</th>
                  <th className="col-cloud">Cloud Deployment (Vercel + Render)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feature-name">Application Hosting</td>
                  <td className="cell-local">
                    Runs entirely on local developer machine using Node.js Vite dev server (port 5173) and local Spring Boot (port 8080).
                  </td>
                  <td className="cell-cloud">
                    Decoupled cloud architecture: Frontend static assets distributed worldwide via Vercel Edge CDN; Backend containerized on Render Linux VM.
                  </td>
                </tr>

                <tr>
                  <td className="feature-name">Accessibility</td>
                  <td className="cell-local">
                    Restricted strictly to <code>localhost</code> (127.0.0.1) or local subnet devices. Inaccessible to outside public users.
                  </td>
                  <td className="cell-cloud">
                    Globally accessible 24/7 over public HTTPS URLs (e.g. <code>https://your-app.vercel.app</code>) across any phone, tablet, or browser.
                  </td>
                </tr>

                <tr>
                  <td className="feature-name">Server Environment</td>
                  <td className="cell-local">
                    Tied directly to developer's operating system (Windows, macOS, or Linux), local JDK 21 installation, and local path variables.
                  </td>
                  <td className="cell-cloud">
                    Standardized containerized Linux runtime (Docker Alpine / OpenJDK 21) guaranteeing reproducible builds with zero environment drift.
                  </td>
                </tr>

                <tr>
                  <td className="feature-name">Database Connectivity</td>
                  <td className="cell-local">
                    Connects to local MySQL Server on <code>127.0.0.1:3306</code> with local credentials. If MySQL service stops, database is down.
                  </td>
                  <td className="cell-cloud">
                    Connects via encrypted SSL/TLS connection string to managed cloud MySQL (Aiven, PlanetScale, Railway, or Render PostgreSQL/MySQL).
                  </td>
                </tr>

                <tr>
                  <td className="feature-name">Configuration</td>
                  <td className="cell-local">
                    Managed via local <code>application.properties</code> and <code>.env</code> files stored in developer workspace.
                  </td>
                  <td className="cell-cloud">
                    Secrets & parameters injected dynamically via cloud dashboards (Render Environment Variables & Vercel Project Settings) without touching source code.
                  </td>
                </tr>

                <tr>
                  <td className="feature-name">Availability & Uptime</td>
                  <td className="cell-local">
                    Zero availability when developer closes their laptop, powers off, or encounters network interruption.
                  </td>
                  <td className="cell-cloud">
                    High availability: Vercel CDN guarantees 99.99% uptime with automated DNS failover; Render restarts failed containers automatically.
                  </td>
                </tr>

                <tr>
                  <td className="feature-name">Scalability</td>
                  <td className="cell-local">
                    Bound by physical hardware specifications (RAM, CPU cores, disk I/O of developer computer). Cannot scale horizontally.
                  </td>
                  <td className="cell-cloud">
                    Elastic horizontal and vertical scaling: Frontend auto-scales infinitely to millions of requests; Backend scales with one click on Render.
                  </td>
                </tr>

                <tr>
                  <td className="feature-name">Maintenance & CI/CD</td>
                  <td className="cell-local">
                    Manual restarts required on every code change; no rollback mechanism or automated SSL certificate renewal.
                  </td>
                  <td className="cell-cloud">
                    Continuous Integration & Deployment (CI/CD): Automatic builds on <code>git push</code>, instant preview environments, automated zero-downtime rollbacks, and free auto-renewing Let's Encrypt SSL.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Explaining Platform Choices */}
      <div className="reasons-grid">
        {/* Why Vercel */}
        <div className="reason-card">
          <div className="reason-card-header">
            <div style={{
              width: '38px',
              height: '38px',
              background: '#000000',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 19.7778h20L12 2z"/>
              </svg>
            </div>
            <h3>Why Vercel for Frontend?</h3>
          </div>
          <ul>
            <li><strong>Global Edge Network:</strong> Caches compiled React static assets across hundreds of edge locations, delivering single-digit millisecond latency worldwide.</li>
            <li><strong>Optimized for Modern SPA & Vite:</strong> Native support for Vite builds with instant single-page application routing rewrites.</li>
            <li><strong>Automatic CI/CD Pipeline:</strong> Triggers instantaneous preview and production deployments upon every Git commit or pull request.</li>
            <li><strong>Free Automated SSL/TLS:</strong> Enforces bank-grade HTTPS encryption with zero certificate management overhead.</li>
            <li><strong>Environment Isolation:</strong> Allows easy configuration of production API endpoints (<code>VITE_API_BASE_URL</code>) per branch.</li>
          </ul>
        </div>

        {/* Why Render */}
        <div className="reason-card">
          <div className="reason-card-header">
            <div style={{
              width: '38px',
              height: '38px',
              background: '#46e3b7',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#022c22'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                <line x1="6" y1="6" x2="6.01" y2="6"/>
                <line x1="6" y1="18" x2="6.01" y2="18"/>
              </svg>
            </div>
            <h3>Why Render for Backend?</h3>
          </div>
          <ul>
            <li><strong>Full Docker & JVM Container Support:</strong> Perfectly runs containerized Spring Boot with Java 21 OpenJDK, overcoming serverless execution limits.</li>
            <li><strong>Automated Health Checks:</strong> Continuously polls our <code>/api/health</code> endpoint to ensure uninterrupted service availability.</li>
            <li><strong>Secure Secrets Management:</strong> Encrypts sensitive database credentials (<code>SPRING_DATASOURCE_URL</code>, username, password) away from public Git repositories.</li>
            <li><strong>Seamless Port Binding:</strong> Dynamically provisions and routes HTTP traffic via the <code>PORT</code> environment variable.</li>
            <li><strong>Generous Free Tier:</strong> Provides high quality cloud hosting for educational and production prototypes with automatic TLS certificates.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
