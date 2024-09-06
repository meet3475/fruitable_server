const { default: mongoose } = require("mongoose");
const Products = require("../model/products.model");
const { uploadfiles } = require("../utils/cloundary");

const listproducts = async (req, res) => {
    try {
        const products = await Products.find();

        if (!products || products.length === 0) {
            res.status(404).json({
                success: false,
                message: "Products not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Products fetched sucessfully",
            data: products
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const searchName = async (req, res) => {

    const products = await Products.aggregate([
        {
            $match: {
                "name": /^[a-zA-Z0-9!@#$&()`.+,/"-]*$/
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const productsByCategory = async (req, res) => {

    const { category_id } = req.params;

    const products = await Products.aggregate([
        {
            $match: {
                category_id: new mongoose.Types.ObjectId(category_id)
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "category_id",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: {
                path: "$category"
            }
        },
        {
            $project: {
                "name": 1,
                "product_img.url": 1,
                "category": 1
            }
        }

    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const productsBySubcategory = async (req, res) => {

    const { subcategory_id } = req.params;

    const products = await Products.aggregate([
        {
            $match: {
                subcategory_id: new mongoose.Types.ObjectId(subcategory_id)
            }
        },
        {
            $lookup: {
                from: "subcategories",
                localField: "subcategory_id",
                foreignField: "_id",
                as: "subcategory"
            }
        },
        {
            $unwind: {
                path: "$subcategory"
            }
        },
        {
            $project: {
                "name": 1,
                "product_img.url": 1,
                "subcategory": 1
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const topRate = async (req, res) => {

    const products = await Products.aggregate([
        {
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "product_id",
                as: "review"
            }
        },
        {
            $unwind: {
                path: "$review"
            }
        },
        {
            $group: {
                _id: "$_id",
                product_name: { $first: "$name" },
                Totalrating: {
                    $sum: "$review.rating"
                },
                totalperson: {
                    $sum: 1
                }
            }
        },
        {
            $addFields: {
                avgbyrate: {
                    $divide: ["$Totalrating", "$totalperson"]
                }
            }
        },
        {
            $sort: {
                avgbyrate: -1
            }
        },
        {
            $limit: 1
        }
    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const newArrivals = async (req, res) => {

    const products = await Products.aggregate([
        {
            $sort: {
                "createdAt": -1
            }
        },
        {
            $limit: 3
        }
    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const countCategories = async (req, res) => {

    const products = await Products.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "category_id",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: {
                path: "$category"
            }
        },
        {
            $group: {
                _id: "$category._id",
                "category_name": { $first: "$category.name" },
                "product_name": { $push: "$name" },
                "TotalProduct": {
                    $sum: 1
                }
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const getproducts = async (req, res) => {
    try {
        console.log(req.params.product_id);

        const product = await Products.findById(req.params.product_id);
        console.log(product);

        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product fetched sucessfully",
            data: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const addproducts = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);

        const fileResult = await uploadfiles(req.file.path, "Product");
        console.log(fileResult);

        const product = await Products.create({
            ...req.body,
            product_img: {
                public_id: fileResult.public_id,
                url: fileResult.url
            }

        });
        console.log(product);

        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not creted"
            })
        }

        res.status(201).json({
            success: true,
            message: "Product careted sucessfully",
            data: product
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const deleteproducts = async (req, res) => {
    try {
        console.log(req.params.product_id);

        const product = await Products.findByIdAndDelete(req.params.product_id);
        console.log(product);

        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product Deleted sucessfully",
            data: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const updateproducts = async (req, res) => {

    console.log("acbd", req.params.product_id, req.body, req.file);

    if (req.file) {
        console.log("new image");

        const fileResult = await uploadfiles(req.file.path, "Product");
        console.log(fileResult);

        const product = await Products.findByIdAndUpdate(req.params.product_id,
            {
                ...req.body,
                product_img: {
                    public_id: fileResult.public_id,
                    url: fileResult.url
                }
            },
            { new: true, runValidators: true });
        console.log(product);

        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not Update"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product Update sucessfully",
            data: product
        })


    } else {
        console.log("old image");

        const product = await Products.findByIdAndUpdate(req.params.product_id, req.body, { new: true, runValidators: true });
        console.log(product);

        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not Update"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product Update sucessfully",
            data: product
        })

    }



    // try {
    //     console.log("acbd", req.params.product_id, req.body, req.file);

    //     // const updateData = { ...req.body };

    //     // if (req.file) {
    //     //     const fileResult = await uploadfiles(req.file.path, "Product");
    //     //     updateData.product_img = {
    //     //         public_id: fileResult.public_id,
    //     //         url: fileResult.url
    //     //     };
    //     // }

    //     const product = await Products.findByIdAndUpdate(req.params.product_id, req.body, { new: true, runValidators:true});
    //     console.log(product);



    //     if (!product) {
    //         res.status(400).json({
    //             success: false,
    //             message: "Product not Update"
    //         })
    //     }

    //     res.status(200).json({
    //         success: true,
    //         message: "Product Update sucessfully",
    //         data: product
    //     })

    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: "Intenal server error." + error.message
    //     })
    // }
}

const searchProduct = async (req, res) => {
    try {
        // console.log(req.body);

        const { sortOrder, rating, max, min, category, page, limit } = req.query  //query

        const matchPip = {}

        if (rating) {
            matchPip['avgrating'] = { $gte: parseInt(rating) }
        }

        if (category) {
            matchPip["category_id"] = parseInt(category)
        }

        matchPip['variant.attributes.Price'] = {}

        if (min != undefined) {
            matchPip['variant.attributes.Price'].$gte = parseInt(min)
        }

        if (max != undefined) {
            matchPip['variant.attributes.Price'].$lte = parseInt(max)
        }

        console.log(matchPip);


        const pipline = [
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "review"
                }
            },
            {
                $lookup: {
                    from: "variants",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "variant"
                }
            },
            {
                $addFields: {
                    "avgrating": { $avg: "$review.rating" }
                }
            },
            {
                $unwind: {
                    path: "$variant"
                }
            },
            {
                $match: matchPip
            },
            {
                $group: {
                    _id: "$_id",
                    "name": { $first: "$name" },
                    "review": { $push: "$review" },
                    "variant": { $push: "$variant" }
                }
            },
            {
                $sort: {
                    name: sortOrder === 'asc' ? 1 : -1
                }
            }
        ]


        if (parseInt(page) > 0 && parseInt(limit) > 0) {
            pipline.push({ $skip: (parseInt(page) - 1) * parseInt(limit) })
            pipline.push({ $limit: parseInt(limit) })
        }

        const data = await Products.aggregate(pipline);
        console.log(data);

        res.status(200).json({
            success: true,
            data: data,
            message: "Product data Fetched",
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const discountProduct = async (req, res) => {
    const products = await Products.aggregate([

        {
            $match: {
                isActive: true
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "category_id",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $lookup: {
                from: "subcategories",
                localField: "subcategory_id",
                foreignField: "_id",
                as: "subcategory"
            }
        },
        {
            $unwind: "$category"
        },
        {
            $unwind: "$subcategory"
        },
        {
            $group: {
                _id: {
                    category_id: "$category_id",
                    subcategory_id: "$subcategory_id"
                },
                category_name: { $first: "$category.name" },
                subcategory_name: {
                    $first: "$subcategory.name"
                },
                products: {
                    $push: {
                        _id: "$_id",
                        name: "$name",
                        description: "$description",
                        price: "$price",
                        stock: "$stock"
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                category_id: "$_id.category_id",
                subcategory_id: "$_id.subcategory_id",
                category_name: 1,
                subcategory_name: 1,
                products: 1
            }
        }

    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);
}

const noreviewProduct = async (req, res) => {
    const product = await Products.aggregate([
        {
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "product_id",
                as: "review"
            }
        },
        {
            $match: {
                review: { $eq: [] }
            }
        }
    ]
    )

    res.status(200).json({
        success: true,
        message: "product get  succesfully",
        data: product
    })

    console.log(product);
}

module.exports = {
    listproducts,
    searchName,
    productsByCategory,
    productsBySubcategory,
    topRate,
    newArrivals,
    countCategories,
    getproducts,
    addproducts,
    deleteproducts,
    updateproducts,
    searchProduct,
    discountProduct,
    noreviewProduct
}