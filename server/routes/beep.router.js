const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET For User Beeps. Gets the user's beeps upon <UserBeeps /> useEffect
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
 * POST For saving a beep. Posts a beep object to the DB upon pressing save on edit/create page
 */
router.post('/', (req, res) => {
  console.log('got to beep router (POST)', req.body);
  let beep = req.body // for legibility below

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
      req.user.id, // $1 
      beep.osc_type, // $2
      beep.filter_type, // $3
      beep.filter_cutoff, // $4
      beep.scale, // $5
      beep.octave, // $6
      beep.root, // $7
      beep.bpm,  // $8
      beep.steps // $9
    ])
    .then(result => {
      res.sendStatus(201)
    })
    .catch(error => {
      console.log('error', error);
      res.sendStatus(500);
    })
});

module.exports = router;
