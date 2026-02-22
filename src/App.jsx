import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import SchedulePage from '@/pages/SchedulePage';
import GalleryPage from '@/pages/GalleryPage';
import NewsPage from '@/pages/NewsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cronograma" element={<SchedulePage />} />
        <Route path="galeria" element={<GalleryPage />} />
        <Route path="noticias" element={<NewsPage />} />
      </Route>
    </Routes>
  );
}

export default App;