import { Link } from 'react-router-dom';
import './Dashboard.css'; // <-- 1. IMPORT YOUR NEW CSS

// --- 2. Simple SVG Icons (as components) ---

const OlapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

const KmeansIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V21A3.375 3.375 0 0110.125 17.625v-4.5M13.5 10.5V3A3.375 3.375 0 0010.125 6.375v4.125m3.375 0V21M3.375 6.375v4.125M3.375 10.5V21M3.375 10.5V6.375m0 4.125h6.75m3.375 0h6.75m-3.375 0V6.375m3.375 4.125V21m-3.375 0v-4.5m3.375 4.5v-4.5m0-4.125v4.5m0-4.5V6.375M10.125 6.375v4.125m0 0h6.75" />
  </svg>
);

const KnnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
  </svg>
);

const AprioriIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);


// --- 3. The Main Dashboard Component ---

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Data Mining Dashboard</h1>
        <p>Select an algorithm to run analysis and discover hidden patterns.</p>
      </div>

      <div className="feature-grid">
        
        {/* Card 1: OLAP */}
        <Link to="/olap" className="feature-card card-olap">
          <OlapIcon />
          <h2>OLAP Operations</h2>
          <p>Slice, dice, and pivot the data to see multi-dimensional summaries.</p>
        </Link>

        {/* Card 2: K-Means */}
        <Link to="/kmeans" className="feature-card card-kmeans">
          <KmeansIcon />
          <h2>K-Means Clustering</h2>
          <p>Automatically group accidents into clusters based on their similarities.</p>
        </Link>

        {/* Card 3: KNN */}
        <Link to="/knn" className="feature-card card-knn">
          <KnnIcon />
          <h2>K-Nearest Neighbors</h2>
          <p>Classify accident severity based on the features of its nearest neighbors.</p>
        </Link>

        {/* Card 4: Apriori */}
        <Link to="/apriori" className="feature-card card-apriori">
          <AprioriIcon />
          <h2>Apriori Algorithm</h2>
          <p>Discover "if-then" rules, like "if it's raining, accidents happen on highways."</p>
        </Link>

      </div>
    </div>
  );
};

export default Dashboard;