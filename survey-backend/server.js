const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const surveyRoutes = require('./routes/surveyroutes');  // ✅ Ensure correct import
app.use('/api/surveys/', surveyRoutes); // ✅ Ensure correct route prefix

app.get('/', (req, res) => {
    res.send('Survey Backend API is Running...');
});

app.listen(5000, () => {
    console.log("🚀 Server is running on http://localhost:5000");
});
