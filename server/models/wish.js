const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const Wish = new Schema({
    userId: { type: ObjectId, required: true },
    choice: [ObjectId],
    note: { type: String },
    dateCreated: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['new', 'in progress', 'rejected', 'completed'],
        required: true
    }
});

module.exports = mongoose.model('Wish', Wish);