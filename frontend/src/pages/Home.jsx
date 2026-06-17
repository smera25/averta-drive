import React from 'react';
import './Home.css'; // <-- 1. IMPORT YOUR NEW CSS FILE

// A simple SVG icon for the "About Us" section
const AboutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-1.621-1.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
  </svg>
);


const Home = () => {
  return (
    // We wrap everything in a single div for the background
    <div className="home-wrapper">

      {/* --- 2. THE NEW "HERO BOX" --- */}
      <section className="home-container">
        <div className="hero-box">
          <h1 className="hero-title">Drive Smart, Drive Safe.</h1>
          <p className="hero-subtitle">
            Leveraging AI to predict road accident severity and promote safer driving habits across India. Your journey to safety starts here.
          </p>
          
          <button className="hero-button" onClick={() => console.log("Redirect to Prediction")}>
            Predict Now
          </button>
          
          <div className="stats-container">
            <div className="stat-box">
              <h3 className="stat-number">10K+</h3>
              <p className="stat-label">Predictions Made</p>
            </div>
            <div className="stat-box">
              <h3 className="stat-number">92%</h3>
              <p className="stat-label">Model Accuracy</p>
            </div>
            <div className="stat-box">
              <h3 className="stat-number">24/7</h3>
              <p className="stat-label">Real-time Alerts</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. THE NEW "ABOUT US" SECTION --- */}
      <section className="about-section">
        <div className="about-content">
          <h2>About Us</h2>
          <p>
            This platform is a data-driven initiative to make Indian roads safer. 
            By analyzing vast amounts of historical accident data, our machine learning 
            models identify high-risk areas, predict accident severity, and discover 
            hidden patterns. Our goal is to provide actionable insights for drivers, 
            policymakers, and emergency services.
          </p>
        </div>
        <div className="about-visual">
          <AboutIcon />
        </div>
      </section>
      
    </div>
  );
};

export default Home;