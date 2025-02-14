import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import SurveyCard from '../SurveyCard/SurveyCard';
import { ReactComponent as MessageIcon } from '../../assets/message-icon.svg';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseClient';

const Dashboard = () => {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSurveys, setFilteredSurveys] = useState([]);
  const [totalResponses, setTotalResponses] = useState(0); // ✅ NEW: State for total responses

  // Fetch surveys from Supabase
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const { data, error } = await supabase
          .from('surveys')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setSurveys(data);
        setFilteredSurveys(data);
      } catch (error) {
        console.error('Error fetching surveys:', error);
      }
    };

    fetchSurveys();
  }, []);

  // ✅ NEW: Fetch total responses count from Supabase
  useEffect(() => {
    const fetchTotalResponses = async () => {
      try {
        const { count, error } = await supabase
          .from('responses')
          .select('*', { count: 'exact', head: true }); // Fetches only count

        if (error) throw error;
        setTotalResponses(count);
      } catch (error) {
        console.error('Error fetching total responses:', error);
      }
    };

    fetchTotalResponses();
  }, []);

  // Filter surveys based on search input
  useEffect(() => {
    if (!searchQuery) {
      setFilteredSurveys(surveys);
    } else {
      const filtered = surveys.filter((survey) =>
        survey.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSurveys(filtered);
    }
  }, [searchQuery, surveys]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h2>Welcome User!</h2>
          <p>Turn Survey Into Actionable Insights</p>
        </div>
        <button className="create-survey-btn" onClick={() => navigate('/create-survey')}>
          <span>+</span> Create New Survey
        </button>
      </div>

      {/* Stats Container */}
      <div className="stats-container">
        <div className="stat-card">
          <MessageIcon className="message-icon" />
          <div>
            <p>Total Surveys Created</p>
            <h3>{surveys.length}</h3>
          </div>
        </div>
        <div className="stat-card">
          <MessageIcon className="message-icon" />
          <div>
            <p>Total Responses Submitted</p>
            <h3>{totalResponses}</h3> {/* ✅ FIXED: Displays correct response count */}
          </div>
        </div>
        <div className="stat-card">
          <MessageIcon className="message-icon" />
          <div>
            <p>Most Recent Survey</p>
            <h3>{surveys.length > 0 ? surveys[0].title : 'No Surveys Yet'}</h3>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search Survey..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
      </div>

      {/* Surveys List */}
      <div className="survey-cards">
        {filteredSurveys.length > 0 ? (
          filteredSurveys.map((survey, index) => (
            <SurveyCard key={index} title={survey.title} date={survey.created_at} />
          ))
        ) : (
          <p>No surveys found</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
