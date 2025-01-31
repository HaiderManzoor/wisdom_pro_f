import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import CreateSurvey from './components/CreateSurvey/CreateSurvey';
import SurveyForm from './components/SurveyForm/SurveyForm';
import SurveyBuilder from './components/SurveyBuilder/SurveyBuilder';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-survey" element={<CreateSurvey />} />
          <Route path="/survey-form" element={<SurveyForm />} />
          <Route path="/survey-builder" element={<SurveyBuilder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;