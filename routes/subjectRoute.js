// gradeRoutes.js atau subjectRoutes.js

const express = require('express');
const router = express.Router();
const {addSubject, getAllSubjects,deleteSubject, updateSubject} = require('../controller/subjectController');
const {verifyToken} = require('../middleware/verifyToken');
const { route } = require('./gradeRoute');

router.post('/create', verifyToken, addSubject);
router.get('/show', verifyToken, getAllSubjects);
router.delete('/delete/:id', deleteSubject);
router.put('/update/:id', updateSubject);

module.exports = router;
