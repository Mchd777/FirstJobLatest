import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Offres from './pages/Offres';
import OffreDetail from './pages/OffreDetail';
import Postuler from './pages/Postuler';
import Confirmation from './pages/Confirmation';
import Dashboard from './pages/admin/Dashboard';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="offres" element={<Offres />} />
          <Route path="offres/:id" element={<OffreDetail />} />
          <Route path="postuler/:id" element={<Postuler />} />
          <Route path="confirmation" element={<Confirmation />} />
          <Route path="admin" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;