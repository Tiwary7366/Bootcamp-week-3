const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
    policyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Policy',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    claimDate: {
        type: Date,
        required: true
    },
    claimAmount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },

}, { timestamps: true });

module.exports = mongoose.model('Claim', claimSchema);