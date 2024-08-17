const mongoose = require('mongoose');


const variantSchema = new mongoose.Schema(
    {
        category_id: {
            type: mongoose.Types.ObjectId,
            ref:'Categories',
            require: true,
        },
        subcategory_id:{
            type: mongoose.Types.ObjectId,
            ref:'Subcategories',
            require: true
        },
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Products',
            required: true
        },
        price: {
            type: Number
        },
        stock: {
            type: Number
        },
        discount: {
            type: Number
        },
        attributes: {},
        variant_img: {
            type: {
                public_id: String,
                url: String
            }
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

const Variants = mongoose.model('Variants', variantSchema)
module.exports = Variants