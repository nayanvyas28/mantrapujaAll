const express = require('express');
const router = express.Router();
const { getGods, getSongs } = require('../controllers/music');

router.get('/gods', getGods);
router.get('/songs', getSongs);

module.exports = router;
