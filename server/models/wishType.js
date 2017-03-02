const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishType = new Schema({
    name: {
        type: String,
        required: true
    },
    description: { type: String }
});

module.exports = mongoose.model('WishType', WishType);