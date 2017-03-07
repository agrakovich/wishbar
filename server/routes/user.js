const express = require('express');
const UserModel = require('../models/user');
const botService = require('../bot/botService');
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const userRoutes = express.Router();

userRoutes.post('/signup', (req, res, next) => {
    var body = req.body;
    var user = new UserModel({
        name: body.name,
        place: body.place,
        role: 'client'
    });
    user.save((err, usr) => {
        if (err)
            throw err;
        const token = generateToken({id: user._id, name: user.name, place: user.place});
        botService.sendMessage(`**Новая регистрация:** у нас новый клиент *${user.name}(${user.place})*`)
        res.json({
            user: user,
            token: token
        });
    });
});

userRoutes.post('/signin', (req, res) => {
    UserModel.findOne({name: req.body.username})
        .exec((err, user) => {
            if (err) throw err;
            if (!user) {
                return res.status(404).json({
                    error: true,
                    message: 'Username or Password is Wrong'
                });
            }

            bcrypt.compare(req.body.password, user.password, (err, valid) => {
                if (!valid) {
                    return res.status(404).json({
                        error: true,
                        message: 'Username or Password is Wrong'
                    });
                }

                const token = generateToken(user);
                res.json({
                    user: user,
                    token: token
                });
            });
        });
});

function generateToken(user) {

    return jwt.sign({ id: user._id, name: user.name, place: user.place, role: user.role }, config.secret_key, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}

module.exports = userRoutes;