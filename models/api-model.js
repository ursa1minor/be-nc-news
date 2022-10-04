const e = require('express');
const db = require('../db/connection');
const endpoints = require('../endpoints.json');
//const index = require('../public/index.html');

exports.returnApi = () => {
    return endpoints;
 };

//  exports.returnApi = () => {
//     return index;
//  };