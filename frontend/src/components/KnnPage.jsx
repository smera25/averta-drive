import { useState, useEffect } from 'react';
import './KnnPage.css'; // <-- 1. IMPORT YOUR NEW CSS FILE

const KnnPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- (Original fetch logic... no changes here, it's already debugged!) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/knn');
        
        const result = await response.json(); 

        if (!response.ok) {
          throw new Error(result.error || `HTTP error! status: ${response.status}`);
        }

        setData(result);
        setError(null);

      } catch (e) {
        setError(e.message); 
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // The empty array means this runs once on component load


  // --- 2. THE NEW RENDERED JSX ---
  return (
    <div className="knn-container">
      <div className="knn-header">
        <h1>KNN Classification Report</h1>
        <p>
          This page shows the results of a K-Nearest Neighbors (KNN) model.
          We trained it to predict the severity of an accident based on 
          the driver's age and the number of vehicles involved.
        </p>
      </div>

      {loading && <p style={{textAlign: 'center', fontSize: '1.2rem'}}>Running the model...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>}
      
      {/* We only show the panel *after* data has loaded successfully */}
      {data && (
        <div className="knn-results-panel">
          
          {/* --- Top Section: Accuracy --- */}
          <div className="knn-accuracy-section">
            <p className="accuracy-label">Model Accuracy</p>
            <p className="accuracy-value">
              {data.accuracy.toFixed(1)}%
            </p>
          </div>

          {/* --- Bottom Section: Details --- */}
          <div className="knn-details-section">
            
            {/* --- Model Parameters Grid --- */}
            <div className="details-grid">
              <div className="detail-item">
                <p className="detail-label">Target Variable</p>
                <p className="detail-value">{data.target.replace('_', ' ')}</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">K-Value Used</p>
                <p className="detail-value">{data.k_value}</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Features Used</p>
                <p className="detail-value">
                  {data.features_used.join(', ').replace('_', ' ')}
                </p>
              </div>
            </div>

            {/* --- Label Mapping Section --- */}
            <div className="knn-mapping-section">
              <h3>Prediction Key</h3>
              <table className="mapping-table">
                <thead>
                  <tr>
                    <th>Encoded Value</th>
                    <th>Accident Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {/* We convert the label_mapping object into a table */}
                  {Object.entries(data.label_mapping).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default KnnPage;