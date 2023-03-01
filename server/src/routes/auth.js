const passport = require("passport");
const express = require("express");
const router = express.Router();

const getAllUsers = require("../database/getAllUsers");

const links = {
    loginLink: '/',
    logoutLink: '/api/logout',
    redirectLink: '/api/users',
}

function isLoggedIn(req, res, next) {
    req.user ? next() : res.render('unauthorized', {
        title: 'Unauthorized page',
        text: 'You are not authorized to view this page',
        loginText: 'Back to main page',
        loginLink: '/'
    });
}

router.get('/', (req, res) => {
    res.render('index', {title: 'Main page', text: 'Authenticate with Google'});
});

router.get('/api/auth/google/login',
    passport.authenticate('google', {scope: ['email', 'profile']})
);

router.get('/api/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/api/success',
        failureRedirect: '/api/auth/google/failure'
    })
);

router.get('/api/success', isLoggedIn, (req, res) => {
    res.render('success', {
        title: 'Success page',
        greeting: `Hello, ${req.user.displayName}, choose your next action:`,
        loginText: 'Back to main page',
        loginLink: links.loginLink,
        redirectText: 'Watch all authorized users data',
        redirectLink: links.redirectLink,
        logoutText: 'Logout',
        logoutLink: links.logoutLink
    });
});

router.get('/api/users', isLoggedIn, async (req, res) => {
    const users = await getAllUsers();
    res.render('listOfUsers', {
        title: 'List of users',
        users: users,
        loginText: 'Back to main page',
        loginLink: links.loginLink,
        logoutText: 'Logout',
        logoutLink: links.loginLink
    });
});

router.get('/api/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.render('logout', {
        title: 'Logout page',
        loginText: 'Back to main page',
        loginLink: links.loginLink,
    })
});

router.get('api/auth/google/failure', (req, res) => {
    res.render('unauthorized', {
        title: 'Failure page',
        text: 'Failed to authenticate with Google',
        loginText: 'Try again',
        loginLink: links.loginLink,
    });
});

module.exports = router;