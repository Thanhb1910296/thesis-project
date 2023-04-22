const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const token = req.session.token;
        if (!token)
            return res.redirect('/login');

        const verified = jwt.verify(token, "passwordKey");
        
        if (!verified)
            return res.redirect('/login');

        const user = await User.findById(verified.id);

        if (user.type == "user") {
            req.user = verified.id;
            req.token = token;
            
            return next();
        } else {
            return res.redirect('/login');
        }
    
    } catch (err) {
        return res.redirect('/login');
    }
};

module.exports = userAuth;