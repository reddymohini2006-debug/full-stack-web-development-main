import React, { useState, useEffect } from 'react';
import studentApi from '../api/studentApi';
import { DEPARTMENT_COLORS, YEAR_COLORS } from '../utils/constants';

export default function Dashboard({ setActivePage, onSelectStudent }) {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalDepartments: 0,
    studentsByDepartment: {},
    studentsByYear: {}
  });
  const [recentStudents, setRecentStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, studentsData] = await Promise.all([
        studentApi.getDashboardStats().catch(() => null),
        studentApi.getAllStudents().catch(() => [])
      ]);

      if (statsData) {
        setStats(statsData);
      } else if (studentsData && studentsData.length > 0) {
        // Fallback compute stats on client if stats endpoint fails
        const depts = {};
        const years = {};
        studentsData.forEach(s => {
          depts[s.department] = (depts[s.department] || 0) + 1;
          years[s.yearOfStudy] = (years[s.yearOfStudy] || 0) + 1;
        });
        setStats({
          totalStudents: studentsData.length,
          totalDepartments: Object.keys(depts).length,
          studentsByDepartment: depts,
          studentsByYear: years
        });
      }

      // Recent 5 students (sorted by id desc)
      const sorted = [...(studentsData || [])].sort((a, b) => (b.id || 0) - (a.id || 0));
      setRecentStudents(sorted.slice(0, 5));
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Executive Dashboard</h1>
            <p className="page-subtitle">Real-time student metrics, department distribution, and cloud service status</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-secondary btn-sm" onClick={loadDashboardData} disabled={loading}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
              </svg>
              Refresh
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => setActivePage('add-student')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Student
            </button>
          </div>
        </div>
      </div>

      {/* Error banner if backend down */}
      {error && (
        <div style={{
          background: 'var(--danger-bg)',
          border: '1px solid var(--danger-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'var(--danger-text)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{error}</span>
          </div>
          <button className="btn btn-sm btn-outline-danger" onClick={loadDashboardData}>Retry</button>
        </div>
      )}

      {/* Stat Cards Grid */}
      <div className="stats-grid">
        {/* Card 1: Total Students */}
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Total Students</span>
            <div className="stat-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
          </div>
          <div className="stat-value">{loading ? '...' : stats.totalStudents}</div>
          <div className="stat-meta">
            <span>Enrolled active students</span>
          </div>
        </div>

        {/* Card 2: Total Departments */}
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Departments</span>
            <div className="stat-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
          </div>
          <div className="stat-value">{loading ? '...' : stats.totalDepartments}</div>
          <div className="stat-meta">
            <span>Academic divisions</span>
          </div>
        </div>

        {/* Card 3: Backend & Database */}
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Architecture</span>
            <div className="stat-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
              </svg>
            </div>
          </div>
          <div className="stat-value" style={{ fontSize: '1.5rem', marginTop: '0.4rem' }}>
            MySQL 8.0
          </div>
          <div className="stat-meta" style={{ marginTop: '0.75rem' }}>
            <span>JPA / Hibernate ORM active</span>
          </div>
        </div>

        {/* Card 4: Cloud Readiness */}
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Hosting Targets</span>
            <div className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
              </svg>
            </div>
          </div>
          <div className="stat-value" style={{ fontSize: '1.35rem', marginTop: '0.4rem' }}>
            Vercel + Render
          </div>
          <div className="stat-meta" style={{ marginTop: '0.75rem' }}>
            <span>Production dual-cloud ready</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Visual Grid */}
      <div className="dashboard-grid">
        {/* Left Card: Department Distribution */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Students by Department</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {stats.totalDepartments} active programs
            </span>
          </div>
          <div className="card-body">
            {loading ? (
              <p style={{ color: 'var(--text-muted)' }}>Loading analytics...</p>
            ) : Object.keys(stats.studentsByDepartment || {}).length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No student records found to display distribution.</p>
            ) : (
              <div className="distribution-list">
                {Object.entries(stats.studentsByDepartment || {}).map(([dept, count]) => {
                  const percentage = stats.totalStudents > 0 
                    ? Math.round((count / stats.totalStudents) * 100) 
                    : 0;
                  const deptColor = DEPARTMENT_COLORS[dept] || DEPARTMENT_COLORS['Other'];

                  return (
                    <div key={dept} className="distribution-item">
                      <div className="distribution-header">
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: deptColor.accent }} />
                          {dept}
                        </span>
                        <span>
                          <strong>{count}</strong> ({percentage}%)
                        </span>
                      </div>
                      <div className="distribution-bar-bg">
                        <div
                          className="distribution-bar-fill"
                          style={{
                            width: `${percentage}%`,
                            background: deptColor.accent
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Card: Year of Study Distribution */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Year of Study</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Academic Cohorts</span>
          </div>
          <div className="card-body">
            {loading ? (
              <p style={{ color: 'var(--text-muted)' }}>Loading cohort data...</p>
            ) : Object.keys(stats.studentsByYear || {}).length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No student records found.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {Object.entries(stats.studentsByYear || {}).map(([year, count]) => {
                  const style = YEAR_COLORS[year] || { bg: '#f1f5f9', text: '#334155' };
                  return (
                    <div key={year} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: style.bg,
                      color: style.text,
                      fontWeight: 600
                    }}>
                      <span>{year}</span>
                      <span style={{
                        background: 'white',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.85rem'
                      }}>
                        {count} students
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Quick Action Button */}
            <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)' }}>
              <button 
                className="btn btn-outline-primary" 
                style={{ width: '100%' }}
                onClick={() => setActivePage('deployment')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
                </svg>
                Explore Deployment Architecture
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Students Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Recent Student Records</h2>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setActivePage('students')}
          >
            View All ({stats.totalStudents}) &rarr;
          </button>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Loading recent students...
            </div>
          ) : recentStudents.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h3 className="empty-title">No Students in Database</h3>
              <p className="empty-desc">Get started by creating your first student record.</p>
              <button className="btn btn-primary btn-sm" onClick={() => setActivePage('add-student')}>
                Add First Student
              </button>
            </div>
          ) : (
            <div className="table-container" style={{ border: 'none' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Full Name</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>Email</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStudents.map((s) => {
                    const deptStyle = DEPARTMENT_COLORS[s.department] || DEPARTMENT_COLORS['Other'];
                    const yearStyle = YEAR_COLORS[s.yearOfStudy] || { bg: '#f1f5f9', text: '#334155' };
                    return (
                      <tr key={s.id}>
                        <td><span className="student-id-badge">{s.studentId}</span></td>
                        <td><strong>{s.fullName}</strong></td>
                        <td>
                          <span className="dept-badge" style={{ background: deptStyle.bg, color: deptStyle.text, border: `1px solid ${deptStyle.border}` }}>
                            {s.department}
                          </span>
                        </td>
                        <td>
                          <span className="year-badge" style={{ background: yearStyle.bg, color: yearStyle.text }}>
                            {s.yearOfStudy}
                          </span>
                        </td>
                        <td>{s.email}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => onSelectStudent(s)}
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
