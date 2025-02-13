import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import {
    LineChart, Line, PieChart, Pie, Cell, Tooltip, Legend,
    ResponsiveContainer
} from 'recharts';
import './SurveyInsights.css';

const SurveyInsights = () => {
    const [bubbleChart, setBubbleChart] = useState(null);
    const [sankeyChart, setSankeyChart] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Fetch Bubble Chart from Flask API
    useEffect(() => {
        axios.get('http://127.0.0.1:8050/bubble-chart')
            .then(response => setBubbleChart(response.data))
            .catch(error => console.error("Error fetching bubble chart:", error));
    }, []);

    // Fetch Sankey Chart when a product is clicked
    useEffect(() => {
        if (selectedProduct) {
            axios.get(`http://127.0.0.1:8050/sankey-chart/${selectedProduct}`)
                .then(response => setSankeyChart(response.data))
                .catch(error => console.error("Error fetching sankey chart:", error));
        }
    }, [selectedProduct]);

    // Handle Bubble Chart Click
    const handleBubbleClick = (event) => {
        if (event.points && event.points.length > 0) {
            const clickedProduct = event.points[0].text;
            setSelectedProduct(clickedProduct);
        }
    };

    // Dummy Data for Other Components
    const metrics = [
        { icon: "📊", label: "Total Responses", value: "10" },
        { icon: "⏱", label: "Time Spent (Average)", value: "18s" },
        { icon: "📈", label: "Positive Responses", value: "65%" },
        { icon: "📉", label: "Negative Responses", value: "34%" }
    ];
    const tabOptions = ['Overall View', 'Sub topics', 'Growth intensity'];

    const concerningPoints = [
        'Work-Life Balance Issues, Long hours, high stress.',
        'Career Growth Concerns, Limited training, slow promotions.',
        'Poor Communication',
        'Misunderstanding/unclear instructions',
        'Low Employee Morale (lack of recognition, motivation)',
        'High Turnover Rate - Frequent resignations, dissatisfaction.'
    ];

    const generateTrendData = () => Array.from({ length: 20 }, (_, i) => ({
      x: i,
      y: Math.sin(i * 0.5) * 10 + Math.random() * 15 + 40
  }));
  
  // Function to generate random stats between 50% and 90%
  const generateRandomStats = () => Math.floor(Math.random() * 41) + 50;

    // Topic table data
    const topicTableData = [
    { name: '1. Customer Satisfaction', trend: generateTrendData(), stats: generateRandomStats() },
    { name: '2. Service Quality', trend: generateTrendData(), stats: generateRandomStats() },
    { name: '3. Communication & Responsiveness', trend: generateTrendData(), stats: generateRandomStats() },
    { name: '4. Product Reliability & Performance', trend: generateTrendData(), stats: generateRandomStats() },
    { name: '5. Pricing & Value for Money', trend: generateTrendData(), stats: generateRandomStats() },
    { name: '6. Brand Trust & Reputation', trend: generateTrendData(), stats: generateRandomStats() },
    { name: '7. Complaint Resolution & Support', trend: generateTrendData(), stats: generateRandomStats() },
    { name: '8. Loyalty & Retention', trend: generateTrendData(), stats: generateRandomStats() },
    { name: '9. Personalization & Customization', trend: generateTrendData(), stats: generateRandomStats() },
    { name: '10. Corporate Social Responsibility', trend: generateTrendData(), stats: generateRandomStats() },
];

    // Pie Chart Data
    const pieData = [
        { name: 'Positive', value: 50 },
        { name: 'Negative', value: 15 },
        { name: 'Mixed', value: 10 },
        { name: 'Neutral', value: 25 },
    ];
    const COLORS = ['#A5D6A7', '#FF9A9A', '#FFE082', '#90CAF9'];

    return (
        <div className="insights-container">
            {/* Metrics Row */}
            <div className="metrics-row">
                {metrics.map((metric, index) => (
                    <div className="metric-card" key={index}>
                        <div className="metric-icon">{metric.icon}</div>
                        <div className="metric-content">
                            <div className="metric-label">{metric.label}</div>
                            <div className="metric-value">{metric.value}</div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Tab Options */}
            <div className="tab-strip">
                {tabOptions.map((tab, index) => (
                    <button
                        key={index}
                        className={`tab-button ${index === 0 ? 'active' : ''}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Main Content Area (Grid Layout) */}
            <div className="main-content-grid">
                {/* Topic Table */}
                <div className="topic-table-card">
                    <div className="card-header">
                        <h3>Topic Table</h3>
                    </div>
                    <div className="table-wrapper">
                        <table className="topic-table">
                            <thead>
                                <tr>
                                    <th>Topics</th>
                                    <th>Trend</th>
                                    <th>Stats</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topicTableData.map((topic, index) => (
                                    <tr key={index}>
                                        <td>{topic.name}</td>
                                        <td>
                                            <ResponsiveContainer width={100} height={30}>
                                                <LineChart data={topic.trend}>
                                                    <Line type="monotone" dataKey="y" stroke="#2196F3" strokeWidth={2} dot={false} />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </td>
                                        <td>
                                            <div className="stats-bar-wrapper">
                                                <div className="stats-bar green-bar" style={{ width: `${topic.stats}%` }}></div>
                                                <div className="stats-bar red-bar" style={{ width: `${100 - topic.stats}%` }}></div>
                                            </div>
                                            <div className="stats-text">
                                                <span className="green-text">{topic.stats}%</span>
                                                <span className="red-text">{100 - topic.stats}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bubble Chart */}
                <div className="topics-chart-card">
                    <div className="card-header">
                        <h3>Topics (Bubble Chart)</h3>
                    </div>
                    {bubbleChart ? (
                        <Plot
                            data={bubbleChart.data}
                            layout={bubbleChart.layout}
                            style={{ width: "100%", height: "400px" }}
                            config={{ displayModeBar: false }} // Hide Toolbar
                            onClick={handleBubbleClick} // Click event updates Sankey chart
                        />
                    ) : (
                        <p>Loading Bubble Chart...</p>
                    )}
                </div>

                {/* Sankey Chart - Only Show when a product is selected */}
                {selectedProduct && (
                    <div className="chart-container">
                        <h3>Sentiment Analysis for {selectedProduct}</h3>
                        {sankeyChart ? (
                            <Plot
                                data={sankeyChart.data}
                                layout={sankeyChart.layout}
                                style={{ width: "100%", height: "400px" }}
                                config={{ displayModeBar: false }} // Hide Toolbar
                            />
                        ) : (
                            <p>Loading Sankey Chart...</p>
                        )}
                    </div>
                )}
                {/* Concerning Points */}
                <div className="concerning-points-card">
                    <div className="card-header">
                        <h3>Concerning Points</h3>
                    </div>
                    <ul>
                        {concerningPoints.map((point, index) => (
                            <li key={index}>{`${index + 1}. ${point}`}</li>
                        ))}
                    </ul>
                </div>

                {/* Sentiment Ratio (Pie Chart) */}
                <div className="sentiment-ratio-card">
                    <div className="card-header">
                        <h3>Sentiment Ratio</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend layout="vertical" align="right" verticalAlign="middle" />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                
            </div>
        </div>
    );
};

export default SurveyInsights;
