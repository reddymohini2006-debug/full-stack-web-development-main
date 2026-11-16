import axios from 'axios';

// Get base URL from environment variables or default to relative/localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
});

// Response interceptor for consistent error extraction
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'An unexpected error occurred. Please try again.';

    if (error.response) {
      // Backend returned an error response
      if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      } else if (error.response.status === 404) {
        errorMessage = 'Requested resource not found.';
      } else if (error.response.status === 409) {
        errorMessage = 'Conflict: Duplicate record detected (Student ID or Email already exists).';
      } else if (error.response.status >= 500) {
        errorMessage = 'Backend server error. Please check server logs.';
      }
    } else if (error.request) {
      // Request made but no response received (server down, CORS issue, or cold start)
      errorMessage = 'Unable to connect to the backend server. If using Render free tier, the service may be spinning up from cold sleep (takes ~40s). Ensure backend is running.';
    } else {
      errorMessage = error.message;
    }

    const enhancedError = new Error(errorMessage);
    enhancedError.originalError = error;
    enhancedError.response = error.response;
    return Promise.reject(enhancedError);
  }
);

export const studentApi = {
  // Fetch all students (optional search keyword)
  getAllStudents: async (search = '') => {
    const params = search ? { search } : {};
    const response = await apiClient.get('/students', { params });
    return response.data;
  },

  // Fetch student by database ID
  getStudentById: async (id) => {
    const response = await apiClient.get(`/students/${id}`);
    return response.data;
  },

  // Add new student
  createStudent: async (studentData) => {
    const response = await apiClient.post('/students', studentData);
    return response.data;
  },

  // Update existing student
  updateStudent: async (id, studentData) => {
    const response = await apiClient.put(`/students/${id}`, studentData);
    return response.data;
  },

  // Delete student
  deleteStudent: async (id) => {
    const response = await apiClient.delete(`/students/${id}`);
    return response.data;
  },

  // Get aggregated dashboard statistics
  getDashboardStats: async () => {
    const response = await apiClient.get('/students/stats');
    return response.data;
  },

  // Health check endpoint
  checkHealth: async () => {
    // Health check is at /health or /api/health
    const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/health` : `${API_BASE_URL}/api/health`;
    const response = await axios.get(url, { timeout: 8000 });
    return response.data;
  },

  getBaseUrl: () => API_BASE_URL,
};

export default studentApi;
