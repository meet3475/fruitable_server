const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Products',
            required: true
        },
        qty: {
            type: Number,
            required: true,
            default : 1
        }
    },
    {
        _id: false, 
        timestamps: false, 
        versionKey: false
    }
)

const cartsSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true
            // type: mongoose.Types.ObjectId,
            // ref: 'Users',
            // required: true
        },
        items: [itemsSchema],
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

const Carts = mongoose.model("Carts", cartsSchema);
module.exports = Carts;