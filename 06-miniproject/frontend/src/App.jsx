import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Notification from './components/Notification';
import ConfirmModal from './components/ConfirmModal';
import StudentDetailsModal from './components/StudentDetailsModal';
import Dashboard from './pages/Dashboard';
import StudentList from './pages/StudentList';
import StudentForm from './pages/StudentForm';
import DeploymentComparison from './pages/DeploymentComparison';
import studentApi from './api/studentApi';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [notification, setNotification] = useState(null);

  // Modal and Selection States
  const [viewingStudent, setViewingStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handlers
  const handleSelectStudent = (student) => {
    setViewingStudent(student);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setActivePage('edit-student');
    setViewingStudent(null);
  };

  const handleDeleteRequest = (student) => {
    setDeletingStudent(student);
  };

  const handleConfirmDelete = async () => {
    if (!deletingStudent) return;
    setIsDeleting(true);
    try {
      await studentApi.deleteStudent(deletingStudent.id);
      setNotification({
        type: 'success',
        message: `Student "${deletingStudent.fullName}" (${deletingStudent.studentId}) deleted successfully.`
      });
      setDeletingStudent(null);
      // If user was on student list, page remains student list so it refreshes
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.message || 'Failed to delete student record.'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveSuccess = (toastNotification) => {
    setNotification(toastNotification);
    setEditingStudent(null);
    setActivePage('students');
  };

  const handleCancelForm = () => {
    setEditingStudent(null);
    setActivePage('students');
  };

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content Area */}
      <main className="main-content">
        {activePage === 'dashboard' && (
          <Dashboard
            setActivePage={setActivePage}
            onSelectStudent={handleSelectStudent}
          />
        )}

        {activePage === 'students' && (
          <StudentList
            onSelectStudent={handleSelectStudent}
            onEditStudent={handleEditStudent}
            onDeleteRequest={handleDeleteRequest}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'add-student' && (
          <StudentForm
            editingStudent={null}
            onSaveSuccess={handleSaveSuccess}
            onCancel={handleCancelForm}
          />
        )}

        {activePage === 'edit-student' && (
          <StudentForm
            editingStudent={editingStudent}
            onSaveSuccess={handleSaveSuccess}
            onCancel={handleCancelForm}
          />
        )}

        {activePage === 'deployment' && (
          <DeploymentComparison />
        )}
      </main>

      {/* Global Modals */}
      <StudentDetailsModal
        student={viewingStudent}
        isOpen={Boolean(viewingStudent)}
        onClose={() => setViewingStudent(null)}
        onEdit={handleEditStudent}
        onDelete={handleDeleteRequest}
      />

      <ConfirmModal
        isOpen={Boolean(deletingStudent)}
        title="Delete Student Record"
        message="Are you sure you want to permanently delete this student from the database? This action cannot be reverted."
        student={deletingStudent}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingStudent(null)}
      />

      {/* Toast Notification */}
      <Notification
        notification={notification}
        onDismiss={() => setNotification(null)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
