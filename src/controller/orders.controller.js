const { default: mongoose } = require("mongoose");
const Orders = require("../model/orders.model");


const listOrder = async (req, res) => {
    try {
        const orders = await Orders.find();
        console.log(orders);


        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "orders data not found",
            });
        }

        res.status(200).json({
            resuccess: true,
            message: "orders data fetched",
            data: orders,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getOrders = async (req, res) => {
    try {
        const order = await Orders.findById(req.params.order_id)
        if (!order) {
            res.status(404).json({
                success: false,
                message: "Data not found." + error.message
            })
        }

        res.status(200).json({
            success: true,
            message: "order Data fetched",
            data: order
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const deleteOrder = async (req, res) => {
    try {
        console.log(req.params.order_id);

        const orders = await Orders.findByIdAndDelete(req.params.order_id);
        console.log(orders);

        if (!orders) {
            res.status(404).json({
                success: false,
                message: "orders not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "orders Deleted sucessfully",
            data: orders
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const updateOrders = async (req, res) => {
    try {
        const orders = await Orders.findByIdAndUpdate(req.params.order_id, req.body, { new: true, runValidators: true });
        console.log(orders);

        if (!orders) {
            res.status(400).json({
                success: false,
                message: "orders not Update"
            })
        }

        res.status(200).json({
            success: true,
            message: "orders Update sucessfully",
            data: orders
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const alluser = async (req, res) => {

    const { user_id } = req.params;

    const orders = await Orders.aggregate([
        {
            $match: {
                user_id: new mongoose.Types.ObjectId(user_id)
            }
        }
    ]
    )

    res.status(200).json({
        success: true,
        message: "orders get  succesfully",
        data: orders
    })

    console.log(orders);
}

const allsellar = async (req, res) => {

    const { user_id } = req.params;

    const orders = await Orders.aggregate([
        {
            $match: {
                user_id: new mongoose.Types.ObjectId(user_id)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: {
                path: "$user"
            }
        },
        {
            $match: {
                "user.role": "sellar"
            }
        }
    ]
    )

    res.status(200).json({
        success: true,
        message: "orders get  succesfully",
        data: orders
    })

    console.log(orders);
}


const allproduct = async (req, res) => {
    try {
        const { product_id } = req.params;

        const orders = await Orders.aggregate([
            {
                $match: {
                    'items.product_id': new mongoose.Types.ObjectId(product_id)
                }
            },
            {
                $unwind: '$items'
            },
            {
                $match: {
                    'items.product_id': new mongoose.Types.ObjectId(product_id)
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching orders",
            error: error.message
        });
    }
}


const cancelorder = async (req, res) => {

    const orders = await Orders.aggregate([
        {
            $match: {
                status: "cancel"
            }
        }
    ]
    )

    res.status(200).json({
        success: true,
        message: "orders get  succesfully",
        data: orders
    })

    console.log(orders);
}

const placeOrder = async (req, res) => {
    try {
        const { user_id, payment_id, items, shipping_address, amount, discount,  status} = req.body;

        if (!user_id || !payment_id || !items || !shipping_address || amount == null || discount == null || status == null) {
            return res.status(400).json({
                success: false,
                message: "All required order parameters are missing."
            });
        }

        const order = new Orders({
            user_id,
            payment_id,
            items,
            shipping_address,
            amount,
            discount,
            status
        });

        await order.save();

        res.status(201).json({
            success: true,
            message: "Order added successfully.",
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
};



module.exports = {
    listOrder,
    getOrders,
    updateOrders,
    deleteOrder,
    alluser,
    allsellar,
    allproduct,
    cancelorder,
    placeOrder
}