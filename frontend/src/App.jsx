// src/App.jsx
// (Make sure to import your new components)

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import AIPrediction from './components/AIPrediction';
import MapInsights from './components/MapInsights';
import SafetyTips from './components/SafetyTips';
import Contact from './components/Contact';
import Profile from './components/Profile';
import Insights from './components/Insights';
import UserSafetyLog from './components/UserSafetyLog';
import Feedback from './components/Feedback';
import Awareness from './components/Awareness';

// --- ADD IMPORTS FOR NEW PAGES ---
import OlapPage from './components/OlapPage';
import KmeansPage from './components/KMeansPage';
import KnnPage from './components/KnnPage';
import AprioriPage from './components/AprioriPage';
// --- END ---

import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ai-prediction" element={<AIPrediction />} />
            <Route path="/map-insights" element={<MapInsights />} />
            <Route path="/safety-tips" element={<SafetyTips />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/user-safety-log" element={<UserSafetyLog />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/awareness" element={<Awareness />} />

            {/* --- ADD NEW ROUTES --- */}
            <Route path="/olap" element={<OlapPage />} />
            <Route path="/kmeans" element={<KmeansPage />} />
            <Route path="/knn" element={<KnnPage />} />
            <Route path="/apriori" element={<AprioriPage />} />
            {/* --- END --- */}

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;