const express = require('express');
const router = express.Router();
const connection = require('../Config/db.js');

// Route to handle form submission
router.post('/', async(req, res) => {
    try{
        const { name, email, phone, company_name, message } = req.body;
        console.log(req.body)

        const insertQuery = `
            INSERT INTO forms (name, email, phone, company_name, message)
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const values = [name, email, phone, company_name, message];

        connection.query(insertQuery, values, (err, result) => {
            if (err) {
                console.error('Error inserting form data:', err);
                res.status(500).send('Error submitting form');
            }
            else {
                console.log('Form submitted:', result);
                res.status(200).send('Form submitted successfully');
            }
        });
    }
    catch(err){
        console.log(err)
    }
});

module.exports = router;
