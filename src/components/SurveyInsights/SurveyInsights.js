import React from 'react';
import {
  PieChart, Pie,
  BarChart, Bar,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell 
} from 'recharts';
import './SurveyInsights.css';

const SurveyInsights = () => {
  // Dummy data for charts
  const pieData = [
    { name: 'Remote', value: 35 },
    { name: 'Hybrid', value: 45 },
    { name: 'On-site', value: 20 }
  ];

  const satisfactionData = [
    { name: 'Satisfied', value: 65 },
    { name: 'Neutral', value: 25 },
    { name: 'Unsatisfied', value: 10 }
  ];

  const barData = [
    {
      category: 'Communication',
      Current: 85,
      Previous: 70,
    },
    {
      category: 'Work-Life Balance',
      Current: 65,
      Previous: 60,
    },
    {
      category: 'Resources',
      Current: 75,
      Previous: 65,
    }
  ];

  const COLORS = ['#7B938A', '#D6B981', '#B5C4B1'];

  return (
    <div className="insights-container">
      <div className="insights-header">
        <div className="header-left">
          <h1>Survey Insights</h1>
          <div>
          <p>Turn Survey Into Actionable Insights</p></div>
        </div>
        <button className="create-survey-btn">
          + Create New Survey
        </button>
      </div>

      <div className="charts-grid">
        {/* First Row */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Q1. What is the office environment?</h3>
            <button className="expand-btn">→</button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Q2. Overall satisfaction level?</h3>
            <button className="expand-btn">→</button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={satisfactionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {satisfactionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Q3. Department performance metrics</h3>
            <button className="expand-btn">→</button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Current" fill="#7B938A" />
              <Bar dataKey="Previous" fill="#D6B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Second Row - Similar charts with different data */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Q4. Team collaboration score</h3>
            <button className="expand-btn">→</button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'High', value: 45 },
                  { name: 'Medium', value: 35 },
                  { name: 'Low', value: 20 }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Q5. Resource utilization</h3>
            <button className="expand-btn">→</button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { category: 'Tools', Current: 80, Previous: 65 },
              { category: 'Training', Current: 70, Previous: 55 },
              { category: 'Support', Current: 85, Previous: 70 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Current" fill="#7B938A" />
              <Bar dataKey="Previous" fill="#D6B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Q6. Employee engagement</h3>
            <button className="expand-btn">→</button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'High', value: 55 },
                  { name: 'Medium', value: 30 },
                  { name: 'Low', value: 15 }
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SurveyInsights;