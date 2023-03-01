const getConnection = require('./dbConnection');

async function getAllUsers() {
    const connection = await getConnection();
    try {
        const [rows] = await connection
            .promise()
            .query(`SELECT displayName, givenName, familyName, pictureUrl, email FROM Users`);
        connection.end();
        return rows;
    } catch (e) {
        console.log('ERROR: ', e);
        throw e;
    } finally {
        connection.destroy();
    }
}

module.exports = getAllUsers;