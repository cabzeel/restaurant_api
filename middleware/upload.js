const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure /tmp directory exists
const tempDir = path.join(__dirname, '../tmp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Setup storage engine for temporary uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir); // Save to /tmp, not /images
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// Multer config
const upload = multer({ storage });

module.exports = upload;
