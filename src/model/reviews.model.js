const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Products',
            required: true
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        rating : {
            type: Number,
            trim: true,
        },
        review: {
            type: String,
            trim: true,
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
)

const Reviews = mongoose.model("Reviews", reviewsSchema);
module.exports = Reviews;