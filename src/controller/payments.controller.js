const { default: mongoose } = require("mongoose");
const Payments = require("../model/payments.model");

const listPayment = async (req, res) => {
    try {
        const payments = await Payments.find();
        console.log(payments);


        if (!payments || payments.length === 0) {
            return res.status(404).json({
                success: false,
                message: "payments data not found",
            });
        }

        res.status(200).json({
            resuccess: true,
            message: "payments data fetched",
            data: payments,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getPayment = async (req, res) => {
    try {
        const payments = await Payments.findById(req.params.payment_id)
        if (!payments) {
            res.status(404).json({
                success: false,
                message: "Data not found." + error.message
            })
        }

        res.status(200).json({
            success: true,
            message: "payments Data fetched",
            data: payments
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const deletePayment = async (req, res) => {
    try {
        const payments = await Payments.findByIdAndDelete(req.params.payment_id);
        console.log(payments);

        if (!payments) {
            res.status(404).json({
                success: false,
                message: "payments not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "payments Deleted sucessfully",
            data: payments
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const updatePayment = async (req, res) => {
    try {
        const payments = await Payments.findByIdAndUpdate(req.params.payment_id, req.body, { new: true, runValidators: true });
        console.log(payments);

        if (!payments) {
            res.status(400).json({
                success: false,
                message: "payments not Update"
            })
        }

        res.status(200).json({
            success: true,
            message: "payments Update sucessfully",
            data: payments
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const orderPayment = async (req, res) => {

    const { order_id } = req.params;

    const payments = await Payments.aggregate([
        {
            $match: {
                order_id: new mongoose.Types.ObjectId(order_id)
            }
        },
        {
            $match: {
                status: "done"
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "payments get  succesfully",
        data: payments
    })

    console.log(payments);
}

const createPayment = async (req, res) => {

    try {
        console.log(req.body);

        const payment = await Payments.create(req.body);
        console.log(payment);

        if (!payment) {
            res.status(400).json({
                success: false,
                message: "payment not creted"
            })
        }

        res.status(201).json({
            success: true,
            message: "payment careted sucessfully",
            data: payment
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}



module.exports = {
    listPayment,
    getPayment,
    createPayment,
    updatePayment,
    deletePayment,
    orderPayment
}