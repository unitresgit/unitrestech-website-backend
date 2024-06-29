const express = require('express');
const bodyParser = require('body-parser');
const FormRoute = require('./Routes/FormRoute.js');
const CareerRoute = require('./Routes/CareerRoute.js'); 
const APIGatewayFormRoute = require('./Routes/APIGatewayFormRoute.js'); 
const client = require("./Config/db2.js");
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
app.use('/api/form', FormRoute);
app.use('/api/career', CareerRoute);
app.use("/apigateway/form", APIGatewayFormRoute);

// Default route
app.get("/", (req, res) => {
    res.send("Hello server");
});

// Function to create the 'forms' table if it doesn't exist
function createFormsTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS forms (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(20),
          company_name VARCHAR(255),
          message TEXT
      )
    `;
  
    client.query(createTableQuery, (err, result) => {
      if (err) {
        console.error('Error creating forms table:', err);
      } else {
        console.log('Forms table created successfully');
      }
    });
  }

  //career 
  function createCareersTable() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS careers (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            job_positions INT NOT NULL,
            type VARCHAR(50) NOT NULL,
            site VARCHAR(50) NOT NULL,
            job_description TEXT,
            responsibilities TEXT,
            candidate_requirements TEXT,
            is_open BOOLEAN DEFAULT true,
            is_show BOOLEAN DEFAULT true
        )
    `;

    client.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error creating careers table:', err);
        }
        else {
            console.log('Careers table created successfully');
        }
    });
}

// APIGateway
function createAPIGatewayFormTable() {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS APIGatewayForm (
          email VARCHAR(255) NOT NULL
      )
  `;

  client.query(createTableQuery, (err, result) => {
      if (err) {
          console.error('Error creating APIGatewayForm table:', err);
      } else {
          console.log('APIGatewayForm table created successfully');
      }
  });
}

// Starting server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    if(client){
        createFormsTable();
        createCareersTable();
        createAPIGatewayFormTable();
    }
    else{
        console.error('Error connecting to database:');
    }
});
