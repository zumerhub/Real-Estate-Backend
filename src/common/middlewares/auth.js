const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send("Access denied. Token not provided.");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).send("Invalid token.");
  }
};

module.exports = verifyToken;



// module.exports = function (req, res, next) {
//     const token = req.headers.authorization;
    
//     if (!token) {
//         return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }
    
//     try {
//         const decoded = jwt.verify(token, 'Gloriouskey');
//         req.userId = decoded.userId;
//         next();
//     } catch (error) {
//         return res.status(403).json({ message: 'Invalid token.' });
//     }
    
// };

// module.exports = verifyToken;

module.exports = function (req, res, next) {
    if (!req.user) return res.status(403).send('Unauthorised User');

    next();
}