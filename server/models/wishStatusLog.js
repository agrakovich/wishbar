const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const WishStatusLog = new Schema({
    userId: { type: ObjectId, required: true },
    wishId: { type: ObjectId, required: true },
    note: { type: String },
    date: { type: Date, default: Date.now },
    oldValue: { type: String, required: true },
    newValue: { type: String, required: true }

});

module.exports = mongoose.model('WishStatusLog', WishStatusLog);