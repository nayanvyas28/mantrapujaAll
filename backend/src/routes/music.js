const express = require('express');
const router = express.Router();
const { getGods, getSongs } = require('../controllers/music');
const { getStreamUrl } = require('../controllers/stream');

router.get('/gods', getGods);
router.get('/songs', getSongs);
router.get('/stream/:youtubeId', getStreamUrl);

module.exports = router;
