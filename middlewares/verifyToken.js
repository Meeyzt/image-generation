const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Authorization header'dan token'ı alın

  if (!token) {
    return res.status(401).json({ message: 'Token bulunamadı.' });
  }

  try {
    const decoded = jwt.verify(token, 'AXW23RFMFJFUEFJEFMKFDSLKFSDFSDFLSDFLK'); // Token'ı doğrula
    req.user = decoded; // decoded payload'ı req.user'a atama
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Geçersiz token.' });
  }
}

module.exports = verifyToken;