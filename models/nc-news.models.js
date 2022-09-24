const e = require('express');
const db = require('../db/connection');
const users = require('../db/data/test-data/users');

exports.returnTopics = () => {

    let sqlQuery = `SELECT * FROM topics`;
    return db.query(sqlQuery)
        .then((result) => {
            const topics = result.rows;
    return topics;
    });
};

exports.returnArticles = 
    (sortby = 'created_at', order = 'desc', topic) => {

    const slugList = [];
    const orderOptions = ['asc', 'desc', 'ASC', 'DESC']
    const columns = ['title', 'author', 'created_at', 'topic', 'votes'];
    let validTopic;

    if (!columns.includes(sortby)) {
		return Promise.reject({ status: 400, message: 'Bad request' });
	}
    if (!orderOptions.includes(order)) {
		return Promise.reject({status: 400, message: 'Bad request'})
	}

    if(!topic) {
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
        GROUP BY articles.article_id
		ORDER BY ${sortby} ${order};
        `;

        return db.query(sqlQuery)
        .then((result) => {
            const articles = result.rows;
        return articles;})
    }
    else if (topic) {
        return db.query(`SELECT slug FROM topics`)
    
        .then((topics) => {    
        topics.rows.forEach(slug => slugList.push(slug.slug)) 
        const topicMatch = slugList.filter(slug => (slug === topic))
    
    if (topicMatch.length === 0) {
        return Promise.reject({status: 404, message: 'Topic not found'})
        } else {
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
            WHERE articles.topic = '${topic}'
            GROUP BY articles.article_id
		    ORDER BY ${sortby} ${order};
            `;

        return db.query(sqlQuery)
        .then((result) => {
            const articles = result.rows;
        return articles;})
        }
    })
}
}


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

exports.returnComments = (article_id) => {

    let sqlQuery = `
        SELECT
            comments.comment_id,
            comments.votes,
            comments.created_at,
            comments.author,
            comments.body,
            articles.article_id    
        FROM comments
        RIGHT JOIN articles ON comments.article_id=articles.article_id
        WHERE articles.article_id = $1`;

    return db.query(sqlQuery, [article_id])
        .then((result) => {
            const comments = result.rows;

    if (comments.length === 0) {
            return Promise.reject({
                status: 404, message: 'Article not found'
            });
        }
    if (comments[0].comment_id === null) {
        return Promise.reject({
                status: 404, message: 'Comments not found'
            });
        }
    
    return comments;
    })
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

exports.insertComment = ( article_id, username, body ) => {

    if (!body || !username) {
      return Promise.reject({
        status: 400,
        message: 'Must include username and comment',
      })
    }

    return db.query(`SELECT username FROM users WHERE username=$1`, [username])
    .then((result) => {
        const users = result.rows;
    if (users.length < 1) {
        return Promise.reject({ status: 422, message: 'Username not found' });
        }
    })
    .then(() => {
        let sqlQuery =
        `INSERT INTO comments
        (article_id, author, body, votes)
        VALUES ($1, $2, $3, 0)      
        RETURNING *
        `
    return db.query(sqlQuery, [article_id, username, body])
    })
    .then((result) => {
                const comment = result.rows[0];
    return comment;
    });
};

