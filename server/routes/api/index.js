const router = require ("express").Router();

const playerRoutes = require("./player-api");

router.use("/player", playerRoutes);

module.exports = router