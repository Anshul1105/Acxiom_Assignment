// middleware/auth.js
module.exports = (req, res, next) => {
    if (!req.session.user) {
        console.log("Unauth");
        return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log(req.session.user)
    req.user = req.session.user; // Add user data to req for use in controllers
    next();
};
