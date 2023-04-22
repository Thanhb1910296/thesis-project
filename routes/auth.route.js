const express = require("express");
const bcrypt = require("bcrypt");
// const session = require("express-session");

const authRouter = express.Router();

const User = require("../models/user");

authRouter.post("/register", async (req, res) => {
    try {
        const { fullname, username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.json({ msg: "Username already exists!" });
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
  
        let user = new User({
            fullname,
            username,
            password: hashedPassword,
            // password,
        });

        user = await user.save();
        // console.log(user);
        res.redirect('/login');
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

authRouter.post("/login", async(req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isValidPassowrd = await bcrypt.compare(password, user.password);
    
    if(!username) {
        res.json({ msg: "Account does not exist!" });
    }
    else if(isValidPassowrd == false){
        res.json({ msg: "Your password is invalid. Please try again." });
    }
    else {
        console.log(req.body);
    }
    // console.log(isValidPassowrd);
    res.redirect('/');
});
// authRouter.get("/api/all-users/", async(req, res) => {
//     try {
//         const users = await User.find({});
//         res.json(users);
//     }
//     catch(e) {
//         res.status(500).json({ error: e.message });
//     }
// });

module.exports = authRouter;