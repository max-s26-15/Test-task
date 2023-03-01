const getConnection = require("./dbConnection");

async function saveUserData(profile) {
    const isUserExists = await checkUserExistsByEmail(profile.email);
    if (isUserExists) return;
    await saveUser(profile);
}

async function checkUserExistsByEmail(email) {
    const connection = await getConnection();
    try {
        const [rows] = await connection.promise().query(`SELECT EXISTS (SELECT email FROM Users WHERE email = ?)`, [email]);
        connection.end();
        return !!Object.values(rows[0])[0];
    } catch (e) {
        console.log('ERROR: ', e);
        throw e;
    } finally {
        connection.destroy();
    }
}

async function saveUser(profile) {
    const connection = await getConnection();
    try {
        await connection.promise().query('INSERT INTO Users (displayName, givenName, familyName, email, pictureUrl) VALUES (?, ?, ?, ?, ?)',
            [
                decodeURI(profile.displayName),
                decodeURI(profile.given_name),
                decodeURI(profile.family_name),
                profile.email,
                profile.picture
            ]);
        await connection.promise().end();
    } catch (e) {
        console.log('ERROR: ', e);
        throw e;
    } finally {
        connection.destroy();
    }
}

module.exports = saveUserData;