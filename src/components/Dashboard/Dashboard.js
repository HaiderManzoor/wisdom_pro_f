import React from 'react';
import './Dashboard.css';
import SurveyCard from '../SurveyCard/SurveyCard';
import { ReactComponent as MessageIcon } from '../../assets/message-icon.svg';
// import { FaBell } from 'react-icons/fa';
const Dashboard = () => {
  const surveyData = [
    {
      title: "Client Feedback Survey",
      date: "01/28/2025"
    },
    {
      title: "Employee Engagement Template",
      date: "01/28/2025"
    },
    {
      title: "Client Feedback Survey",
      date: "01/28/2025"
    },
    {
      title: "Employee Engagement Template",
      date: "01/28/2025"
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h2>Welcome User!</h2>
          <p>Turn Survey Into Actionable Insights</p>
        </div>
        <button className="create-survey-btn">
          <span>+</span> Create New Survey
        </button>
      </div>
      
      <div className="stats-container">
        <div className="stat-card">
          <MessageIcon className="message-icon" />
          <div>
            <p>Total conversation</p>
            <h3>10</h3>
          </div>
        </div>
        <div className="stat-card">
          <MessageIcon className="message-icon" />
          <div>
            <p>Total conversation</p>
            <h3>10</h3>
          </div>
        </div>
        <div className="stat-card">
          <MessageIcon className="message-icon" />
          <div>
            <p>Total conversation</p>
            <h3>10</h3>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <div className="search-box">
          <input type="text" placeholder="Search" />
        </div>
        <div className="filter-box">
          <select defaultValue="Status: All">
            <option>Status: All</option>
          </select>
        </div>
        <div className="filter-box">
          <select defaultValue="Owner: All">
            <option>Owner: All</option>
          </select>
        </div>
        <div className="view-toggle">
          <button className="list-view active">☰</button>
          <button className="grid-view">⊞</button>
        </div>
      </div>

      {/* Only one "survey-cards" div here */}
      <div className="survey-cards">
        {surveyData.map((survey, index) => (
          <SurveyCard 
            key={index}
            title={survey.title}
            date={survey.date}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
