const express = require('express');
const WishTypeModel = require('../models/wishType');
const WishModel = require('../models/wish');
const wishRoutes = express.Router();

wishRoutes.get('/wishtype', function(req, res) {
    return WishTypeModel.find(function (err, wishes) {
        if (!err) {
            return res.send(wishes);
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
});

wishRoutes.post('/wishtype', function(req, res) {
    const wishType = new WishTypeModel({
        name: req.body.name,
        description: req.body.description
    });

    wishType.save(function (err) {
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


wishRoutes.delete('/wishtype/:id', function (req, res){
    return WishTypeModel.findById(req.params.id, function (err, wishType) {
        if(!wishType) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return wishType.remove(function (err) {
            if (!err) {
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                return res.send({ error: 'Server error' });
            }
        });
    });
});

module.exports = wishRoutes;