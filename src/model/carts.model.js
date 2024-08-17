const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Products',
            required: true
        },
        qty: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const cartsSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Users',
            required: true
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