const db = require('../db/connection');
const format = require('pg-format');

const returnTopics = () => {
    return db.query('SELECT * FROM topics')
    .then((res) => {
        return res.rows;
    })
}

const returnArticles = () => {
    return db.query('SELECT * FROM articles')
    .then((res) => {
        return res.rows;
    })
}

const returnArticleId = (article_id) => {
    return db.query(`
        SELECT * FROM articles
        WHERE article_id = $1
        `, [article_id])
    .then((res) => {
        console.log(res.rows)
        return res.rows[0];
    })
}

module.exports = { returnTopics, returnArticles, returnArticleId };
