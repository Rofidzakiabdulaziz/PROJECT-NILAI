const express = require('express');
const router = express.Router();
const gradeController = require('../controller/gradeController');
const {verifyToken} = require('../middleware/verifyToken');

router.post('/', verifyToken, gradeController.addGrade);
router.get('/student/:id', verifyToken, gradeController.getGradesByStudentId);
router.get('/average/:id', verifyToken, gradeController.calculateAverage);
router.get('/transcript/:id', verifyToken, gradeController.generateTranscript);

module.exports = router;
