const pool = require('../Config/db.js');

// Function to create a new form submission
const createFormSubmission = ({ name, email, phoneNo, message }) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO submissions (name, email, phone_no, message) VALUES (?, ?, ?, ?)',
            [name, email, phoneNo, message],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            }
        );
    });
};

// Example function to fetch all form submissions (not used in previous example)
const getAllSubmissions = () => {
    return new Promise((resolve, reject) => {
        pool.query(
            'SELECT * FROM submissions',
            (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            }
        );
    });
};

module.exports = {
    createFormSubmission,
    getAllSubmissions,
};
