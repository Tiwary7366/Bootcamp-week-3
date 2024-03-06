const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
    policyName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    premiumAmount: {
        type: Number,
        required: true
    },
    sumAssured: {
        type: Number,
        required: true
    },
    paymentFrequency: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model("Policy", policySchema);
