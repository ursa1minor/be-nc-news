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
        `SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.body, articles.created_at, articles.votes FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1`, [article_id])
    .then((result) => {
        console.log(result.rows[0])
        const article = result.rows[0]

        if (article === undefined) {
            return Promise.reject({
                status: 404, message: 'Item not found'
            })
        } 
        article.comment_count = 0;
        return article;
    })
}

const returnComments = () => {
    return db.query(`SELECT * FROM comments`)
    .then((result) => {
        const comments = result.rows;
        return comments;
    })
}

const returnCommentCount = (article_id) => {
    return db.query(`SELECT * FROM comments WHERE article_id = $1`, [article_id])
    .then((result) => {
        console.log(result.rows[0], '<- ')
        const comments = result.rows;
        return comments.length;
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

module.exports = { returnTopics, returnArticles, returnArticleId, returnUsers, updateArticleId, returnComments, returnCommentCount };
