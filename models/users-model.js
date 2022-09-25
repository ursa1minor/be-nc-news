const e = require('express');
const db = require('../db/connection');

exports.returnUsers = () => {
    let sqlQuery = `SELECT * FROM users`;
    return db.query (sqlQuery)
        .then((result) => {
            const users = result.rows;
    return users;
    });
};

exports.returnUserByUsername = (username) => {
    let sqlQuery = 
        `SELECT * FROM users
        WHERE username=$1
        `;
    return db.query (sqlQuery, [username])
        .then((result) => {
            const user = result.rows[0];
    if (user === undefined) {
        return Promise.reject({
            status: 404, message: 'User not found'
        })
    }
    return user;
    });
};
