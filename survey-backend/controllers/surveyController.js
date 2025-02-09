        const supabase = require('../config/supaBaseClient');

        // ✅ CREATE A NEW SURVEY
        // 
        const createSurvey = async (req, res) => {
            const { title, questions } = req.body;
            
            if (!title || !questions) {
                return res.status(400).json({ error: "Survey title and questions are required." });
            }

            // ✅ Insert without specifying ID (Supabase auto-generates it)
            const { data, error } = await supabase
                .from('surveys')
                .insert([{ title, questions, status: 'draft' }])
                .select(); 

            if (error) {
                console.error("❌ Error creating survey:", error);
                return res.status(500).json({ error: error.message });
            }

            console.log("✅ Survey Created with ID:", data[0].id);
            res.status(201).json({ survey: data[0] }); 
        };



        // ✅ SUBMIT SURVEY RESPONSE
        const submitSurvey = async (req, res) => {
            // const { surveyId } = req.params;
            // const { responses } = req.body;

            // // if (!surveyId) {
            // //     console.error("❌ Missing surveyId in request!");
            // //     return res.status(400).json({ error: "Survey ID is required." });
            // // }

            // if (!responses || responses.length === 0) {
            //     console.error("❌ Missing responses in request!");
            //     return res.status(400).json({ error: "Responses are required." });
            // }

            // console.log("📨 Received submission:", { surveyId, responses });

            // const { data, error } = await supabase
            //     .from('survey_responses')
            //     .insert([{ answers: responses }]);

            // if (error) {
            //     console.error("❌ Supabase Error:", error);
            //     return res.status(500).json({ error: error.message });
            // }

            console.log("✅ Survey Submitted Successfully:");
            // res.status(201).json({ message: 'Survey submitted successfully' });
        };



        // ✅ GET ALL SURVEYS
        const getSurveys = async (req, res) => {
            // const { data, error } = await supabase.from('surveys').select('*');

            // if (error) {
            //     console.error("❌ Error fetching surveys:", error);
            //     return res.status(500).json({ error: error.message });
            // }

            // res.status(200).json({ surveys: data });\
            // res.status(200).json({ surveys: data });
            console.log("🔍 Fetching surveys...");

        };

        module.exports = { createSurvey, submitSurvey, getSurveys };
