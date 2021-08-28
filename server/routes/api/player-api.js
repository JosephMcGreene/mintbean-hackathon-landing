const router = require ("express").Router();
const passport = require("passport");
const playerController = require("../../controllers/playerController");
const isAuth = require('../../middleware/authMiddleware').isAuth;



//the final route is /api/player

router
.route("/")
.get(playerController.findAll)
.post(playerController.create);

// router
// .route("/")
// .get(isAuth, playerController.findAll)
// .post(isAuth, playerController.create);


/**
 * Reference that spurred this approach - note the line 'Middleware UseCase vs. Middleware Chain'
 * https://iamchrissmith.io/blog/javascript/expressjs/middleware/nodejs/2017/09/09/expressjs-next-exploration/
 * 
 */




// /api/player/:id



router
.route("/:id", isAuth)
.get(isAuth, playerController.findById)
.put(isAuth, playerController.update)
.delete(isAuth, playerController.remove);

/**
 * Login routing for the player
 * 
 */

  router.post('/login', passport.authenticate('local'), 
  function (req, res, err) {
      if (err) { res.status(404)}
      if (req.user) {
          res.status(200).send(req.user.id); 
       } else {
           res.status(404);
       }
      
});


module.exports = router;


