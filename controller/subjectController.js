const Subject = require('../models/subjects');


const addSubject = async(req, res) => {
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

module.exports = { addSubject };
