const e = require('express');
const db = require('../db/connection');

exports.removeComment = (comment_id) => {

    let sqlQuerySelect = `SELECT comment_id FROM comments WHERE comment_id=$1;`

    let sqlQueryDelete = `DELETE FROM comments WHERE comment_id=$1 RETURNING *;`

    let sqlQueryCheck = `SELECT * FROM comments;`

    let commentCount = [];

    return db.query(sqlQueryCheck)

    .then((comments) => {
        commentCount.push(comments.rows.length)
    })

    .then(() => {
    //check comment count before deletion
    return db.query(sqlQuerySelect, [comment_id])})
    
    .then((result) => {

    if (result.rows.length === 0) {
        return Promise.reject({
            status: 404, message: 'Comment not found'
        });
    }

    //comment exists so return it      
    comment_id = result.rows[0].comment_id;
    return comment_id;
    })

    .then((comment_id) => {
    // comment exists so delete it
    return db.query(sqlQueryDelete, [comment_id])
    })

    .then((result) => {
    // check comment count after deletion
    return db.query(sqlQueryCheck);
    })

    .then((result) => {
        commentCount.push(result.rows.length)

    if (commentCount[1] !== commentCount[0] - 1) {
        return Promise.reject({
            status: 400,
            message: 'Oops! Try again!'
        })
    }
    })
}
        