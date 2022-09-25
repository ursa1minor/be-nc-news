const e = require('express');
const db = require('../db/connection');

exports.returnTopics = () => {
    let sqlQuery = `SELECT * FROM topics`;
    return db.query(sqlQuery)
        .then((result) => {
            const topics = result.rows;
    return topics;
    });
};


        