const express = require('express');
const router = express.Router();
const connection = require('../Config/db.js');

// Route to handle form submission
router.post('/', async(req, res) => {
    try{
        const {email} = req.body;
        console.log(req.body)

        const insertQuery = `
            INSERT INTO APIGatewayForm (email)
            VALUES (?)
        `;
        
        const values = [email];

        connection.query(insertQuery, values, (err, result) => {
            if (err) {
                console.error('Error inserting APIGatewayForm data:', err);
                res.status(500).send('Error submitting APIGatewayForm');
            }
            else {
                console.log('APIGatewayForm submitted:', result);
                res.status(200).send('APIGatewayForm submitted successfully');
            }
        });
    }
    catch(err){
        console.log(err)
    }
});

router.get('/', async (req, res) => {
    try {
        const selectQuery = `
            SELECT * FROM APIGatewayForm
        `;
        
        connection.query(selectQuery, (err, results) => {
            if (err) {
                console.error('Error retrieving APIGatewayForm:', err);
                res.status(500).send('Error retrieving APIGatewayForm');
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
