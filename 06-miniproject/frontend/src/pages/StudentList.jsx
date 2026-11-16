import React, { useState, useEffect, useMemo } from 'react';
import studentApi from '../api/studentApi';
import { DEPARTMENTS, YEARS_OF_STUDY, DEPARTMENT_COLORS, YEAR_COLORS } from '../utils/constants';

export default function StudentList({ onSelectStudent, onEditStudent, onDeleteRequest, setActivePage }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [sortBy, setSortBy] = useState('name-asc');

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentApi.getAllStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch students from backend server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter and sort students locally
  const filteredStudents = useMemo(() => {
    return students
      .filter((student) => {
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !query ||
          student.fullName?.toLowerCase().includes(query) ||
          student.studentId?.toLowerCase().includes(query) ||
          student.email?.toLowerCase().includes(query) ||
          student.department?.toLowerCase().includes(query) ||
          student.phoneNumber?.includes(query);

        const matchesDept = selectedDept === 'ALL' || student.department === selectedDept;
        const matchesYear = selectedYear === 'ALL' || student.yearOfStudy === selectedYear;

        return matchesQuery && matchesDept && matchesYear;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') return (a.fullName || '').localeCompare(b.fullName || '');
        if (sortBy === 'name-desc') return (b.fullName || '').localeCompare(a.fullName || '');
        if (sortBy === 'id-asc') return (a.studentId || '').localeCompare(b.studentId || '');
        if (sortBy === 'id-desc') return (b.studentId || '').localeCompare(a.studentId || '');
        if (sortBy === 'newest') return (b.id || 0) - (a.id || 0);
        return 0;
      });
  }, [students, searchQuery, selectedDept, selectedYear, sortBy]);

  // Export to CSV helper
  const exportToCSV = () => {
    if (filteredStudents.length === 0) return;
    const headers = ['ID', 'Student ID', 'Full Name', 'Email', 'Phone', 'Department', 'Year of Study', 'Address'];
    const rows = filteredStudents.map(s => [
      s.id,
      `"${s.studentId}"`,
      `"${s.fullName}"`,
      `"${s.email}"`,
      `"${s.phoneNumber}"`,
      `"${s.department}"`,
      `"${s.yearOfStudy}"`,
      `"${s.address?.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `students_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Student Directory</h1>
            <p className="page-subtitle">
              Manage and search enrolled student records across all departments
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary btn-sm" onClick={exportToCSV} disabled={filteredStudents.length === 0}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export CSV
            </button>
            <button className="btn btn-secondary btn-sm" onClick={fetchStudents} disabled={loading}>
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
              Add New Student
            </button>
          </div>
        </div>
      </div>

      {/* Error Banner */}
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
          <div>{error}</div>
          <button className="btn btn-sm btn-outline-danger" onClick={fetchStudents}>Retry</button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-body">
          <div className="table-controls">
            {/* Search Input */}
            <div className="search-input-wrapper">
              <span className="search-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </span>
              <input
                type="text"
                className="search-input"
                placeholder="Search by student name, ID, email, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Department Filter */}
            <select
              className="filter-select"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              aria-label="Filter by department"
            >
              <option value="ALL">All Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            {/* Year of Study Filter */}
            <select
              className="filter-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              aria-label="Filter by year"
            >
              <option value="ALL">All Cohorts</option>
              {YEARS_OF_STUDY.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort by"
            >
              <option value="name-asc">Sort: Name (A-Z)</option>
              <option value="name-desc">Sort: Name (Z-A)</option>
              <option value="id-asc">Sort: Student ID (A-Z)</option>
              <option value="id-desc">Sort: Student ID (Z-A)</option>
              <option value="newest">Sort: Recently Added</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            <div>
              Showing <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> students
            </div>
            {(searchQuery || selectedDept !== 'ALL' || selectedYear !== 'ALL') && (
              <button
                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDept('ALL');
                  setSelectedYear('ALL');
                }}
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Loading student records...
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <h3 className="empty-title">No Students Found</h3>
              <p className="empty-desc">
                {students.length === 0
                  ? 'There are currently no students in the database. Add one to get started!'
                  : 'No students matched your search criteria. Try adjusting your query or filters.'}
              </p>
              {students.length === 0 ? (
                <button className="btn btn-primary btn-sm" onClick={() => setActivePage('add-student')}>
                  Add First Student
                </button>
              ) : (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDept('ALL');
                    setSelectedYear('ALL');
                  }}
                >
                  Reset Filters
                </button>
              )}
            </div>
          ) : (
            <div className="table-container" style={{ border: 'none' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Full Name</th>
                    <th>Department</th>
                    <th>Cohort</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s) => {
                    const deptStyle = DEPARTMENT_COLORS[s.department] || DEPARTMENT_COLORS['Other'];
                    const yearStyle = YEAR_COLORS[s.yearOfStudy] || { bg: '#f1f5f9', text: '#334155' };
                    return (
                      <tr key={s.id}>
                        <td>
                          <span className="student-id-badge">{s.studentId}</span>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                            {s.fullName}
                          </div>
                        </td>
                        <td>
                          <span
                            className="dept-badge"
                            style={{
                              background: deptStyle.bg,
                              color: deptStyle.text,
                              border: `1px solid ${deptStyle.border}`
                            }}
                          >
                            {s.department}
                          </span>
                        </td>
                        <td>
                          <span className="year-badge" style={{ background: yearStyle.bg, color: yearStyle.text }}>
                            {s.yearOfStudy}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            {s.email}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            {s.phoneNumber}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="action-group" style={{ justifyContent: 'flex-end' }}>
                            {/* View Details */}
                            <button
                              className="icon-btn"
                              title="View Student Details"
                              onClick={() => onSelectStudent(s)}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                              </svg>
                            </button>

                            {/* Edit */}
                            <button
                              className="icon-btn edit"
                              title="Edit Student Information"
                              onClick={() => onEditStudent(s)}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                            </button>

                            {/* Delete */}
                            <button
                              className="icon-btn delete"
                              title="Delete Student"
                              onClick={() => onDeleteRequest(s)}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                              </svg>
                            </button>
                          </div>
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
