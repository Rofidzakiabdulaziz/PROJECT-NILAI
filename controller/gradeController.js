const Grade = require('../models/grade');

const addGrade = (req, res) => {  
  const { user_id, subject_id, grade } = req.body;

try {
 const response = Grade.create({user_id,subject_id,grade}, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    ;
  });
  if(response) res.status(201).json({ message: 'Grade added successfully!' })
}
catch(error){
  console.log(error)
  res.status(500).json({ message: 'Internal Server Error' }); 
 
}
  
};

const getGradesByStudentId = (req, res) => {
  const studentId = req.params.id;

  Grade.findByStudentId(studentId, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

const calculateAverage = (req, res) => {
  const studentId = req.params.id;

  Grade.calculateAverage(studentId, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

const generateTranscript = (req, res) => {
  const studentId = req.params.id;

  Grade.findByStudentId(studentId, (err, grades) => {
    if (err) return res.status(500).json({ error: err });

    Grade.calculateAverage(studentId, (err, average) => {
      if (err) return res.status(500).json({ error: err });

      res.json({
        grades: grades,
        average: average[0].average
      });
    });
  });
};

module.exports = { addGrade, getGradesByStudentId, calculateAverage, generateTranscript };
