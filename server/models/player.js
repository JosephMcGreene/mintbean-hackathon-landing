const mongoose = require("mongoose");
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const playerSchema = mongoose.Schema({

    playerName: {type: String, required: true},
    playerEmail: {type: String, required: true},
    login: {type: String, required: true},
    password: {type: String, required: true},
    resetPasswordToken: {
        type: String,
        required: false
    },

    resetPasswordExpires: {
        type: Date,
        required: false
    },
    highScore: {type: Number, required: false},
    highScoreDate: {type: Date, required: false},
}, {timestamps: true});


playerSchema.pre('save', function(next){
    const playerUser = this;

    if (!playerUser.isModified('password')) return next();

    bcrypt.genSalt(12, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(playerUser.password, salt, function(err, hash) {
            if (err) return next(err);

            playerUser.password = hash;
            next();
        })
    })
});

playerSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

playerSchema.methods.generateJWT = function() {
    const today = new Date();

    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    var payload = {
        id: this._id,
        login: this.login,
        firstName: this.first_name,
        lastName: this.last_name
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
};

  
playerSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; // expires in one hour.
}



module.exports = mongoose.model("Player", playerSchema);
