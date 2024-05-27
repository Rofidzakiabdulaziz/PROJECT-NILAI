
const jwt = require('jsonwebtoken');

async function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  // console.log(req)
  if(!token) return res.status(401).json({message: "no token"})
  jwt.verify(token, 'bazmaSecretKey', function (err, decoded) {
    if (err) {
      return res.status(401).json({
        message: "Invalid Token, Unauthorized"
      });
    }
    req.user = decoded;
    
  });
  next()
}

module.exports = { verifyToken };