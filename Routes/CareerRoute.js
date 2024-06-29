const express = require('express');
const router = express.Router();
const client = require('../Config/db2.js');

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
                job_positions,
                type,
                site,
                job_description,
                responsibilities,
                candidate_requirements,
                is_open,
                is_show
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `;

        const values = [
            name,
            location,
            Job_Positions,
            Type,
            site,
            Job_Description,
            JSON.stringify(Responsibilities), 
            JSON.stringify(Candidate_Requirements),
            isOpen,
            isShow
        ];

        await client.query(insertQuery, values);
        console.log('Career submitted successfully');
        res.status(200).send('Career submitted successfully');
    }
    catch (err) {
        console.error('Error inserting career data:', err);
        res.status(500).send('Error submitting career');
    }
});

// Route to handle GET request to retrieve all careers
router.get('/', async (req, res) => {
    try {
        const selectQuery = `
            SELECT * FROM careers
        `;
        
        const { rows } = await client.query(selectQuery);
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error retrieving careers:', err);
        res.status(500).send('Error retrieving careers');
    }
});

module.exports = router;
