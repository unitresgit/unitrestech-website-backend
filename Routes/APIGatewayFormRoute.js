const express = require('express');
const router = express.Router();
const client = require('../Config/db2.js');

// Route to handle form submission
router.post('/', async (req, res) => {
    try {
        const { email } = req.body;

        const insertQuery = `
            INSERT INTO APIGatewayForm (email)
            VALUES ($1)
        `;

        const values = [email];

        await client.query(insertQuery, values);
        console.log('APIGatewayForm submitted successfully');
        res.status(200).send('APIGatewayForm submitted successfully');
    } catch (err) {
        console.error('Error inserting APIGatewayForm data:', err);
        res.status(500).send('Error submitting APIGatewayForm');
    }
});

// Route to handle GET request to retrieve all emails from APIGatewayForm
router.get('/', async (req, res) => {
    try {
        const selectQuery = `
            SELECT * FROM APIGatewayForm
        `;
        
        const { rows } = await client.query(selectQuery);
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error retrieving APIGatewayForm:', err);
        res.status(500).send('Error retrieving APIGatewayForm');
    }
})

module.exports = router;
