const e = require('express');
const db = require('../db/connection');

const returnTopics = () => {
    return db.query('SELECT * FROM topics')
    .then((result) => {
        const topics = result.rows;
        return topics;
    })
}

const returnArticles = () => {
    return db.query('SELECT * FROM articles')
    .then((result) => {
        const articles = result.rows;
        return articles;
    })
}

const returnArticleId = (article_id) => {
    return db.query(
        `SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.body, articles.created_at, articles.votes, COUNT (comments.article_id)::INT FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id`, [article_id])
    .then((result) => {
        const article = result.rows[0]

        if (article === undefined) {
            return Promise.reject({
                status: 404, message: 'Item not found'
            })
        } 
        return article;
    })
}

const returnUsers = () => {
    return db.query (`SELECT * FROM users`)
    .then((result) => {
        const users = result.rows;
        return users;
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
