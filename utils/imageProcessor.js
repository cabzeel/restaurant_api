const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Absolute paths
const tmpDir = path.join(__dirname, '../tmp');
const outputDir = path.join(__dirname, '../images');

// Ensure folders exist
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// 🧹 Cleanup old files in tmp (older than 1 hour)
const cleanupStaleTmpFiles = () => {
  const oneHour = 60 * 60 * 1000;
  fs.readdir(tmpDir, (err, files) => {
    if (err) return console.error("❌ Error reading tmp dir:", err.message);

    files.forEach((file) => {
      const filePath = path.join(tmpDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return;

        const now = Date.now();
        if (now - stats.mtimeMs > oneHour) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.warn(`⚠️ Could not delete stale file ${file}:`, err.message);
            } else {
              console.log(`🧹 Deleted stale tmp file: ${file}`);
            }
          });
        }
      });
    });
  });
};

// 🔁 Safe unlink with retry
const unlinkWithRetry = (filePath, retries = 5, delay = 100, initialDelay = 300) => {
  return new Promise((resolve, reject) => {
    const attemptUnlink = (remaining) => {
      fs.unlink(filePath, (err) => {
        if (!err) {
          console.log("✅ Temp file deleted successfully.");
          return resolve();
        }

        if ((err.code === 'EBUSY' || err.code === 'EPERM') && remaining > 0) {
          console.warn(`⚠️ File busy, retrying in ${delay}ms... (${remaining} attempts left)`);
          return setTimeout(() => attemptUnlink(remaining - 1), delay);
        }

        console.error("❌ Error deleting temp file:", err.message);
        reject(err);
      });
    };

    setTimeout(() => attemptUnlink(retries), initialDelay);
  });
};

// 🧠 Main processor
const imageProcessor = async (inputPath, outputSuffix = 'optimized') => {
  const outputFilename = `${Date.now()}-${outputSuffix}.webp`;
  const outputPath = path.join(outputDir, outputFilename);

  // Process with Sharp
  await sharp(inputPath)
    .resize({ width: 800 })
    .webp({ quality: 75 })
    .toFile(outputPath);

  // Delete temp file with retry
  await unlinkWithRetry(inputPath);

  return outputFilename; // Return final name
};

// Run cleanup when file is imported
cleanupStaleTmpFiles();

module.exports = imageProcessor;
