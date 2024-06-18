const express = require('express');
const bodyParser = require('body-parser');
const FormRoute = require('./Routes/FormRoute.js');
const connection = require("./Config/db.js");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/form', FormRoute);
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello server")
})

function createTable() {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS forms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        company_name VARCHAR(255),
        message TEXT
    )
    `;

    connection.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error creating forms table:', err);
        }
        else {
            console.log('Forms table created successfully');
        }
    });
}

// Start the server and create the table
app.listen(port, () => {
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
        } else {
            console.log('Connected to database');
            createTable();
        }
    });
    console.log(`Server running on port ${port}`);
});
