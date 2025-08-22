const express = require('express');
const {
  createSignatureDish,
  updateSignatureDish,
  getSignatureDishes,
  getSingleSignatureDish,
  deleteSignatureDish,
} = require('../../controllers/signatureDishes');
const upload = require('../../middleware/upload');
const router = express.Router();

router
  .route('/')
  .get(getSignatureDishes)
  .post(upload.single('image'), createSignatureDish);
router
  .route('/:id')
  .get(getSingleSignatureDish)
  .patch(upload.single('image'), updateSignatureDish)
  .delete(deleteSignatureDish);

module.exports = router;
