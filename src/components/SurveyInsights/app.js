import React from 'react';
import {
    LineChart, Line, ScatterChart, Scatter,
    XAxis, YAxis, CartesianGrid, Tooltip,
    PieChart, Pie, Cell, Legend,
    ResponsiveContainer
} from 'recharts';
import './SurveyInsights.css';

const SurveyInsights = () => {
    // Metrics data with exact values from image
    const metrics = [
        { icon: "📊", label: "Total Responses", value: "10" },
        { icon: "⏱", label: "Time Spent (Average)", value: "18s" },
        { icon: "📈", label: "Positive Responses", value: "65%" },
        { icon: "📉", label: "Negative Responses", value: "34%" }
    ];

    // Tab options exactly as shown
    const tabOptions = ['Overall View', 'Sub topics', 'Growth intensity'];


const generateTrendData = () => Array.from({ length: 20 }, (_, i) => ({
  x: i,
  y: Math.sin(i * 0.5) * 10 + Math.random() * 15 + 40  // More randomness for variation
}));


    // Topic table data with varying stats lengths
    const topicTableData = [
        { name: '1. Product', trend: generateTrendData(), stats: 67 },
        { name: '2. Product', trend: generateTrendData(), stats: 67 },
        { name: '3. Product', trend: generateTrendData(), stats: 67 },
        { name: '4. Product', trend: generateTrendData(), stats: 67 },
        { name: '5. Product', trend: generateTrendData(), stats: 67 },
        { name: '6. Product', trend: generateTrendData(), stats: 67 },
        { name: '7. Product', trend: generateTrendData(), stats: 67 },
        { name: '8. Product', trend: generateTrendData(), stats: 67 },
        { name: '9. Product', trend: generateTrendData(), stats: 67 },
        { name: '10. Product', trend: generateTrendData(), stats: 67 },

    ];

    // Scatter plot data matching exactly with image
    const scatterData = [
        { x: -80, y: -20, color: '#FF9A9A', label: 'Product' },
        { x: -40, y: 40, color: '#A5D6A7', label: 'Product' },
        { x: -40, y: -60, color: '#FF9A9A', label: 'Product' },
        { x: 0, y: -80, color: '#A5D6A7', label: 'Product' },
        { x: 20, y: 60, color: '#FF9A9A', label: 'Product' },
        { x: 30, y: 50, color: '#A5D6A7', label: 'Product' },
        { x: 60, y: -20, color: '#FF9A9A', label: 'Product' },
        { x: 70, y: 35, color: '#A5D6A7', label: 'Product' },
        { x: 80, y: 50, color: '#FF9A9A', label: 'Product' },
        { x: 80, y: -60, color: '#A5D6A7', label: 'Product' },
        { x: 100, y: 80, color: '#FF9A9A', label: 'Product' },
        { x: -100, y: 100, color: '#A5D6A7', label: 'Product' },
        { x: -100, y: -100, color: '#FF9A9A', label: 'Product' },
    ];

    // Concerning points
    const concerningPoints = [
        'Work-Life Balance Issues, Long hours, high stress.',
        'Career Growth Concerns, Limited training, slow promotions.',
        'Poor Communication',
        'Misunderstanding/unclear instructions',
        'Low Employee Morale (lack of recognition, motivation)',
        'High Turnover Rate - Frequent resignations, dissatisfaction.'
    ];

    const COLORS = ['#A5D6A7', '#FF9A9A', '#FFE082', '#90CAF9'];

    const pieData = [
        { name: 'Positive', value: 50 },
        { name: 'Negative', value: 15 },
        { name: 'Mixed', value: 10 },
        { name: 'Neutral', value: 25 },
    ];
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

      {/* Topics Scatter Plot */}
<div className="topics-chart-card">
    <div className="card-header">
        <h3>Topics</h3>
        <select className="trending-dropdown">
            <option>Trending Topics</option>
        </select>
    </div>
    <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
                type="number" 
                dataKey="x" 
                domain={[-100, 100]} 
                tick={{ fontSize: 12 }} 
            />
            <YAxis 
                type="number" 
                dataKey="y" 
                domain={[-100, 100]} 
                tick={{ fontSize: 12 }} 
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />

            {/* Scatter Plot with Random Circle Sizes & Colors */}
            <Scatter name="Product" data={scatterData}>
                {scatterData.map((entry, index) => (
                    <circle
                        key={`circle-${index}`}
                        cx={entry.x}
                        cy={entry.y}
                        r={entry.size} // Random circle size
                        fill={entry.color} // Different colors
                        opacity="0.7"
                    />
                ))}
            </Scatter>

            {/* Labels Below Each Circle */}
            {scatterData.map((entry, index) => (
                <text
                    key={`label-${index}`}
                    x={entry.x}
                    y={entry.y + entry.size + 8} // Positioned below the circle
                    textAnchor="middle"
                    fontSize="12"
                    fill="#333"
                >
                    {entry.label}
                </text>
            ))}
        </ScatterChart>
    </ResponsiveContainer>
</div>






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

                {/* Sentiment Ratio */}
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