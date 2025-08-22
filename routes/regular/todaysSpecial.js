const express = require('express');
const {
  getSpecialDishes,
  createSpecialDish,
  getSingleSpecialDish,
  updateSpecialDish,
  deleteSpecialDish,
} = require('../../controllers/todaysSpecial');
const upload = require('../../middleware/upload');
const router = express.Router();

router
  .route('/')
  .get(getSpecialDishes)
  .post(upload.single('image'), createSpecialDish);
router
  .route('/:id')
  .get(getSingleSpecialDish)
  .patch(upload.single('image'), updateSpecialDish)
  .delete(deleteSpecialDish);

module.exports = router;
