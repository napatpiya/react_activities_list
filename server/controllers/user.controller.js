const { User } = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt.config");

class UserController {

    register(req, res) {
        const user = new User(req.body);
        user.save()
            .then( () => {
                res
                .cookie("usertoken", jwt.sign({_id: user._id}, secret), {httpOnly: true})
                .json({ msg: "success!" , user: user}) 
            })
            // .then(() => {
            //     res.json({ msg: "success!", user: user });
            // })
            .catch(err => res.json(err));
    }

    login(req, res) {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user === null) {
                    res.json({ msg: "invalid login attempt" });
                } else {
                    bcrypt.compare(req.body.password, user.password)
                        .then(passwordIsValid => {
                            if (passwordIsValid) {
                                // const newJWT = jwt.sign({
                                //         _id: user._id
                                // })
                                // const secret = "mysecret";
                                res
                                    // .cookie("usertoken", newJWT, secret, {httpOnly: true})
                                    .cookie("usertoken", jwt.sign({_id: user._id}, secret), {httpOnly: true})
                                    .json({ msg: "success!" });
                            } else {
                                res.json({ msg: "invalid login attempt" });
                            }
                        })
                        .catch(err => res.json({ msg: "invalid login attempt" }));
                }
            })
            .catch(err => res.json(err));
    }
}

module.exports = new UserController();