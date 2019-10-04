const jwt = require('jsonwebtoken');

function jwtAuthMW(req, res, next) {

  const authHeader = req.header('Authorization')

  if (!authHeader)
    return res.status(401).json({
      message: "Missing Authorization header"
    })

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.data;
    next();
  } catch (e) {
    res.status(400).json({
      msg: 'Invalid credential'
    });
  }
}

module.exports = jwtAuthMW;