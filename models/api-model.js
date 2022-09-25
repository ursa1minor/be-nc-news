const e = require('express');
const db = require('../db/connection');
const endpoints = require('../endpoints.json');

exports.returnApi = () => {
    return endpoints;
 };