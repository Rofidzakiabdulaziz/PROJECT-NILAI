const connection = require('../config/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Subject = {
  create: (data, callback) => {
    // console.log(data)
    const query = 'INSERT INTO subjects (name) VALUES (?)';
    connection.query(query, [data], callback);
    return true
  },
  findAll: (callback) => {
    const query = 'SELECT * FROM subjects';
    connection.query(query, callback);
    return false
  }
};

module.exports = Subject;
