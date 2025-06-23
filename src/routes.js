import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UrlShortenerForm from './components/UrlShortenerForm';
import StatsPage from './components/StatsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UrlShortenerForm />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/:shortcode" element={<RedirectHandler />} />
    </Routes>
  );
}

function RedirectHandler() {
  window.location.href = 'https://example.com'; 
  return null;
}
