const express = require('express');
const {
  getPosts,
  createPost,
  singlePost,
  updatePost,
} = require('../../controllers/postController');
const identifier = require('../../middleware/identifier');

const router = express.Router();

router.get('/all-posts', getPosts);
router.get('/single-post', singlePost);
router.post('/create-post', identifier, createPost);

router.put('/update-post', updatePost);
// router.delete('/delete-post', deletePost)

module.exports = router;
