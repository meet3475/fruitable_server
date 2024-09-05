const Reviews = require("../model/reviews.model");
const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');

const listReviews = async (req, res) => {
    try {
        const reviews = await Reviews.find();
        console.log(reviews);


        if (!reviews || reviews.length === 0) {
            res.status(404).json({
                success: false,
                message: "reviews data not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "reviews data fetched",
            data: reviews,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getReviews = async (req, res) => {
    try {
        const reviews = await Reviews.findById(req.params.reviews_id)
        if (!reviews) {
            res.status(404).json({
                success: false,
                message: "Data not found." + error.message
            })
        }

        res.status(200).json({
            success: true,
            message: "Reviews Data fetched",
            data: reviews
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const creatReviews = async (req, res) => {
    try {
        console.log(req.body);

        const reviews = await Reviews.create(req.body);
        console.log(reviews);

        if (!reviews) {
            res.status(400).json({
                success: false,
                message: "reviews not creted"
            })
        }

        res.status(201).json({
            success: true,
            message: "reviews careted sucessfully",
            data: reviews
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const deleteReviews = async (req, res) => {
    try {
        console.log(req.params.reviews_id);

        const reviews = await Reviews.findByIdAndDelete(req.params.reviews_id);
        console.log(reviews);

        if (!reviews) {
            res.status(404).json({
                success: false,
                message: "reviews not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "reviews Deleted sucessfully",
            data: reviews
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const updateReviews = async (req, res) => {
    try {
        const reviews = await Reviews.findByIdAndUpdate(req.params.reviews_id, req.body, { new: true, runValidators: true });
        console.log(reviews);

        if (!reviews) {
            res.status(400).json({
                success: false,
                message: "reviews not Update"
            })
        }

        res.status(200).json({
            success: true,
            message: "reviews Update sucessfully",
            data: reviews
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const approveReviews = async (req, res) => {
    const { reviews_id } = req.params;

    const result = await Reviews.updateOne(
        { _id: new mongoose.Types.ObjectId(reviews_id) },
        { $set: { isApproved: true } }
    );

    if (result.matchedCount === 0) {
        return res.status(404).json({
            success: false,
            message: 'Review not found.',
        });
    }

    res.status(200).json({
        success: true,
        message: "reviews get  succesfully",
        data: result
    })

    console.log(result);
}

const rejectReviews = async (req, res) => {
    try {
        const userId = req.params.user_id;

        const objectId = new mongoose.Types.ObjectId(userId);

        const reviews = await Reviews.aggregate([
            {
                $match: {
                    user_id: objectId,
                    isApproved: false
                }
            },
            {
                $project: {
                    _id: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: 'Reviews fetched successfully.',
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching reviews.',
            error: error.message
        });
    }
}

const reviewofuser = async (req, res) => {
    const reviews = await Reviews.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "product_id",
                foreignField: "_id",
                as: "product"
            }
        },
        {
            $match: {
                user: { $ne: [] }
            }
        },
        {
            $project: {
                user: 1,
                product: 1
            }
        }
    ]
    )

    res.status(200).json({
        success: true,
        message: "reviews get  succesfully",
        data: reviews
    })

    console.log(reviews);
}

const reviewofproduct = async (req, res) => {
    const { product_id } = req.params;

    try {
        const reviews = await Reviews.aggregate([
            {
                $match: {
                    product_id: new mongoose.Types.ObjectId(product_id)
                }
            }
        ]);
        res.status(200).json({
            success: true,
            message: 'Reviews fetched successfully.',
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching reviews.',
            error: error.message
        });
    }
}

const noreviewProduct = async (req, res) => {
    const reviews = await Reviews.aggregate([
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
        message: "reviews get  succesfully",
        data: reviews
    })

    console.log(reviews);
}

const toprate = async (req, res) => {
    const reviews = await Reviews.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "product_id",
                foreignField: "_id",
                as: "product"
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
                "Totalrating": {
                    $sum: "$rating"
                }
            }
        },
        {
            $sort: {
                "Totalrating": -1
            }
        },
        {
            $limit: 1
        }
    ]
    )

    res.status(200).json({
        success: true,
        message: "reviews get  succesfully",
        data: reviews
    })

    console.log(reviews);
}

const specificeUser = async (req, res) => {
    const reviews = await Reviews.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $match: {
                user: { $ne: [] }
            }
        },
        {
            $project: {
                user: 1
            }
        }
    ]
    )

    res.status(200).json({
        success: true,
        message: "reviews get  succesfully",
        data: reviews
    })

    console.log(reviews);
}

const withcomment = async (req, res) => {
    const reviews = await Reviews.aggregate([
        {
            $match: {
                review: { $exists: true, $ne: "" }
            }
        }
    ]
    )

    res.status(200).json({
        success: true,
        message: "reviews get  succesfully",
        data: reviews
    })

    console.log(reviews);
}

const countProduct = async (req, res) => {
    const reviews = await Reviews.aggregate([
        {
            $match: {
                review: { $exists: true, $ne: "" }
            }
        },
        {
            $group: {
                _id: "$product_id",
                reviewCount: { $count: {} }
            }
        },
        {
            $sort: { reviewCount: -1 }
        }
    ]
    )

    res.status(200).json({
        success: true,
        message: "reviews get  succesfully",
        data: reviews
    })

    console.log(reviews);
}

module.exports = {
    listReviews,
    getReviews,
    creatReviews,
    deleteReviews,
    updateReviews,
    approveReviews,
    rejectReviews,
    reviewofuser,
    reviewofproduct,
    noreviewProduct,
    toprate,
    specificeUser,
    withcomment,
    countProduct
}