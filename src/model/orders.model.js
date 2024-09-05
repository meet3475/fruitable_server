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

const ordersSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        payment_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Payments',
        },
        amount: {
            type: Number,
            trim: true,
            required: true
        },
        items: [itemsSchema],
        discount: {
            type: Number,
            trim: true,
        },
        status: {
            type: String,
            trim: true,
            required: true
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

const Orders = mongoose.model("Orders", ordersSchema);
module.exports = Orders;