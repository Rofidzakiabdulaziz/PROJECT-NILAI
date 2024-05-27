const connection = require('../config/connection');

const Student = {
  create: (data, callback) => {
    const query = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';
    connection.query(query, [data.name, data.email, data.password], callback);
  },
  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM user WHERE email = ?';
    connection.query(query, [email], callback);
  },
  findById: (id, callback) => {
    const query = 'SELECT * FROM user WHERE id = ?';
    connection.query(query, [id], callback);
  }
};

module.exports = Student;
