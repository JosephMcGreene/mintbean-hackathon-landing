const bcrypt = require("bcrypt");
async function validatePassword(password, user) {

    const match = await bcrypt.compare(password, user.password);
    return match;
    
//    await bcrypt.compare(password, user.password, (err, result) => {
//         console.log('Bcrypt error: ', err);
//         return result === true;
//       });
}

module.exports.validatePassword = validatePassword;