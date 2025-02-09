const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const surveyRoutes = require('./routes/surveyroutes');
app.use('/api/surveys', surveyRoutes);
app.get('/', (req, res) => {
    res.send('Survey Backend API is Running...');
});


module.exports = app;
