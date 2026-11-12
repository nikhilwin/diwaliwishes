import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { EditorPage } from './pages/EditorPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { GreetingExperiencePage } from './pages/GreetingExperiencePage';
import { AboutPage } from './pages/AboutPage';

export const App: React.FC = () => {
  const location = useLocation();
  // Don't render general layout navbar/footer on full-screen recipient greeting view
  const isGreetingView = location.pathname.startsWith('/greeting/');

  return (
    <div className="min-h-screen bg-[#080518] text-white flex flex-col font-body selection:bg-amber-500 selection:text-slate-950">
      {!isGreetingView && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<EditorPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/greeting/:id" element={<GreetingExperiencePage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Catch-all route redirects to Home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      {!isGreetingView && <Footer />}
    </div>
  );
};
