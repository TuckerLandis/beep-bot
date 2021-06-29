const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/user', (req, res) => {
  console.log('got to beep router (GET)');

  let queryText = `SELECT * FROM "beep" WHERE user_id= $1;`;

  pool.query(queryText, [req.user.id])
  .then(result => {
    res.send(result.rows)
  })
  .catch(error => {
    console.log('error', error);
    res.sendStatus(500);
  })
  
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  console.log('got to beep router (POST)', req.body);
  let beep = req.body

  let queryText = `INSERT INTO "beep" (
    "user_id",
     "osc_type",
      "filter_type",
      "filter_cutoff",
      "scale",
      "octave",
      "root",
      "bpm",
      "steps"
      )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 );`;

    pool.query(queryText, [
      req.user.id, 
      beep.osc_type, 
      beep.filter_type, 
      beep.filter_cutoff, 
      beep.scale, 
      beep.octave,
      beep.root, 
      beep.bpm, 
      beep.steps])
    .then(result => {
      res.sendStatus(201)
    })
    .catch(error => {
      console.log('error', error);
      res.sendStatus(500);
    })
});

module.exports = router;
