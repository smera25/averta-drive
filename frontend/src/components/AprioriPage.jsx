import { useState, useEffect } from 'react';
import './AprioriPage.css'; // <-- 1. IMPORT YOUR NEW CSS FILE

const AprioriPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 2. FETCH LOGIC (WITH BETTER ERROR HANDLING) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/apriori');
        
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

  // --- 3. THE NEW RENDERED JSX ---
  return (
    <div className="apriori-container">
      <div className="apriori-header">
        <h1>Apriori Association Rules</h1>
        <p>
          This algorithm finds hidden patterns and relationships in the data.
          Each card below represents a "rule" in the format of "IF this happens, THEN that also tends to happen."
          The "Confidence" score tells you how reliable that rule is.
        </p>
      </div>

      {loading && <p style={{textAlign: 'center', fontSize: '1.2rem'}}>Discovering patterns...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>}
      
      {data && (
        <div className="rules-list">
          {/* We map over the data and create a card for each rule */}
          {data.map((rule, index) => (
            <div className="rule-card" key={index}>
              <div className="rule-card-body">
                
                {/* --- IF Section --- */}
                <div className="if-section">
                  <h4>IF</h4>
                  <div className="tags-container">
                    {rule.antecedents.map((item, i) => (
                      <span key={i} className="item-tag if-tag">{item}</span>
                    ))}
                  </div>
                </div>
                
                {/* --- Arrow --- */}
                <div className="arrow-section">
                  &rarr;
                </div>

                {/* --- THEN Section --- */}
                <div className="then-section">
                  <h4>THEN</h4>
                  <div className="tags-container">
                    {rule.consequents.map((item, i) => (
                      <span key={i} className="item-tag then-tag">{item}</span>
                    ))}
                  </div>
                </div>

              </div>
              <div className="metrics-section">
                
                {/* --- Confidence (Highlighted) --- */}
                <div className="metric-item confidence">
                  <span>Confidence</span>
                  <strong>
                    {(rule.confidence * 100).toFixed(1)}%
                  </strong>
                </div>

                {/* --- Support --- */}
                <div className="metric-item">
                  <span>Support</span>
                  <strong>
                    {(rule.support * 100).toFixed(2)}%
                  </strong>
                </div>

                {/* --- Lift --- */}
                <div className="metric-item">
                  <span>Lift</span>
                  <strong>
                    {rule.lift.toFixed(2)}
                  </strong>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AprioriPage;