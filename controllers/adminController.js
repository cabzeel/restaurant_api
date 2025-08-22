const { createAdminSchema } = require('../middleware/validator');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const { passwordHashValidator } = require('../utils/hashing');

exports.createAdmin = async (req, res) => {
  const existingAdmin = await Admin.findOne();

  if (existingAdmin) {
    return res
      .status(403)
      .json({ success: false, msg: 'admin already exists' });
  }

  const { username, password, email } = req.body;

  const { error, value } = createAdminSchema.validate({
    username,
    password,
    email,
  });

  if (error) {
    return res
      .status(404)
      .json({ success: false, msg: error.details[0].message });
  }

  const newAdmin = new Admin({
    username,
    email,
    password,
  });

  await newAdmin.save();

  res.status(201).json({ success: true, msg: 'Admin created successfully' });
};

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });

  if (!admin) {
    res.status(401).json({ success: false, msg: 'invalid credentials' });
  }

  const isMatch = passwordHashValidator(password, admin.password);

  if (!isMatch)
    return res.status(403).json({ success: false, msg: 'invalid credentials' });

  const token = jwt.sign(
    {
      id: admin._id,
      role: 'admin',
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '2h',
    }
  );

  res.json({ token });
};

exports.getMe =  (req, res) => {
  res.json({ id: req.admin.id, role: req.admin.role });
};


exports.protectedTest = (req, res) => {
  res.send('Hello Admin - you have access!')
}