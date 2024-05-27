// gradeRoutes.js atau subjectRoutes.js

const express = require('express');
const router = express.Router();
const subjectController = require('../controller/subjectController');
const {verifyToken} = require('../middleware/verifyToken');

router.post('/create', verifyToken, subjectController.addSubject);

module.exports = router;
