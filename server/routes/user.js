const express = require('express');
const UserModel = require('../models/user');
const botService = require('../bot/botService');
const jwt = require('jsonwebtoken');
const userRoutes = express.Router();

//TODO: move all to config
const secret_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8';

userRoutes.post('/api/signup', (req, res, next) => {
    var body = req.body;
    var user = new UserModel({
        name: body.name,
        place: body.place,
        role: 'client'
    });
    user.save((err, user) => {
        if (err)
            throw err;
        var token = generateToken(user);
        botService.sendMessage(`**Новая регистрация:** у нас новый клиент *${user.name}(${user.place})*`)
        res.json({
            user: user,
            token: token
        });
    });
});

userRoutes.post('/api/signin', (req, res) => {
    UserModel.findOne({username: req.body.username})
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

    return jwt.sign(user, secret_key, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}

module.exports = userRoutes;