const router = require("express").Router();
const playerRoutes = require("./player-api");
const gameRouter = require("./game-api");

router.use("/player", playerRoutes);
router.use("/games", gameRouter);
module.exports = router;
