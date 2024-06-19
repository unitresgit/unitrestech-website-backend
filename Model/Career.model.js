const connection = require('../Config/db.js');

function addCareerEntry(data, callback) {
    const checkTableQuery = 'SELECT COUNT(*) as count FROM careers';
    connection.query(checkTableQuery, (err, result) => {
        if (err) {
            return callback(err);
        }

        const insertQuery = `
            INSERT INTO careers (name, location, Job_Positions, Type, site, Job_Description, Responsibilities, Candidate_Requirements, isOpen, isShow)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.name, 
            data.location, 
            data.job_positions, 
            data.type, 
            data.site, 
            data.job_description, 
            JSON.stringify(data.responsibilities), 
            JSON.stringify(data.candidate_requirements), 
            data.isOpen, 
            data.isShow
        ];

        connection.query(insertQuery, values, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.insertId);
        });
    });
}

function getAllCareers(callback) {
    const selectQuery = 'SELECT * FROM careers';
    connection.query(selectQuery, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
}

module.exports = {
    addCareerEntry,
    getAllCareers
};
