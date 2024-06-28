const express = require('express');
const bodyParser = require('body-parser');
const FormRoute = require('./Routes/FormRoute.js');
const CareerRoute = require('./Routes/CareerRoute.js'); 
const APIGatewayFormRoute = require('./Routes/APIGatewayFormRoute.js'); 
const connection = require("./Config/db.js");
require('dotenv').config();
const cors = require('cors');

const emailRoutes = require("./Routes/emailRoutes.js");

const app = express();
const port = process.env.PORT || 8081;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/email", emailRoutes);
app.use('/api/form', FormRoute); // Route for handling form submissions
app.use('/api/career', CareerRoute); // Route for handling career opportunities
app.use("/apigateway/form", APIGatewayFormRoute);

// Default route
app.get("/", (req, res) => {
    res.send("Hello server");
});

// Function to create the 'forms' table if it doesn't exist
function createFormsTable() {
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
        } else {
            console.log('Forms table created successfully');
        }
    });
}


function createCareersTable() {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS careers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        Job_Positions INT NOT NULL,
        Type VARCHAR(50) NOT NULL,
        site VARCHAR(50) NOT NULL,
        Job_Description TEXT,
        Responsibilities TEXT,
        Candidate_Requirements TEXT,
        isOpen BOOLEAN DEFAULT true,
        isShow BOOLEAN DEFAULT true
    )
    `;

    connection.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error creating careers table:', err);
        } else {
            console.log('Careers table created successfully');
        }
    });
}

// APIGateway
function APIGatewayTable() {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS APIGatewayForm (
        email VARCHAR(255) NOT NULL
    )
    `;

    connection.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error creating APIGatewayForm table:', err);
        } else {
            console.log('APIGatewayForm table created successfully');
        }
    });
}


// Connect to database and create necessary tables
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        console.log(process.env.DB_HOST);
        console.log(process.env.DB_USER);
    } else {
        console.log('Connected to database');
        createFormsTable(); // Ensure forms table is created
        createCareersTable(); // Ensure careers table is created
        APIGatewayTable();
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
