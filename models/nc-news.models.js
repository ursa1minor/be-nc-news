const db = require('../db/connection');
const format = require('pg-format');

const returnTopics = () => {
    return db.query('SELECT * FROM topics')
    .then((res) => {
        return res.rows;
    })
}

module.exports = { returnTopics };
