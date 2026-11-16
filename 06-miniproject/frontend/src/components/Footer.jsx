import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <strong>Student Management System (SMS)</strong> — Full-Stack Educational Dashboard
        </div>
        <div>
          <span>Architecture: React 18 + Vite &bull; Spring Boot 3 &bull; MySQL &bull; Render &bull; Vercel</span>
        </div>
        <div>
          &copy; {currentYear} StudentMS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
