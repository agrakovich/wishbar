const express = require('express');
const UserModel = require('../models/user');
const botService = require('../bot/botService');
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const adminRoutes = express.Router();

adminRoutes.post('/signin', (req, res) => {
    console.log(req);
    UserModel.findOne({name: req.body.username})
        .exec((err, user) => {
            if (err) throw err;
            if (!user) {
                return res.status(404).json({
                    error: true,
                    message: 'Username or Password is Wrong'
                });
            }

            if(req.body.password == user.password){
                const token = generateToken({id: user._id, name: user.name, place: user.place, role: user.role});
                res.json({
                    user: user,
                    token: token
                });
            } else {
                return res.status(401).json({
                    error: true,
                    message: 'Username or Password is Wrong'
                });
            }
        });
});

function generateToken(user) {

    return jwt.sign(user, config.secret_key, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}

module.exports = adminRoutes;