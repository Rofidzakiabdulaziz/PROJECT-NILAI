const connection = require('../config/connection');


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
  },
  delete: (id, callback) => {
    const query = 'DELETE FROM subjects WHERE id = ?';
    connection.query(query, [id], callback);
  },
  update: (id, data, callback) => {
    const query = 'UPDATE subjects SET name = ? WHERE id = ?';
    connection.query(query, [data, id], callback);
  }
};

module.exports = Subject;
