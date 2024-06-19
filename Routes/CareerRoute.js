const express = require('express');
const router = express.Router();
const connection = require('../Config/db.js');

router.post('/', (req, res) => {
    try {
        const { name, email, phone, company_name, message } = req.body;

        const insertQuery = `
            INSERT INTO forms (name, email, phone, company_name, message)
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const values = [name, email, phone, company_name, message];

        connection.query(insertQuery, values, (err, result) => {
            if (err) {
                console.error('Error inserting form data:', err);
                return res.status(500).send('Error submitting form');
            }
            console.log('Form submitted:', result);
            res.status(200).send('Form submitted successfully');
        });
    } catch (err) {
        console.error('Error handling form submission:', err);
        res.status(500).send('Server error');
    }
});

router.get('/', (req, res) => {
    const selectQuery = `
        SELECT * FROM forms
    `;
    
    connection.query(selectQuery, (err, results) => {
        if (err) {
            console.error('Error fetching form submissions:', err);
            return res.status(500).send('Error fetching data');
        }
        res.status(200).json(results);
    });
});

module.exports = router;
