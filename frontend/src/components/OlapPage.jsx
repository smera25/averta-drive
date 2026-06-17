import { useState, useEffect } from 'react';

const OlapPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // This URL calls your Python backend
        const response = await fetch('http://localhost:5000/api/olap-pivot'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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
  }, []); // The empty array means this runs once on component load

  return (
    <div>
      <h1>OLAP - Pivot Table</h1>
      <p>Accident counts by State and Severity.</p>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ background: '#eee' }}>
              <th style={tableCellStyle}>State</th>
              <th style={tableCellStyle}>Fatal</th>
              <th style={tableCellStyle}>Minor</th>
              <th style={tableCellStyle}>Serious</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td style={tableCellStyle}>{row.state_name}</td>
                <td style={tableCellStyle}>{row.Fatal || 0}</td>
                <td style={tableCellStyle}>{row.Minor || 0}</td>
                <td style={tableCellStyle}>{row.Serious || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const tableCellStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left',
};

export default OlapPage;