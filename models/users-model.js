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

