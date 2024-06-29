const express = require('express');
const router = express.Router();
const client = require('../Config/db2.js');

// Route to handle form submission
router.post('/', async (req, res) => {
    try {
      const { name, email, phone, company_name, message } = req.body;
      console.log(req.body);
  
      const insertQuery = `
        INSERT INTO forms (name, email, phone, company_name, message)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
  
      const values = [name, email, phone, company_name, message];
  
      const result = await client.query(insertQuery, values);
      console.log('Form submitted:', result.rows[0]);
      res.status(200).send('Form submitted successfully');
    }
    catch (err) {
      console.error('Error inserting form data:', err);
      res.status(500).send('Error submitting form');
    }
  });

module.exports = router;
