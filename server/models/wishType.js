const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const WishType = new Schema({
    name: {
        type: String,
        required: true
    },
    description: { type: String },
    category: { type: ObjectId, ref: 'WishTypeCategory' },
    isDisabled: { type: Boolean }
});

module.exports = mongoose.model('WishType', WishType);