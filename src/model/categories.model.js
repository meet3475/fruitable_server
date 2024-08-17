const mongooes = require("mongoose");

const categoriesSchema = new mongooes.Schema(
    {
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
        image: {
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
);

const Categories = mongooes.model("Categories", categoriesSchema);
module.exports = Categories;