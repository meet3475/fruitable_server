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
    const payments = await Payments.aggregate([
       
        {
            $lookup: {
                from: "payments",
                localField: "_id",
                foreignField: "_id",
                as: "paymentDetails"
            }
        },
        {
            $unwind: {
                path: "$paymentDetails",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: 1,
                order_id: 1,
                gateway: "$paymentDetails.gateway",
                status: "$paymentDetails.status",
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


module.exports = {
    listPayment,
    getPayment,
    updatePayment,
    deletePayment,
    orderPayment
}