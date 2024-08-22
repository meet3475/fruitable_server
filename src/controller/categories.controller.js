const Categories = require("../model/categories.model")

const listcategories = async (req, res) => {

    console.log("categroyDone", req.query.page, req.query.pageSize);

    try {

        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize)

        if (page <= 0 || pageSize <= 0) {
           return res.status(400).json({
                success: false,
                message: "page and pagesize must be greter than zero."
            })
        }

        const categories = await Categories.find();

        if (!categories || categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Categories not found"
            })
        }

        let startIndex=0, endIndex=0, paginationdata=[]
        
        if (page > 0 || pageSize > 0) {           //page=2, pageSize=3
            startIndex = (page - 1) * pageSize;  // 2-1 * 3 = 3
            endIndex = startIndex + pageSize;    // 3 + 3 = 6
            paginationdata = categories.slice(startIndex, endIndex);
        }

        res.status(200).json({
            success: true,
            totaldata: categories.length,
            message: "categories fetched sucessfully",
            data: paginationdata
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const getcategory = async (req, res) => {
    try {
        console.log(req.params.category_id);

        const category = await Categories.findById(req.params.category_id);
        console.log(category);

        if (!category) {
            res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category fetched sucessfully",
            data: category
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const countActive = async (req, res) => {

    const categories = await Categories.aggregate([
        {
            $match: {
                "isActive": true
            }
        },
        {
            $count: 'NoOfActiveCategories'
        }
    ])

    res.status(200).json({
        success: true,
        message: "Category get  succesfully",
        data: categories
    })

    console.log(categories);

}

const mostProducts = async (req, res) => {
    const categories = await Categories.aggregate([


        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category_id",
                as: "product"
            }
        },
        {
            $match: {
                "product": { $ne: [] }
            }
        },
        {
            $unwind: {
                path: "$product"
            }
        },
        {
            $group: {
                _id: "$_id",
                "category_name": { $first: "$name" },
                "CountProduct": {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                "CountProduct": -1
            }
        },
        {
            $limit: 1
        }

    ])

    res.status(200).json({
        success: true,
        message: "Category get  succesfully",
        data: categories
    })

    console.log(categories);

}

const totalProducts = async (req, res) => {
    const categories = await Categories.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category_id",
                as: "product"
            }
        },
        {
            $match: {
                "product": { $ne: [] }
            }
        },
        {
            $unwind: {
                path: "$product"
            }
        },
        {
            $group: {
                _id: "$_id",
                "category_name": { $first: "$name" },
                "TotalProduct": {
                    $sum: 1
                },
                "product_name": { $push: "$product.name" }
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Category get  succesfully",
        data: categories
    })

    console.log(categories);

}

const listInactive = async (req, res) => {

    const categories = await Categories.aggregate([
        {
            $match: {
                "isActive": false
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Category get  succesfully",
        data: categories
    })

    console.log(categories);

}

const countSubcategories = async (req, res) => {
    const categories = await Categories.aggregate([
        {
            $lookup: {
                from: "subcategories",
                localField: "_id",
                foreignField: "category_id",
                as: "subcategory"
            }
        },
        {
            $match: {
                "subcategory": { $ne: [] }
            }
        },
        {
            $unwind: {
                path: "$subcategory"
            }
        },
        {
            $group: {
                _id: "$_id",
                "category_name": { $first: "$name" },
                "CountSubcategories": {
                    $sum: 1
                },
                "subcategory_name": { $push: "$subcategory.name" }
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Category get  succesfully",
        data: categories
    })

    console.log(categories);

}

const specificCategory = async (req, res) => {
    const categories = await Categories.aggregate([
        {
            $lookup: {
                from: "subcategories",
                localField: "_id",
                foreignField: "category_id",
                as: "subcategory"
            }
        },
        {
            $project: {
                "name": 1,
                "subcategory": 1
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Category get  succesfully",
        data: categories
    })

    console.log(categories);

}


const addcategory = async (req, res) => {

    console.log("abcdfh", req.body);


    try {
        console.log(req.body);

        const category = await Categories.create(req.body);
        console.log(category);

        if (!category) {
            res.status(400).json({
                success: false,
                message: "Category not creted"
            })
        }

        res.status(201).json({
            success: true,
            message: "Category careted sucessfully",
            data: category
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const deletecategory = async (req, res) => {
    try {
        console.log(req.params.category_id);

        const category = await Categories.findByIdAndDelete(req.params.category_id);
        console.log(category);

        if (!category) {
            res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category Deleted sucessfully",
            data: category
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const updatecategory = async (req, res) => {
    try {
        console.log("acbd", req.params.category_id, req.body);

        const category = await Categories.findByIdAndUpdate(req.params.category_id, req.body, { new: true, runValidators: true });
        console.log(category);

        if (!category) {
            res.status(400).json({
                success: false,
                message: "Category not Update"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category Update sucessfully",
            data: category
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}


module.exports = {
    listcategories,
    getcategory,
    countActive,
    mostProducts,
    totalProducts,
    listInactive,
    countSubcategories,
    specificCategory,
    addcategory,
    deletecategory,
    updatecategory
}