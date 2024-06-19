const express = require('express');
const router = express.Router();
const connection = require('../Config/db.js');

// Route to handle POST request to add a new career
router.post('/', async (req, res) => {
    try {
        const {
            name,
            location,
            Job_Positions,
            Type,
            site,
            Job_Description,
            Responsibilities,
            Candidate_Requirements,
            isOpen,
            isShow
        } = req.body;

        const insertQuery = `
            INSERT INTO careers (
                name,
                location,
                Job_Positions,
                Type,
                site,
                Job_Description,
                Responsibilities,
                Candidate_Requirements,
                isOpen,
                isShow
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            name,
            location,
            Job_Positions,
            Type,
            site,
            Job_Description,
            JSON.stringify(Responsibilities), // Convert to JSON string
            JSON.stringify(Candidate_Requirements), // Convert to JSON string
            isOpen,
            isShow
        ];

        connection.query(insertQuery, values, (err, result) => {
            if (err) {
                console.error('Error inserting career data:', err);
                res.status(500).send('Error submitting career');
            } else {
                console.log('Career submitted:', result);
                res.status(200).send('Career submitted successfully');
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to handle GET request to retrieve all careers
router.get('/', async (req, res) => {
    try {
        const selectQuery = `
            SELECT * FROM careers
        `;
        
        connection.query(selectQuery, (err, results) => {
            if (err) {
                console.error('Error retrieving careers:', err);
                res.status(500).send('Error retrieving careers');
            } else {
                res.status(200).json(results);
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
