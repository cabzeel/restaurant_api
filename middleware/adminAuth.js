const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader?.startsWith('Bearer')) {
      return res.status(401).json({
        sucess : false,
        msg : "unauthorized access"
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(decoded.role !== 'admin') {
      return res.status(401).json({
        success : false,
        msg : 'You f***ing imposter. You are not allowed to access this route🤣'
      })
    }

    req.admin = decoded;
    next()
  } catch (error) {
    res.status(403).json({msg : 'forbidden route'})
  }
}