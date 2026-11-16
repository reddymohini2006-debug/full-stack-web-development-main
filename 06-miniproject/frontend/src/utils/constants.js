export const DEPARTMENTS = [
  'Computer Science',
  'Information Technology',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Business Administration',
  'Data Science',
  'Electrical Engineering',
  'Biotechnology',
  'Other'
];

export const YEARS_OF_STUDY = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year'
];

export const DEPARTMENT_COLORS = {
  'Computer Science': { bg: '#e0e7ff', text: '#3730a3', border: '#c7d2fe', accent: '#4f46e5' },
  'Information Technology': { bg: '#e0f2fe', text: '#0369a1', border: '#bae6fd', accent: '#0284c7' },
  'Electronics & Communication': { bg: '#fef3c7', text: '#92400e', border: '#fde68a', accent: '#d97706' },
  'Data Science': { bg: '#ede9fe', text: '#5b21b6', border: '#ddd6fe', accent: '#7c3aed' },
  'Mechanical Engineering': { bg: '#fee2e2', text: '#991b1b', border: '#fecaca', accent: '#dc2626' },
  'Civil Engineering': { bg: '#ffedd5', text: '#9a3412', border: '#fed7aa', accent: '#ea580c' },
  'Business Administration': { bg: '#dcfce7', text: '#166534', border: '#bbf7d0', accent: '#16a34a' },
  'Electrical Engineering': { bg: '#fef9c3', text: '#854d0e', border: '#fef08a', accent: '#ca8a04' },
  'Biotechnology': { bg: '#fce7f3', text: '#9d174d', border: '#fbcfe8', accent: '#db2777' },
  'Other': { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0', accent: '#64748b' }
};

export const YEAR_COLORS = {
  '1st Year': { bg: '#ecfdf5', text: '#065f46' },
  '2nd Year': { bg: '#eff6ff', text: '#1e40af' },
  '3rd Year': { bg: '#f5f3ff', text: '#5b21b6' },
  '4th Year': { bg: '#fff7ed', text: '#9a3412' }
};

export const validateStudentForm = (formData) => {
  const errors = {};

  if (!formData.studentId || !formData.studentId.trim()) {
    errors.studentId = 'Student ID is required';
  } else if (formData.studentId.trim().length < 2) {
    errors.studentId = 'Student ID must be at least 2 characters';
  }

  if (!formData.fullName || !formData.fullName.trim()) {
    errors.fullName = 'Full Name is required';
  } else if (formData.fullName.trim().length < 2) {
    errors.fullName = 'Name must be at least 2 characters';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  const phoneRegex = /^[0-9+\-\s()]{7,20}$/;
  if (!formData.phoneNumber || !formData.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required';
  } else if (!phoneRegex.test(formData.phoneNumber.trim())) {
    errors.phoneNumber = 'Please enter a valid phone number (digits, +, -)';
  }

  if (!formData.department || !formData.department.trim()) {
    errors.department = 'Department is required';
  }

  if (!formData.yearOfStudy || !formData.yearOfStudy.trim()) {
    errors.yearOfStudy = 'Year of Study is required';
  }

  if (!formData.address || !formData.address.trim()) {
    errors.address = 'Address is required';
  } else if (formData.address.trim().length < 5) {
    errors.address = 'Address must be at least 5 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
