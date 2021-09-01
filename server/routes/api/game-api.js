const router = require("express").Router();
const passport = require("passport");
const isAuth = require("../../middleware/authMiddleware").isAuth;
const gameController = require("../../controllers/gameController");

router.get("/", isAuth, gameController.getGameList);
router.get("/:gameId", isAuth, gameController.getGame);
module.exports = router;
