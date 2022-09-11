const db = require('../db/connection');

const returnTopics = () => {
    return db.query('SELECT * FROM topics')
    .then((result) => {
        return result.rows;
    })
}

const returnArticles = () => {
    return db.query('SELECT * FROM articles')
    .then((result) => {
        return result.rows;
    })
}

const returnArticleId = (article_id) => {
    return db.query(`
        SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.body, articles.created_at, articles.votes FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE comments.article_id = $1`, [article_id])
    .then((result) => {
        if (result.rows.length > 0) {
        result.rows[0].comment_count = result.rows.length;}
        console.log(result.rows, '<- result.rows in the model')
        return result.rows[0];
    })
}

const returnUsers = () => {
    return db.query (`SELECT * FROM users`)
    .then((result) => {
        return result.rows;
    })
}

const updateArticleId = (article_id, voteChange) => {
    return db.query(`
        UPDATE articles
        SET votes = votes + $2      
        WHERE article_id = $1
        RETURNING *;`, [article_id, voteChange])
    .then(({rows}) => {
        return rows[0];
    })
}

module.exports = { returnTopics, returnArticles, returnArticleId, returnUsers, updateArticleId };
