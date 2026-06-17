import { useState, useEffect } from 'react';
import './MapInsights.css'; // Import our new CSS

// 1. Import components from Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // For Donut
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// 2. Register all the components we need
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// --- Reusable Chart Components ---

// Chart 1: Accidents by State (Horizontal Bar Chart)
const StateChart = ({ chartData }) => {
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Total Accidents',
        data: chartData.values,
        backgroundColor: 'rgba(171, 203, 255, 0.7)',
        borderColor: 'rgba(2, 23, 67, 1)',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    indexAxis: 'y', // This makes it a horizontal bar chart
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Top 15 States by Accident Count' },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };
  return <Bar data={data} options={options} />;
};

// Chart 2: Accidents by Time of Day (Vertical Bar Chart)
const TimeOfDayChart = ({ chartData }) => {
  // Logic to sort time bins correctly
  const properOrder = ['Morning (06-11)', 'Afternoon (12-17)', 'Evening (18-23)', 'Night (00-05)'];
  const sortedData = { labels: [], values: [] };

  const dataMap = new Map(chartData.labels.map((label, i) => [label, chartData.values[i]]));
  
  properOrder.forEach(label => {
    if (dataMap.has(label)) {
      sortedData.labels.push(label);
      sortedData.values.push(dataMap.get(label));
    }
  });

  const data = {
    labels: sortedData.labels,
    datasets: [
      {
        label: 'Total Accidents',
        data: sortedData.values,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Accidents by Time of Day' },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return <Bar data={data} options={options} />;
};

// Chart 3: Accident Severity (Donut Chart)
const SeverityChart = ({ chartData }) => {
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Accident Count',
        data: chartData.values,
        backgroundColor: [
          'rgba(250, 239, 23, 0.97)',  // fatal
          'rgba(254, 127, 0, 0.99)',  // minor
          'rgba(240, 19, 19, 0.93)',  // serious
        ],
        borderColor: [
          'rgba(139, 114, 1, 0.86)', //fatal
          'rgba(135, 43, 4, 1)', //minor
          'rgba(127, 20, 1, 1)', //serious
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Important for Donut chart sizing
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Accident Severity Breakdown',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw.toLocaleString();
            return `${label}: ${value}`;
          },
        },
      },
    },
  };
  return (
    <div className="chart-wrapper">
      <Doughnut data={data} options={options} />
    </div>
  );
};


// --- The Main Page Component ---
const MapInsights = () => {
  const [stateData, setStateData] = useState(null);
  const [timeData, setTimeData] = useState(null);
  const [severityData, setSeverityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // We fetch all three data sources at the same time
        const [stateRes, timeRes, severityRes] = await Promise.all([
          fetch('http://localhost:5000/api/stats/by-state'),
          fetch('http://localhost:5000/api/stats/by-time-bin'),
          fetch('http://localhost:5000/api/stats/by-severity')
        ]);

        if (!stateRes.ok || !timeRes.ok || !severityRes.ok) {
          throw new Error('Failed to fetch chart data');
        }

        const stateJson = await stateRes.json();
        const timeJson = await timeRes.json();
        const severityJson = await severityRes.json();

        setStateData(stateJson);
        setTimeData(timeJson);
        setSeverityData(severityJson);
        setError(null);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className="map-insights-container">
      <div className="map-insights-header">
        <h1>Accident Insights Dashboard</h1>
        <p>
          This dashboard provides a high-level overview of accident patterns across
          India, based on the dataset.
        </p>
      </div>

      {/* This is our new CSS Grid layout */}
      <div className="charts-grid">
        <div className="chart-card chart-span-2">
          {stateData && <StateChart chartData={stateData} />}
        </div>
        
        <div className="chart-card chart-time-of-day">
          {timeData && <TimeOfDayChart chartData={timeData} />}
        </div>

        <div className="chart-card chart-severity">
          {severityData && <SeverityChart chartData={severityData} />}
        </div>
      </div>
    </div>
  );
};

export default MapInsights;