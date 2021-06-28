const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log('got to beep router (GET)');
  
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  console.log('got to beep router (POST)');
});

module.exports = router;
