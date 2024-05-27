const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');
const {verifyToken} = require('../middleware/verifyToken');

router.get('/:id', verifyToken, studentController.getStudentById);

module.exports = router;
