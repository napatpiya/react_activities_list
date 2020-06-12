const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    type: { 
        type: String,
        required: [true, "You must select an activity type!"]
    },
    date: { 
        type: Date,
        required: [true, "You must select a date!"]
    },
    amount: {
        type: Number,
        required: [true, "You must select an amount!"],
        min: [0.1, "Amount must be more than 0"]
    },
    units: {
        type: String,
        required: [true, "You must provide the units!"]
    }
}, { timestamps: true });

module.exports.Activity = mongoose.model('Activity', ActivitySchema);