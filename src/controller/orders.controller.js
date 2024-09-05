const { default: mongoose } = require("mongoose");
const Orders = require("../model/orders.model");
const { ObjectId } = require('mongodb');

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

    const { sellar_id } = req.params;

    const orders = await Orders.aggregate([
        {
            $match: {
                sellar_id: new mongoose.Types.ObjectId(sellar_id)
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

    const { product_id } = req.params;

    const orders = await Orders.aggregate([
        {
            $match: {
                product_id: new mongoose.Types.ObjectId(product_id)
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
        const { user_id, items, discount, status, isActive, amount } = req.body;

        // Create a new order
        const newOrder = new Order({
            user_id,
            items,
            discount,
            status,
            isActive,
            amount,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        res.status(201).json({
            message: 'Order placed successfully',
            order: savedOrder
        });
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error });
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