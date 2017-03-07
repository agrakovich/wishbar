const express = require('express');
const WishTypeModel = require('../models/wishType');
const WishTypeCategoryModel = require('../models/wishTypeCategory');
const WishModel = require('../models/wish');
const mongoose = require('mongoose');
const botService = require('../bot/botService');
const moment = require('moment');
const wishRoutes = express.Router();

wishRoutes.get('/wishtype', (req, res) => {
    return WishTypeModel.find().populate('category').exec((err, wishes) => {
        if (!err) {
            return res.send({wishTypes: wishes});
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
});

wishRoutes.post('/wishtype', (req, res) => {

    // if(!req.user || req.user.role != 'admin')
    // {
    //     return res.status(401).json({
    //         success: false,
    //         message: 'Please register Log in using a valid email to submit posts'
    //     });
    // }

    const wishType = new WishTypeModel({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category
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

wishRoutes.delete('/wishtype', (req, res) => {
    return WishTypeModel.findById(mongoose.Types.ObjectId(req.query.id), (err, wishType) => {
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

wishRoutes.get('/wishcategory', (req, res) => {
    return WishTypeCategoryModel.find().populate('wishes')
        .exec((err, wishCategories) => {
            if (!err) {
                return res.send({wishCategories: wishCategories});
            } else {
                res.statusCode = 500;
                return res.send({ error: 'Server error' });
            }
        });
});

wishRoutes.post('/wishcategory', (req, res) => {

    console.log(req.user);
    // if(req.user.role != 'admin')
    // {
    //     return res.status(401).json({
    //         success: false,
    //         message: 'Access prevent'
    //     });
    // }

    const wishCategory = new WishTypeCategoryModel({
        name: req.body.name,
        description: req.body.description
    });

    wishCategory.save((err) => {
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

wishRoutes.delete('/wishcategory', (req, res) => {
    return WishTypeCategoryModel.findById(mongoose.Types.ObjectId(req.query.id), (err, wishCategory) => {
        if(!wishCategory) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return wishCategory.remove((err) => {
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
        return  res.send({error: true, message: 'Необходимо хоть что-то заказать'});
    }
    if(checkedWishes.length > 3) {
        res.statusCode = 400;
        return res.send({error: true, message: 'К сожалению, заказ ограничен 3-мя желаниями'});
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
                    botService.sendMessage(`....................... **Новый заказ** .......................\n\n\n\n${wishes.map((w, index) => {return `${index + 1}) ${w.name}\n\n`})}**Примечание:** ${note ? note : ''}\n\n**Клиент:** ${user.name}(${user.place})\n\n\n\n....................................  ${moment(wishModel.dateCreated).format("HH:mm:ss")}  ....................................`);
                    return res.send({status: 'OK'});
                } else {
                    console.log(err);
                    if (err.name == 'ValidationError') {
                        res.statusCode = 400;
                        res.send({error: 'Validation error'});
                    } else {
                        res.statusCode = 500;
                        return res.send({error: true, message:'Server error'});
                    }
                }
            });
        } else {
            res.statusCode = 500;
            return res.send({error: true, message: 'Server error'});
        }
    });
});

module.exports = wishRoutes;