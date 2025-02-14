import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import Modal from 'react-modal';

import {
    LineChart, Line, PieChart, Pie, Cell, Tooltip, Legend,
    ResponsiveContainer
} from 'recharts';
import './SurveyInsights.css';

const SurveyInsights = () => {
    const [bubbleChart, setBubbleChart] = useState(null);
    const [sankeyChart, setSankeyChart] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [concerningPointsData, setConcerningPointsData] = useState([])



    const [isModalOpen, setIsModalOpen] = useState(false);

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
          setIsModalOpen(true);  // Open modal when a bubble is clicked
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
    useEffect(() => {
      const defaultTopic = "Customer Satisfaction";  // Set a default topic
      setSelectedTopic(defaultTopic);
      setConcerningPointsData(concerningPointsMapping[defaultTopic]);
  }, []);
  

  const concerningPointsMapping = {
    "Customer Satisfaction": [
        "Long waiting time for responses",
        "Unhelpful customer service",
        "Lack of personalized experience",
        "Limited self-service options",
        "Difficult refund process",
        "Poor follow-up on complaints"
    ],
    "Service Quality": [
        "Inconsistent quality in service",
        "Lack of attention to detail",
        "Service delays and errors",
        "Untrained or inexperienced staff",
        "Failure to meet customer expectations",
        "Poor after-sales support"
    ],
    "Communication & Responsiveness": [
        "Slow email responses",
        "Lack of proactive communication",
        "Confusing information provided",
        "Difficulty reaching customer support",
        "Delayed responses on social media",
        "Miscommunication between departments"
    ],
    "Product Reliability & Performance": [
        "Frequent product failures",
        "Short product lifespan",
        "Performance issues in certain conditions",
        "Defective products being shipped",
        "Software/hardware compatibility issues",
        "Unclear product usage instructions"
    ],
    "Pricing & Value for Money": [
        "Overpriced compared to competitors",
        "Hidden charges and fees",
        "Poor refund policies",
        "Unjustified premium pricing",
        "Frequent price changes without notice",
        "Lack of discounts or loyalty rewards"
    ],
    "Brand Trust & Reputation": [
        "Negative brand perception",
        "Past controversies affecting trust",
        "Lack of transparency",
        "Low trust in data security",
        "Ethical concerns with business practices",
        "Inconsistent brand messaging"
    ],
    "Complaint Resolution & Support": [
        "Poor handling of complaints",
        "Delayed refunds and compensations",
        "Lack of empathy from support staff",
        "Customers having to repeat issues multiple times",
        "Long wait times for issue resolution",
        "No clear escalation process for unresolved complaints"
    ],
    "Loyalty & Retention": [
        "No rewards for loyal customers",
        "Frequent churn of long-term users",
        "Unattractive loyalty programs",
        "Lack of engagement with existing customers",
        "No exclusive benefits for returning customers",
        "Complicated membership or subscription processes"
    ],
    "Personalization & Customization": [
        "Lack of customization in services",
        "One-size-fits-all approach",
        "No tailored recommendations",
        "Failure to adapt to customer preferences",
        "Limited options for product personalization",
        "Generic customer interactions with no personal touch"
    ],
    "Corporate Social Responsibility": [
        "Environmental concerns",
        "Unethical supply chain practices",
        "Lack of social impact initiatives",
        "No involvement in community development",
        "Ignoring sustainability efforts",
        "Failure to address diversity and inclusion concerns"
    ]
};


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
                            config={{ displayModeBar: false }} 
                            onClick={handleBubbleClick} // Click event updates Sankey chart
                        />
                    ) : (
                        <p>Loading Bubble Chart...</p>
                    )}
                    <Modal 
    isOpen={isModalOpen} 
    onRequestClose={() => setIsModalOpen(false)}
    contentLabel="Sankey Chart"
    className="modal-content"
    overlayClassName="modal-overlay"
>
    <h2>Sentiment Analysis for {selectedProduct}</h2>
    {sankeyChart ? (
        <Plot
            data={sankeyChart.data}
            layout={sankeyChart.layout}
            style={{ width: "100%", height: "400px" }}
            config={{ displayModeBar: false }} 
        />
    ) : (
        <p>Loading Sankey Chart...</p>
    )}
    <button onClick={() => setIsModalOpen(false)}>Close</button>
</Modal>

                </div>
                <div className="topic-dropdown-container">
    <label htmlFor="topic-select">Select a Topic:</label>
    <select 
        id="topic-select" 
        value={selectedTopic} // Ensures the dropdown always reflects the selected topic
        onChange={(e) => {
            const selected = e.target.value;
            setSelectedTopic(selected);
            setConcerningPointsData(concerningPointsMapping[selected] || []);
        }}
    >
        {Object.keys(concerningPointsMapping).map((topic, index) => (
            <option key={index} value={topic}>{topic}</option>
        ))}
    </select>
    <div className="concerning-points-card">
    <div className="card-header">
        <h3>Concerning Points</h3>
    </div>
    <ul>
        {concerningPointsData.length > 0 ? (
            concerningPointsData.map((point, index) => (
                <li key={index}>{`${index + 1}. ${point}`}</li>
            ))
        ) : (
            <p>No concerning points available for this topic.</p>
        )}
    </ul>
</div>

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
            outerRadius={100}
            innerRadius={40} 
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`} // 🔥 Show percentage labels
        >
            {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
        <Legend layout="horizontal" align="center" verticalAlign="bottom" /> // 🔥 Move legend to bottom
        <Tooltip 
            contentStyle={{ backgroundColor: "#f5f5f5", borderRadius: "8px" }} // 🔥 Make tooltip modern
        />
    </PieChart>
</ResponsiveContainer>

                </div>
                
            </div>
        </div>
    );
};

export default SurveyInsights;
