import React, { useState, useEffect } from 'react';
import studentApi from '../api/studentApi';
import { DEPARTMENTS, YEARS_OF_STUDY, validateStudentForm } from '../utils/constants';

export default function StudentForm({ editingStudent, onSaveSuccess, onCancel }) {
  const isEditMode = Boolean(editingStudent && editingStudent.id);

  const initialFormState = {
    studentId: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    department: 'Computer Science',
    yearOfStudy: '1st Year',
    address: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        studentId: editingStudent.studentId || '',
        fullName: editingStudent.fullName || '',
        email: editingStudent.email || '',
        phoneNumber: editingStudent.phoneNumber || '',
        department: editingStudent.department || 'Computer Science',
        yearOfStudy: editingStudent.yearOfStudy || '1st Year',
        address: editingStudent.address || ''
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
    setServerError(null);
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific validation error on user input
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (serverError) {
      setServerError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    // Run client-side validation
    const { isValid, errors: validationErrors } = validateStudentForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditMode) {
        const updated = await studentApi.updateStudent(editingStudent.id, formData);
        onSaveSuccess({
          type: 'success',
          message: `Student "${updated.fullName}" (${updated.studentId}) updated successfully!`
        });
      } else {
        const created = await studentApi.createStudent(formData);
        onSaveSuccess({
          type: 'success',
          message: `Student "${created.fullName}" (${created.studentId}) registered successfully!`
        });
      }
    } catch (err) {
      setServerError(err.message || 'Operation failed. Please verify student details and connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">
              {isEditMode ? 'Edit Student Information' : 'Register New Student'}
            </h1>
            <p className="page-subtitle">
              {isEditMode
                ? `Updating profile and enrollment details for record ID #${editingStudent.id}`
                : 'Fill in all student particulars below to create a new database record.'}
            </p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onCancel} disabled={isSubmitting}>
            &larr; Back to Directory
          </button>
        </div>
      </div>

      {/* Form Card */}
      <div className="form-card">
        {serverError && (
          <div style={{
            background: 'var(--danger-bg)',
            border: '1px solid var(--danger-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.5rem',
            color: 'var(--danger-text)',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            {/* Student ID */}
            <div className="form-group">
              <label className="form-label" htmlFor="studentId">
                Student ID / Roll No <span className="required">*</span>
              </label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                className={`form-control ${errors.studentId ? 'error' : ''}`}
                placeholder="e.g. STU1009 or CS2026-001"
                value={formData.studentId}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.studentId && <span className="form-error">{errors.studentId}</span>}
            </div>

            {/* Full Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className={`form-control ${errors.fullName ? 'error' : ''}`}
                placeholder="e.g. Rahul Sharma"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.fullName && <span className="form-error">{errors.fullName}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${errors.email ? 'error' : ''}`}
                placeholder="e.g. student@example.edu"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label className="form-label" htmlFor="phoneNumber">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className={`form-control ${errors.phoneNumber ? 'error' : ''}`}
                placeholder="e.g. +91 98765 43210"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.phoneNumber && <span className="form-error">{errors.phoneNumber}</span>}
            </div>

            {/* Department */}
            <div className="form-group">
              <label className="form-label" htmlFor="department">
                Department <span className="required">*</span>
              </label>
              <select
                id="department"
                name="department"
                className={`form-control ${errors.department ? 'error' : ''}`}
                value={formData.department}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && <span className="form-error">{errors.department}</span>}
            </div>

            {/* Year of Study */}
            <div className="form-group">
              <label className="form-label" htmlFor="yearOfStudy">
                Year of Study <span className="required">*</span>
              </label>
              <select
                id="yearOfStudy"
                name="yearOfStudy"
                className={`form-control ${errors.yearOfStudy ? 'error' : ''}`}
                value={formData.yearOfStudy}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                {YEARS_OF_STUDY.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              {errors.yearOfStudy && <span className="form-error">{errors.yearOfStudy}</span>}
            </div>

            {/* Address */}
            <div className="form-group form-grid-full">
              <label className="form-label" htmlFor="address">
                Residential Address <span className="required">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                rows="3"
                className={`form-control ${errors.address ? 'error' : ''}`}
                placeholder="Enter complete residential address, city, state, postal code..."
                value={formData.address}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.address && <span className="form-error">{errors.address}</span>}
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                    <line x1="12" y1="2" x2="12" y2="6"/>
                    <line x1="12" y1="18" x2="12" y2="22"/>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                    <line x1="2" y1="12" x2="6" y2="12"/>
                    <line x1="18" y1="12" x2="22" y2="12"/>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
                  </svg>
                  Saving Record...
                </>
              ) : isEditMode ? (
                'Update Student'
              ) : (
                'Register Student'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
