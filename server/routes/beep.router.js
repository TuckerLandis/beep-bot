const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET For User Beeps. Gets the user's beeps upon <UserBeeps /> useEffect
 */
router.get('/community', rejectUnauthenticated, (req, res) => {
  console.log('got to beep router (GET) (COMMUNITY)');

  let queryText = `SELECT * FROM "beep" WHERE user_id != $1 ORDER BY "date_created";`;

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
 * GET For community beeps. Gets the user's beeps upon <UserBeeps /> useEffect
 */
router.get('/user', rejectUnauthenticated, (req, res) => {
  console.log('got to beep router (GET) (USER)');

  let queryText = `SELECT * FROM "beep" WHERE user_id = $1;`;

  pool.query(queryText, [req.user.id])
    .then(result => {
      res.send(result.rows)
    })
    .catch(error => {
      console.log('error in userbeep get', error);
      res.sendStatus(500);
    })

});

/**
 * GET for edit beeps
 */
router.get('/edit/:id', rejectUnauthenticated, (req,res) => {
  console.log('got to beep router (GET) (EDIT)');

  let queryText = 'SELECT * FROM "beep" WHERE beep_id = $1'

  pool.query(queryText, [req.params.id])
    .then(result => {
      res.send(result.rows)
    })
    .catch(error => {
      console.log('error in edit get', error);
      res.sendStatus(500)
    })
  
})



/**
 * POST For saving a beep. Posts a beep object to the DB upon pressing save on edit/create page
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('got to beep router (POST)', req);
  console.log(req.user);
  

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
      "steps",
      "beep_name",
      "user_name",
      "users_that_like",
      "likes",
      "users_that_favorite"
      )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14 )
        RETURNING "beep_id"
            ;`;

  pool.query(queryText, [
    req.user.id, // $1 
    beep.osc_type, // $2
    beep.filter_type, // $3
    beep.filter_cutoff, // $4
    beep.scale, // $5
    beep.octave, // $6
    beep.root, // $7
    beep.bpm,  // $8
    beep.steps, // $9
    beep.name, // $10
    beep.user_name, // $11
    beep.users_that_like, // $12
    beep.likes, // $13
    beep.users_that_favorite // $14


  ])
    .then( result => {
     
      
      console.log('New Beep Id:', result.rows[0].beep_id); // logs ID of new beep
    
      const createdBeepID = result.rows[0].beep_id // 

      const createdObj = {
        beep_id: createdBeepID
      } // creating an object so as not to be sending a number as a status,
      // but this goes back to the saga and is the url param for edit page
       res.send(createdObj)
     
    })
    .catch(error => {
      console.log('error - insert', error);
      res.sendStatus(500);
    })
    
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log('got to beep router (PUT)');
  let beep = req.body

  let queryText = 'UPDATE beep SET "osc_type" = $2, "filter_type" = $3, "filter_cutoff" = $4, "scale"= $5, "octave"= $6, "root" = $7, "bpm" = $8, "steps" = $9, WHERE "beep_id" = $1;';

  pool.query(queryText, [ 
    beep.beep_id, // $1 
    beep.osc_type, // $2
    beep.filter_type, // $3
    beep.filter_cutoff, // $4
    beep.scale, // $5
    beep.octave, // $6
    beep.root, // $7
    beep.bpm,  // $8
    beep.steps, // $9
  ])
  .then(result => {
    res.sendStatus(200)
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500)
  })
})

// like button put
router.put('/like/:id', rejectUnauthenticated, (req, res) => {
  console.log('got to beep router (LIKE) (PUT)', req.body);
  let beep = req.body

  let queryText = 'UPDATE beep SET "likes" = "likes"+1, "users_that_like" = $2 WHERE "beep_id" = $1;';

  pool.query(queryText, [ 
    beep.beep_id, // $1 
    beep.users_that_like // $2
   
  ])
  .then(result => {
    res.sendStatus(200)
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500)
  })
})

// unlike button put
router.put('/unlike/:id', rejectUnauthenticated, (req, res) => {
  console.log('got to beep router (LIKE) (PUT)', req.body);
  let beep = req.body

  let queryText = 'UPDATE beep SET "likes" = "likes"-1, "users_that_like" = $2 WHERE "beep_id" = $1;';

  pool.query(queryText, [ 
    beep.beep_id, // $1 
    beep.users_that_like // $2
   
  ])
  .then(result => {
    res.sendStatus(200)
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500)
  })
})


router.put('/favorite/:id', rejectUnauthenticated, (req, res) => {
console.log('got to beep router (Fav) (PUT'), req.body;
let beep = req.body

let queryText = 'UPDATE beep SET "users_that_favorite" = $2 WHERE "beep_id" = $1;';

pool.query(queryText, [ 
  beep.beep_id, // $1 
  beep.users_that_favorite // $2
 
])
.then(result => {
  res.sendStatus(200)
})
.catch(error => {
  console.log(error);
  res.sendStatus(500)
})



})

router.put('/unfavorite/:id', rejectUnauthenticated, (req, res) => {
  console.log('got to beep router (Fav) (PUT'), req.body;
  let beep = req.body
  
  let queryText = 'UPDATE beep SET "users_that_favorite" = $2 WHERE "beep_id" = $1;';
  
  pool.query(queryText, [ 
    beep.beep_id, // $1 
    beep.users_that_favorite // $2
   
  ])
  .then(result => {
    res.sendStatus(200)
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500)
  })
  })



/**
 * Deletes a beep, based off of it's beep_id serial key from the userbeeps page
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('got to beep router (DELETE)');

  let queryText = `DELETE FROM "beep" WHERE beep_id = $1;`;

  pool.query(queryText, [req.params.id])
    .then(result => {
      console.log('deleted');

      res.sendStatus(200)
    })
    .catch(error => {
      console.log('error-delete', error);

    })
})

module.exports = router;
