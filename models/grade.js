const connection = require('../config/connection');


 const Grade = {
  create: (data, callback) => {
    const query = 'INSERT INTO grades (user_id, subject_id, grade) VALUES (?, ?, ?)';
    connection.query(query, [data.user_id, data.subject_id, data.grade], callback);
    return true
  },
  findByStudentId: (user_id, callback) => {
    const query = `SELECT g.*, s.name as subject_name 
                   FROM grades g 
                   JOIN subjects s ON g.subject_id = s.id 
                   WHERE user_id = ?`;
    connection.query(query, [user_id], callback);
  },
  calculateAverage: (user_id, callback) => {
    const query = 'SELECT AVG(grade) as average FROM grades WHERE user_id = ?';
    connection.query(query, [user_id], callback);
  },

  
};

module.exports = Grade;
