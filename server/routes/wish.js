const express = require('express');
const WishTypeModel = require('../models/wishType');
const WishModel = require('../models/wish');
const mongoose = require('mongoose');
const botService = require('../bot/botService');
const moment = require('moment');
const wishRoutes = express.Router();

wishRoutes.get('/wishtype', (req, res) => {
    return WishTypeModel.find((err, wishes) => {
        if (!err) {
            return res.send({wishTypes: wishes});
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
});

wishRoutes.post('/wishtype', (req, res) => {
    const wishType = new WishTypeModel({
        name: req.body.name,
        description: req.body.description
    });

    wishType.save((err) => {
        if (!err) {
            return res.send({ status: 'OK' });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
        }
    });
});

wishRoutes.delete('/wishtype:id', (req, res) => {
    return WishTypeModel.findById(req.params.id, (err, wishType) => {
        if(!wishType) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return wishType.remove((err) => {
            if (!err) {
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                return res.send({ error: 'Server error' });
            }
        });
    });
});

wishRoutes.post('/wish', (req, res) => {

    const checkedWishes = req.body.checkedWishes;
    const note = req.body.note;

    if((!checkedWishes || checkedWishes.length == 0) && (!req.note)){
        res.statusCode = 400;
        res.send({error: 'Необходимо хоть что-то заказать'});
    }

    const user = req.user;
    WishTypeModel.find({
        '_id': { $in: checkedWishes.map((i) => { return mongoose.Types.ObjectId(i); })}
    }, (err, wishes) => {
        console.log(wishes);
        if(wishes.length > 0) {
            const wishModel = new WishModel({
                userId: mongoose.Types.ObjectId(user.id),
                choice: wishes.map((w) => { return w._id }),
                note: note ? note : '',
                status: 'new'
            });
            wishModel.save((err) => {
                if (!err) {

                    botService.sendMessage(`xxxxxxxxxxxxxxxxxxxx **Новый заказ** xxxxxxxxxxxxxxxxxxx\n\n\n\n${wishes.map((w, index) => {return (index + 1) + ') ' + w.name + '\n\n'})}**Примечание:** ${note ? note : ''}\n\n**Клиент:** ${user.name}(${user.place})\n\n\n\nxxxxxxxxxxxxxxxxxxxxxx  ${moment(wishModel.dateCreated).format("HH:mm:ss")}  xxxxxxxxxxxxxxxxxxxxx`)
                    return res.send({status: 'OK'});
                } else {
                    console.log(err);
                    if (err.name == 'ValidationError') {
                        res.statusCode = 400;
                        res.send({error: 'Validation error'});
                    } else {
                        res.statusCode = 500;
                        res.send({error: 'Server error'});
                    }
                }
            });
        } else {
            res.statusCode = 500;
            res.send({error: 'Server error'});
        }
    });
});

module.exports = wishRoutes;