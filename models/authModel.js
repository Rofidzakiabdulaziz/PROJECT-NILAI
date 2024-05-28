const connection = require('../config/connection')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// register

function registerUser(name, email, password, kelas, callback) {
  // cek apakah email ini sudah terdaftar / belum?
  connection.query('select * from user where email =?', [email], (error, existingEmailUser) => {
    if (error) return callback(error);

    if (existingEmailUser.length > 0) return callback(new Error('Email already exists'));

    // cek apakah password yang dimasukkan benar?
    bcrypt.hash(password, 16, (hashError, hashedPassword) => {
      if (hashError) return callback(hashError);

      // kalau tidak ada maka kita boleh buat email tersebut.
      connection.query(
        'insert into user (name, email, password, kelas) values (?, ? , ? , ?)',
        [name, email, hashedPassword, kelas],
        (insertError, newUser) => {
          if (insertError) return callback(insertError);

          connection.query('SELECT * FROM user WHERE id = ?', [newUser.insertId], (selectError, createdUser) => {
            if (selectError) return callback(selectError);

            callback(null, {
              success: true,
              message: 'User has been created',
              data: createdUser[0]
            });
          });
        }
      );
    });
  });
}

// login

function loginUser(email, password, callback) {
  // Cek apakah email ini sudah terdaftar atau belum
  connection.query('SELECT * FROM user WHERE email = ?', [email], (queryError, existingEmailUser) => {
    if (queryError) return callback(queryError);

    if (existingEmailUser.length === 0) {
      return callback(new Error('Email does not exist'));
    }

    const user = existingEmailUser[0];

    // Periksa apakah password yang dimasukkan benar
    bcrypt.compare(password, user.password, (compareError, isPasswordValid) => {
      if (compareError) return callback(compareError);

      if (!isPasswordValid) {
        return callback(new Error('Invalid email or password'));
      }

      // Jika email dan password cocok, buat token JWT
      const token = jwt.sign({ id: user.id }, 'bazmaSecretKey', {
        expiresIn: '7h'
      });

      callback(null, {
        success: true,
        message: 'User has been logged in',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          kelas: user.kelas
        },
        token
      });
    });
  });
}

// get me dengan jwt

function getMe(token, callback) {
  jwt.verify(token, 'bazmaSecretKey', (verifyError, decoded) => {
    if (verifyError) return callback(verifyError);

    connection.query('select * from user where id =?', [decoded.id], (queryError, checkUser) => {
      if (queryError) return callback(queryError);

      const user = checkUser[0];
      callback(null, {
        success: true,
        message: 'User data fetched successfully',
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          kelas: user.kelas
        }
      });
    });
  });
}

// logout

function logoutUser(token, callback) {
  jwt.verify(token, 'bazmaSecretKey', (verifyError, decoded) => {
    if (verifyError) return callback(verifyError);

    jwt.sign({ id: decoded.id }, 'bazmaSecretKey', {
      expiresIn: '7h'
    });

    callback(null, { success: true, message: 'Logout successful' });
  });
}

module.exports = { registerUser, loginUser, getMe, logoutUser }