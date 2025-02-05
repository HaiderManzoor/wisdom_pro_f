// import React from 'react';
// import {
//   LineChart, Line, ScatterChart, Scatter,
//   XAxis, YAxis, CartesianGrid, Tooltip,
//   PieChart, Pie, Cell,
//   ResponsiveContainer
// } from 'recharts';
// import './SurveyInsights.css';

// const SurveyInsights = () => {
//   // Metrics data with exact values from image
//   const metrics = [
//     { icon: "📊", label: "Total Responses", value: "10" },
//     { icon: "⏱", label: "Time Spent (Average)", value: "15s" },
//     { icon: "📈", label: "Positive Responses", value: "65%" },
//     { icon: "📉", label: "Negative Responses", value: "34%" }
//   ];

//   // Tab options exactly as shown
//   const tabOptions = ['Overall View', 'Sub topics', 'Growth intensity'];

//   // Generate dummy data for trend lines
//   const generateTrendData = () => Array(20).fill().map((_, i) => ({
//     x: i,
//     y: Math.sin(i * 0.3) * 10 + 50
//   }));

//   // Topic table data with varying stats lengths
//   const topicTableData = [
//     { name: '1. Product', trend: generateTrendData(), stats: 15 },
//     { name: '1. Product', trend: generateTrendData(), stats: 45 },
//     { name: '1. Product', trend: generateTrendData(), stats: 75 },
//     { name: '1. Product', trend: generateTrendData(), stats: 95 },
//     { name: '1. Product', trend: generateTrendData(), stats: 25 },
//     { name: '1. Product', trend: generateTrendData(), stats: 60 },
//     { name: '1. Product', trend: generateTrendData(), stats: 80 }
//   ];

//   // Scatter plot data matching exactly with image
//   const scatterData = [
//     { x: 20, y: 60, color: '#FF9A9A' },
//     { x: 40, y: 40, color: '#A5D6A7' },
//     { x: 60, y: 70, color: '#FF9A9A' },
//     { x: 70, y: 35, color: '#A5D6A7' },
//     { x: 80, y: 50, color: '#FF9A9A' },
//     { x: 90, y: 25, color: '#A5D6A7' }
//   ];

//   // Concerning points
//   const concerningPoints = [
//     'Work-Life Balance Issues, Long hours, high stress.',
//     'Career Growth Concerns, Limited training, slow promotions.',
//     'Poor Communication',
//     'Misunderstanding/unclear instructions',
//     'Low Employee Morale (lack of recognition, motivation)',
//     'High Turnover Rate - Frequent resignations, dissatisfaction.'
//   ];

//   return (
//     <div className="insights-container">
//       {/* Metrics Row */}
//       <div className="metrics-row">
//         {metrics.map((metric, index) => (
//           <div key={index} className="metric-card">
//             <div className="metric-icon">{metric.icon}</div>
//             <div className="metric-content">
//               <div className="metric-label">{metric.label}</div>
//               <div className="metric-value">{metric.value}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Tab Options */}
//       <div className="tab-strip">
//         {tabOptions.map((tab, index) => (
//           <button 
//             key={index} 
//             className={`tab-button ${index === 0 ? 'active' : ''}`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Topic Table */}
//       <div className="topic-table">
//         <div className="table-header">
//           <div className="header-left">Topic Table</div>
//           <div className="header-right">
//             <span>Topics</span>
//             <span>Trend</span>
//             <span>Stats</span>
//           </div>
//         </div>
//         <div className="table-content">
//           {topicTableData.map((topic, index) => (
//             <div key={index} className="table-row">
//               <div className="topic-name">{topic.name}</div>
//               <div className="trend-chart">
//                 <ResponsiveContainer width={100} height={20}>
//                   <LineChart data={topic.trend}>
//                     <Line 
//                       type="monotone" 
//                       dataKey="y" 
//                       stroke="#2196F3" 
//                       dot={false}
//                       strokeWidth={1}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="stats-bar-wrapper">
//                 <div 
//                   className="stats-bar"
//                   style={{ width: `${topic.stats}%` }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Topics Scatter Plot */}
//       <div className="topics-chart">
//         <div className="card-header">
//           <h3>Topics</h3>
//           <span className="trending-label">Trending Topics →</span>
//         </div>
//         <ResponsiveContainer width="100%" height={300}>
//           <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis type="number" domain={[0, 100]} />
//             <YAxis type="number" domain={[0, 100]} />
//             <Scatter data={scatterData}>
//               {scatterData.map((entry, index) => (
//                 <Cell key={index} fill={entry.color} />
//               ))}
//             </Scatter>
//           </ScatterChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Concerning Points */}
//       <div className="concerning-points">
//         <div className="card-header">
//           <h3>concerning points</h3>
//           <span className="arrow">→</span>
//         </div>
//         <ul>
//           {concerningPoints.map((point, index) => (
//             <li key={index}>{`${index + 1}. ${point}`}</li>
//           ))}
//         </ul>
//       </div>

//       {/* Sentiment Ratio */}
//       <div className="sentiment-ratio">
//         <div className="card-header">
//           <h3>Sentiment Ratio</h3>
//         </div>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={[
//                 { name: 'Positive', value: 45, color: '#A5D6A7' },
//                 { name: 'Negative', value: 35, color: '#FF9A9A' },
//                 { name: 'Neutral', value: 20, color: '#FFE082' }
//               ]}
//               innerRadius={60}
//               outerRadius={80}
//               paddingAngle={2}
//               dataKey="value"
//             >
//               {(entry, index) => (
//                 <Cell key={index} fill={entry.color} />
//               )}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default SurveyInsights;
import React from 'react';
import {
    LineChart, Line, ScatterChart, Scatter,
    XAxis, YAxis, CartesianGrid, Tooltip,
    PieChart, Pie, Cell,
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

    // Generate dummy data for trend lines
    const generateTrendData = () => Array(20).fill().map((_, i) => ({
        x: i,
        y: Math.sin(i * 0.3) * 10 + 50
    }));

    // Topic table data with varying stats lengths
    const topicTableData = [
        { name: '1. Product', trend: generateTrendData(), stats: 67 },
        { name: '1. Product', trend: generateTrendData(), stats: 67 },
        { name: '1. Product', trend: generateTrendData(), stats: 67 },
        { name: '1. Product', trend: generateTrendData(), stats: 67 },
        { name: '1. Product', trend: generateTrendData(), stats: 67 },
        { name: '1. Product', trend: generateTrendData(), stats: 67 },
        { name: '1. Product', trend: generateTrendData(), stats: 67 },
        { name: '1. Product', trend: generateTrendData(), stats: 67 },
        { name: '1. Product', trend: generateTrendData(), stats: 67 },
        { name: '1. Product', trend: generateTrendData(), stats: 67 },
        { name: '1. Product', trend: generateTrendData(), stats: 67 },
        { name: '1. Product', trend: generateTrendData(), stats: 67 }
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
        <div className="dashboard-container">
            {/* Metrics Section */}
            <div className="metrics-section">
                {metrics.map((metric, index) => (
                    <div className="metric-box" key={index}>
                        <h3>{metric.label}</h3>
                        <p>{metric.value}</p>
                    </div>
                ))}
            </div>

            {/* Tab Section */}
            <div className="tab-section">
                {tabOptions.map((tab, index) => (
                    <button className={`tab ${index === 0 ? 'active' : ''}`} key={index}>{tab}</button>
                ))}
            </div>

            {/* Content Section */}
            <div className="content-section">
                {/* Topic Table */}
                <div className="topic-table">
                    <h2>Topic Table</h2>
                    <div className="table-content">
                        <div className="table-header">
                            <span>Topics</span>
                            <span>Trend</span>
                            <span>Stats</span>
                        </div>
                        {topicTableData.map((topic, index) => (
                            <div className="table-row" key={index}>
                                <span>{topic.name}</span>
                                <ResponsiveContainer width={100} height={30}>
                                    <LineChart data={topic.trend}>
                                        <Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                                <div className="stats-bar-wrapper">
                                    <div className="stats-bar" style={{ width: `${topic.stats}%`, backgroundColor: topic.stats >= 50 ? '#4CAF50' : '#F44336' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Topics Chart */}
                <div className="topics-chart">
                    <h2>Topics</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" dataKey="x" name="X" domain={[-100, 100]} />
                            <YAxis type="number" dataKey="y" name="Y" domain={[-100, 100]} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter name="Product" data={scatterData} fill="#8884d8">
                                {
                                    scatterData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))
                                }
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="concerning-points" style={{ width: '48%', marginTop: '20px' }}>
                <h3>Concerning Points</h3>
                <ul>
                    {concerningPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>

            {/* Sentiment Analysis Chart */}
            <div className="sentiment-chart" style={{ width: '48%', marginTop: '20px' }}>
                <h3>Sentiment Ratio</h3>
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
                            {
                                pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))
                            }
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SurveyInsights;