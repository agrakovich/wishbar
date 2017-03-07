const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: { type: String, required: true },
    place: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    role: {
        type: String,
        enum: ['garson', 'client', 'manager', 'admin'],
        required: true
    },
    password: { type: String, default: null }
});

module.exports = mongoose.model('User', User);;