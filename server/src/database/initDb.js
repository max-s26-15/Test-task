const getConnection = require('./dbConnection');

async function initDb() {
    const connection = await getConnection();
    try {
        await connection.promise().query('ALTER DATABASE auth_db CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;')

        await connection.promise().query(
            'CREATE TABLE IF NOT EXISTS Users (' +
            'id INT AUTO_INCREMENT PRIMARY KEY, ' +
            'displayName VARCHAR(120) NOT NULL, ' +
            'givenName VARCHAR(50), ' +
            'familyName VARCHAR(50), ' +
            'pictureUrl TEXT, ' +
            'email VARCHAR(40) NOT NULL UNIQUE);');

        await connection.promise().query('ALTER TABLE Users CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;');
    } catch (e) {
        console.log('ERROR: ', e);
    } finally {
        connection.end();
    }
}

module.exports = initDb;
