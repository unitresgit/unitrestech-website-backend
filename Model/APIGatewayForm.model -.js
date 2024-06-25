const pool = require('../Config/db.js');

const createAPIGatewayFormSubmission = ({ email}) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO APIGatewayForm (email) VALUES (?)',
            [email],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            }
        );
    });
};

const getAllSubmissionsAPIGateway = () => {
    return new Promise((resolve, reject) => {
        pool.query(
            'SELECT * FROM APIGatewayForm',
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
    createAPIGatewayFormSubmission,
    getAllSubmissionsAPIGateway,
};
