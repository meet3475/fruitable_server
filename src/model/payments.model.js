const mongoose = require("mongoose");

const paymentsSchema = new mongoose.Schema(
    {
        order_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Orders',
            required: true
        },
        type: {
            type: String,
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

const Payments = mongoose.model("Payments", paymentsSchema);
module.exports = Payments;