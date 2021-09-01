const db = require("../models/index");

/** INDEX route - returns all Players */

module.exports = {
  findAll: function (req, res) {
    db.Player.find()
      .then((dbModel) => {
        return res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },

  findById: function (req, res) {
    db.Player.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  create: function (req, res) {
    const { username, email, password } = req.body;
    // console.log("hey this is your req.body",req.body)
    db.Player.create({
      playerName: username,
      playerEmail: email,
      login: username,
      password,
    })
      .then(() => res.status(200).json({ msg: "user created" }))
      .catch((err) => res.status(422).json(err));
  },

  update: function (req, res) {
    db.Player.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => {
        // console.log('dbmodel', dbModel)
        return res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },

  /**
   *
   * We may want to eliminate this.
   * Perhaps replace with disable player instead?
   */
  remove: function (req, res) {
    db.Player.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
