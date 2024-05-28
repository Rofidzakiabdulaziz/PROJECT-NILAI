const connection = require('../config/connection');
const Subject = require('../models/subjects');


const addSubject = (req, res) => {
  const { name } = req.body;

  try {
    const response = Subject.create(name, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      
    });

    if(response) res.status(201).json({ message: 'Subject added successfully!' });
    else res.status(500).json({ message: 'err' });
  }
  catch(error) {
    console.log(error)
    res.status(500).json({ message: 'err' });
  }
};

const getAllSubjects = (req, res) => {
  try {
    Subject.findAll((err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteSubject = (req, res) => {
  const subjectId = req.params.id;

  Subject.delete(subjectId, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json({ message: 'Subject deleted successfully' });
  });
};

const updateSubject = (req, res) => {
  const subjectId = req.params.id;
  const { name } = req.body;

  Subject.update(subjectId, name, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json({ message: 'Subject updated successfully' });
  });
};

module.exports = { addSubject,getAllSubjects ,deleteSubject,updateSubject};
