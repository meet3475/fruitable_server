const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema (
    {
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Categories',
            required: true
        },
        subcategory_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Subcategories',
            required: true
        },
        sellar_id: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            // required: true
        },
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        }, 
        discription : {
            type: String,
            trim: true,
            required: true
        },
        product_img: {
            type: {
                public_id: String,
                url: String
            }
        },
        price: {
            type: Number,
            trim: true,
            required: true
        },
        stock: {
            type: Number,
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

const Products = mongoose.model("Products", productsSchema);
module.exports = Products;
 