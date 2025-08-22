const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createMenuItem,
  updateMenuItem,
  findOneMenuItem,
} = require('../../controllers/product');
const upload = require('../../middleware/upload');

router
  .route('/')
  .get(getAllProducts)
  .post(upload.single('image'), createMenuItem);
router
  .route('/:id')
  .get(findOneMenuItem)
  .patch(upload.single('image'), updateMenuItem);

module.exports = router;
