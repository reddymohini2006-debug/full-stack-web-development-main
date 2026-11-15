import React from 'react';
import { DEPARTMENT_COLORS, YEAR_COLORS } from '../utils/constants';

export default function StudentDetailsModal({ student, isOpen, onClose, onEdit, onDelete }) {
  if (!isOpen || !student) return null;

  const deptStyle = DEPARTMENT_COLORS[student.department] || DEPARTMENT_COLORS['Other'];
  const yearStyle = YEAR_COLORS[student.yearOfStudy] || { bg: '#f1f5f9', text: '#334155' };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: deptStyle.accent,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '1.2rem'
            }}>
              {student.fullName ? student.fullName.charAt(0).toUpperCase() : 'S'}
            </div>
            <div>
              <h3 className="modal-title">{student.fullName}</h3>
              <span className="student-id-badge">{student.studentId}</span>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close dialog">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Department
              </div>
              <div style={{ marginTop: '0.35rem' }}>
                <span className="dept-badge" style={{ background: deptStyle.bg, color: deptStyle.text, border: `1px solid ${deptStyle.border}` }}>
                  {student.department}
                </span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Year of Study
              </div>
              <div style={{ marginTop: '0.35rem' }}>
                <span className="year-badge" style={{ background: yearStyle.bg, color: yearStyle.text }}>
                  {student.yearOfStudy}
                </span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Email Address
              </div>
              <div style={{ marginTop: '0.35rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                <a href={`mailto:${student.email}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                  {student.email}
                </a>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Phone Number
              </div>
              <div style={{ marginTop: '0.35rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                <a href={`tel:${student.phoneNumber}`} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                  {student.phoneNumber}
                </a>
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Residential Address
            </div>
            <div style={{
              background: 'var(--bg-subtle)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)'
            }}>
              {student.address}
            </div>
          </div>

          {(student.createdAt || student.updatedAt) && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem' }}>
              <div>Added: {student.createdAt ? new Date(student.createdAt).toLocaleString() : 'N/A'}</div>
              <div>Last Modified: {student.updatedAt ? new Date(student.updatedAt).toLocaleString() : 'N/A'}</div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline-danger btn-sm" onClick={() => { onClose(); onDelete(student); }}>
            Delete
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => { onClose(); onEdit(student); }}>
            Edit Information
          </button>
        </div>
      </div>
    </div>
  );
}
