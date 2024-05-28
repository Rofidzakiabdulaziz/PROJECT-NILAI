const { registerUser, loginUser, logoutUser, getMe } = require('../models/authModel');
const { body, validationResult } = require('express-validator');

function register(req, res) {
  const validation = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().isEmail().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("kelas").notEmpty().withMessage("kelas is required")
  ];
  Promise.all(validation.map((v) => v.run(req))).then(() => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errMsg = errors.array().map(error => ({
        [error.path]: error.msg
      }));
      return res.status(422).json({
        status: false,
        message: 'error validation fields',
        error: errMsg
      });
    }
    const { name, email, password, kelas } = req.body;
    registerUser(name, email, password, kelas, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'internal server error' });
      }
      if (result.success) {
        res.status(201).json({
          success: result.success,
          message: result.message,
          data: {
            id: result.data.insertId,
            name: result.data.name,
            email: result.data.email,
            kelas: result.data.kelas
          }
        });
      } else {
        res.status(500).json({ error: 'internal server error' });
      }
    });
  });
}

function login(req, res) {
  const validation = [
    body("email").notEmpty().isEmail().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required")
  ];
  Promise.all(validation.map((v) => v.run(req))).then(() => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errMsg = errors.array().map(error => ({
        [error.path]: error.msg
      }));
      return res.status(422).json({
        success: false,
        message: 'Validation error',
        errors: errMsg
      });
    }

    const { email, password } = req.body;
    loginUser(email, password, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
      }
      if (result.success) {
        res.status(200).json({
          success: true,
          message: result.message,
          user: result.user,
          token: result.token
        });
      } else {
        res.status(401).json({ success: false, error: result.message });
      }
    });
  });
}

function me(req, res) {
  const token = req.headers.authorization;
  getMe(token, (error, user) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: true, message: 'Failed to fetch user data' });
    }
    if (!user) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }
    if (user.success) {
      res.status(200).json({
        success: user.success,
        message: user.message,
        data: user.data
      });
    }
  });
}

function logout(req, res) {
  const token = req.headers.authorization;
  logoutUser(token, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: true, message: 'Failed to logout user' });
    }
    if (!result) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }
    if (result.success) {
      res.status(201).json({
        success: result.success,
        message: result.message
      });
    } else {
      res.status(500).json({ error: result.message });
    }
  });
}

module.exports = { register, login, me, logout };