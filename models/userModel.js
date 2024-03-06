const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]

    },
    password: {
        type: String,
        required: [true, "Please Enter Your Passowrd"],
        minLength: 6,
        select: false
    },

    userName: {
        type: String,
        required: true,
        unique: [true, "Enter a unique username"]
    },

    role: {
        type: String,
        default: 'policyHolder',
    },

    policies: [{
        policy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Policy'
        },
        leftAmount: {
            type: Number,
        }
    }],
    isAdmin: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model("User", userSchema);

