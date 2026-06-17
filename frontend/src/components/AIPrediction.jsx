import React, { useState } from 'react';
import styles from './AIPrediction.module.css';

const AIPrediction = () => {
  // ---
  // STEP 1: "THE MEMORY"
  // This 'useState' hook holds the *currently selected* value for every
  // dropdown. We set the default values here (e.g., 'Clear', 'Dry').
  // ---
  const [formData, setFormData] = useState({
    weather: 'Clear',
    roadSurface: 'Dry',
    vehicleType: 'Car',
    timeOfDay: 'Afternoon (12-17)',
    lightCondition: 'Daylight',
    traffic: 'Signs',
    driverAge: '26-40',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---
  // STEP 2: "THE ACTION"
  // This 'handleChange' function is called EVERY time you
  // select a new option from *any* dropdown.
  // ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // It finds which dropdown was changed (e.g., 'weather')
    // and updates its value in "THE MEMORY" (setFormData).
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // It sends the *current* state of 'formData' to your Python API
        body: JSON.stringify(formData), 
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Prediction failed');
      }
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const severityClass = result ? result.severity.split(' ')[0] : '';

  return (
    <div className={styles.predictionPageContainer}>
      <div className={styles.header}>
        <h1>AI Accident Severity Prediction</h1>
        <p>
          Select the conditions to predict the most likely accident outcome.
          Our model is trained on thousands of real-world accident reports.
        </p>
      </div>

      <div className={styles.predictionLayout}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <h3>Enter Conditions</h3>
          
          {/* HOW TO CHANGE THE *OPTIONS IN THE LIST*
            
            To change the *options* for this dropdown, you can
            manually add, edit, or remove the <option> tags below.
            
            For example, you could add:
            <option value="Snowy">Snowy</option>
            
            !! IMPORTANT WARNING !!
            If you add a new option (like "Snowy"), you MUST make sure
            your AI model was also trained on data that includes "Snowy".
            If not, your Python code will crash when it tries to predict.
          */}
          <div className={styles.formGroup}>
            <label htmlFor="weather">Weather Conditions:</label>
            {/* STEP 3: "THE CONNECTION"
              This 'select' tag is connected to our code in two ways:
              1. value={formData.weather}: This *reads* from "THE MEMORY".
              2. onChange={handleChange}: This *calls* "THE ACTION" when you click.
            */}
            <select id="weather" name="weather" className={styles.formSelect} value={formData.weather} onChange={handleChange}>
              <option value="Clear">Clear</option>
              <option value="Rainy">Rainy</option>
              <option value="Foggy">Foggy</option>
              <option value="Hazy">Hazy</option>
              <option value="Stormy">Stormy</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="roadSurface">Road Condition:</label>
            <select id="roadSurface" name="roadSurface" className={styles.formSelect} value={formData.roadSurface} onChange={handleChange}>
              <option value="Dry">Dry</option>
              <option value="Wet">Wet</option>
              <option value="Damaged">Damaged</option>
              <option value="Under Construction">Under Construction</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="vehicleType">Vehicle Type:</label>
            <select id="vehicleType" name="vehicleType" className={styles.formSelect} value={formData.vehicleType} onChange={handleChange}>
              <option value="Car">Car</option>
              <option value="Two-Wheeler">Two-Wheeler</option>
              <option value="Truck">Truck</option>
              <option value="Bus">Bus</option>
              <option value="Auto-Rickshaw">Auto-Rickshaw</option>
              <option value="Cycle">Cycle</option>
              <option value="Pedestrian">Pedestrian</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="timeOfDay">Time of Day:</label>
            <select id="timeOfDay" name="timeOfDay" className={styles.formSelect} value={formData.timeOfDay} onChange={handleChange}>
              <option value="Morning (06-11)">Morning (06-11)</option>
              <option value="Afternoon (12-17)">Afternoon (12-17)</option>
              <option value="Evening (18-23)">Evening (18-23)</option>
              <option value="Night (00-05)">Night (00-05)</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lightCondition">Lighting Conditions:</label>
            <select id="lightCondition" name="lightCondition" className={styles.formSelect} value={formData.lightCondition} onChange={handleChange}>
              <option value="Daylight">Daylight</option>
              <option value="Dusk">Dusk</option>
              <option value="Dawn">Dawn</option>
              <option value="Dark">Dark</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="traffic">Traffic Control:</label>
            <select id="traffic" name="traffic" className={styles.formSelect} value={formData.traffic} onChange={handleChange}>
              <option value="Signs">Signs</option>
              <option value="Signals">Signals</option>
              <option value="Police Checkpost">Police Checkpost</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="driverAge">Driver Age Group:</label>
            <select id="driverAge" name="driverAge" className={styles.formSelect} value={formData.driverAge} onChange={handleChange}>
              <option value="18-25">18-25</option>
              <option value="26-40">26-40</option>
              <option value="41-60">41-60</option>
              <option value="61+">61+</option>
            </select>
          </div>

          <button type="submit" className={styles.formButton} disabled={loading}>
            {loading ? 'Predicting...' : 'Predict Severity'}
          </button>
        </form>

        {/* --- Column 2: The Result --- */}
        <div className={styles.resultsContainer}>
          <h3>Prediction Result</h3>
          
          {loading && <p>Loading...</p>}
          {error && <p className={styles.errorText}>Error: {error}</p>}

          {result && (
            <>
              <div className={styles.severityDisplay}>
                <p className={styles.severityResult} data-severity={severityClass}>
                  {result.severity}
                </p>
                <p className={styles.confidenceScore}>
                  <strong>Confidence Score:</strong> {result.score}%
                </p>
              </div>
              
              <div className={styles.suggestionBox}>
                <strong>AI Safety Suggestion:</strong>
                <p>{result.suggestion}</p>
              </div>
            </>
          )}

          {!result && !loading && !error && (
            <p className={styles.placeholderText}>
              Your prediction results will appear here.
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default AIPrediction;