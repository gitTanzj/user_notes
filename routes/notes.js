const express = require('express');
const router = express.Router();
const { getNotes, addNote } = require('../controllers/notes');

router.get('/', getNotes);
router.post('/add', addNote);

module.exports = router;