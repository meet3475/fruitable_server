const mongooes = require("mongoose");

const usersSchema = new mongooes.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: true
        }, 
        password: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            trim: true,
            required: true
        },
        refreshToken : {
            type: String,
            // required: true
        },
        googleId: {
            type: String
        },
        facebookId: {
            type: String
        },
        avtar: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Users = mongooes.model("Users", usersSchema);
module.exports = Users;