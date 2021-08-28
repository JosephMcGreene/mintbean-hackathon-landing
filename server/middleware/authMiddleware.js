
module.exports.isAuth = (req, res, next) => {
    
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({message: 'You are not authorized to view this resource'})
    }
};