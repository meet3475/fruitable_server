const mongoose = require("mongoose");

const shippingsSchema = new mongoose.Schema(
    {
        order_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Orders',
            required: true
        },
        status: {
            type: String,
            trim: true,
            required: true
        },
        location: {
            type: String,
            trim: true,
            required: flase
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

const Shippings = mongoose.model("Shippings", shippingsSchema);
module.exports = Shippings;