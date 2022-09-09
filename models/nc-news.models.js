const db = require('../db/connection');

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
        SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then((res) => {
        return res.rows[0];
    })
}

const returnUsers = () => {
    return db.query (`SELECT * FROM users`)
    .then((res) => {
        return res.rows;
    })
}

module.exports = { returnTopics, returnArticles, returnArticleId, returnUsers };
