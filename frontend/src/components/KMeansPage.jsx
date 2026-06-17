import { useState, useEffect } from 'react';
import './KMeansPage.css'; // <-- 1. IMPORT YOUR NEW CSS FILE

const KmeansPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This will hold our combined, user-friendly data
  const [processedData, setProcessedData] = useState([]);

  useEffect(() => {
    // --- (Original fetch logic... no changes here) ---
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/kmeans');
        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.error || `HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
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
  }, []);

  // --- 2. A NEW EFFECT TO PROCESS THE DATA ---
  // This runs whenever the 'data' state changes
  useEffect(() => {
    if (data) {
      // We are merging the 'cluster_centers' and 'cluster_counts'
      // into one easy-to-use array.
      const mergedData = data.cluster_centers.map((center, index) => {
        // Find the count that matches this cluster
        const countData = data.cluster_counts.find(c => c.cluster === index);
        
        return {
          id: index,
          avgAge: center.driver_age,
          avgSpeed: center.speed_limit_,
          count: countData ? countData.count : 0
        };
      });
      setProcessedData(mergedData);
    }
  }, [data]); // This effect depends on 'data'

  // --- 3. THE NEW RENDERED JSX ---
  return (
    <div className="kmeans-container">
      <div className="kmeans-header">
        <h1>K-Means Clustering Results</h1>
        <p>
          This algorithm has analyzed the dataset to find 4 distinct groups (or "clusters")
          of accidents based on driver age and speed limit. Below, each card represents
          one of these groups and its average characteristics.
        </p>
      </div>

      {loading && <p style={{textAlign: 'center', fontSize: '1.2rem'}}>Loading clusters...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>}
      
      {/* We map over our new 'processedData' array */}
      {processedData.length > 0 && (
        <div className="cluster-grid">
          {processedData.map((cluster) => (
            <div className="cluster-card" key={cluster.id}>
              <div className="card-header">
                <h2>Cluster {cluster.id + 1}</h2> {/* Use +1 for users */}
              </div>
              <div className="card-content">
                <div className="data-point">
                  <span className="data-label">Total Accidents:</span>
                  <span className="data-value count">
                    {cluster.count.toLocaleString()} {/* 1,234 format */}
                  </span>
                </div>
                <div className="data-point">
                  <span className="data-label">Average Driver Age:</span>
                  <span className="data-value">
                    {cluster.avgAge.toFixed(0)} {/* Rounds to 34 */}
                  </span>
                </div>
                <div className="data-point">
                  <span className="data-label">Average Speed Limit:</span>
                  <span className="data-value">
                    {cluster.avgSpeed.toFixed(0)} km/h {/* Rounds and adds units */}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KmeansPage;