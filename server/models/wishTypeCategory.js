const mongoose = require('mongoose');
const wishTypeModel = require('./wishType');
const Schema = mongoose.Schema;

const WishTypeCategory = new Schema({
    name: {
        type: String,
        required: true
    },
    description: { type: String }
});

WishTypeCategory.pre('remove', function(next) {
    wishTypeModel.remove({category: this._id}).exec();
    next();
});

module.exports = mongoose.model('WishTypeCategory', WishTypeCategory);