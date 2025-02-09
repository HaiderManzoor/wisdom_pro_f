const express = require('express');
const router = express.Router();
const { createSurvey, submitSurvey, getSurveys } = require('../controllers/surveyController');

router.post('/', createSurvey); 
router.post('submit/', submitSurvey);
router.get('/abc', getSurveys);

module.exports = router;
