require("dotenv").config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const authRouter = require('./routes/auth');
const initDb = require('./database/initDb');

require('./strategies/google.strategy');

async function main() {
    const app = express();

    app.set("views", path.join(__dirname, "views"));
    app.set('view engine','ejs');
    app.use('/static', express.static(path.join(__dirname, 'static')));
    const PORT = process.env.PORT;

    app.use(session({secret: 'cats', resave: false, saveUninitialized: true}));
    app.use(passport.initialize());
    app.use(passport.session());

    await initDb().then(() => console.log('Db initialized'));

    app.use('/', authRouter);

    app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`);
        console.log('URL: ', `http://localhost:${PORT}`);
    });
}

main();