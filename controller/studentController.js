const Student = require('../models/user');
const { body, validationResult } = require('express-validator');

const getStudentById = (req, res) => {
  const studentId = req.params.id;
  
  Student.findById(studentId, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ message: 'Student not found' });
    
    res.json(result[0]);
  });
};

module.exports = { getStudentById };
