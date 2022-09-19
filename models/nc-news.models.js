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

exports.returnArticles = (topic) => {

    let sqlQuery = 
        `SELECT 
        COUNT (comments.article_id)::INT AS comment_count,
            articles.article_id, 
            articles.author, 
            articles.title, 
            articles.topic, 
            articles.created_at, 
            articles.votes 
        FROM articles 
        LEFT JOIN comments 
        ON articles.article_id = comments.article_id
        `;

    if (Object.keys(topic).length > 0) {
        sqlQuery += 
        `WHERE articles.topic = '${topic.topic}'
        `;
    }

    sqlQuery += 
		`GROUP BY articles.article_id
		ORDER BY comment_count DESC;
        `;

    return db.query(sqlQuery)
        .then((result) => {
            const articles = result.rows;
            console.log(articles)

    if (articles.length === 0) {
        return Promise.reject({
            status: 404, message: 'Topic not found'
            });
        } else {
        return articles;}
    });
};

exports.returnArticleId = (article_id) => {

    let sqlQuery =  
        `SELECT 
            articles.article_id, 
            articles.author, 
            articles.title, 
            articles.topic, 
            articles.body, 
            articles.created_at, 
            articles.votes, 
            COUNT (comments.article_id)::INT AS comment_count 
        FROM articles 
        LEFT JOIN comments 
        ON articles.article_id = comments.article_id
        WHERE articles.article_id = $1 
        GROUP BY articles.article_id`;
    
    return db.query(sqlQuery, [article_id])
        .then((result) => {
            const article = result.rows[0];

        if (article === undefined) {
            return Promise.reject({
                status: 404, message: 'Article not found'
            });
        };
    return article;
    });
};

exports.returnUsers = () => {
    let sqlQuery = `SELECT * FROM users`;
    return db.query (sqlQuery)
        .then((result) => {
            const users = result.rows;
    return users;
    });
};

exports.updateArticleId = (article_id, voteChange) => {
    let sqlQuery = 
        `UPDATE articles
        SET votes = votes + $2      
        WHERE article_id = $1
        RETURNING *;`
        return db.query(sqlQuery, [article_id, voteChange])
            .then(({rows}) => {
                const article = rows[0];
    return article;
    });
};
