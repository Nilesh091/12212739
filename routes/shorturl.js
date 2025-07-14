const express = require('express');
const router = express.Router();
const {
  csu01,
  redsu,
  gsus02,
} = require('../controllers/shorturlController');
router.post('/shorturls', csu01);
router.get('/shorturls/:shortcode', gsus02);
router.get('/:shortcode', redsu);
module.exports = router;
