const { Salespeople } = require("../model");


const listsalespeople = async (req, res) => {
    console.log("Abcd");

    try {
        const salesPeople = await Salespeople.getSalespeople();

        res.status(200).json({
            success: true,
            message: "salespeople fetched sucessfully",
            data: salesPeople
        })

        console.log(salesPeople);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: []
        })
    }
}

const postsalespeople = async (req, res) => {
    try {

        const { sname, city, comm, isActive } = req.body;

        const salesPeople = await Salespeople.addSalespeople(sname, city, comm, isActive);

        console.log(salesPeople);


        res.status(201).json({
            success: true,
            message: "salespeople creted sucessfully",
            data: salesPeople
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: []
        })
    }
}

const deletesalespeople = async (req, res) => {

    try {
        const {snum} = req.params

        const salesPeople = await Salespeople.deleteSalespeople(snum);

        console.log(salesPeople);

        res.status(200).json({
            success: true,
            message: "salespeople deleted sucessfully",
            data: salesPeople
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: []
        })
    }
}

const updateSalespeople = async (req, res) => {
    try {
        const {snum} = req.params

        const {sname, city, comm, isActive} = req.body

        const salesPeople = await Salespeople.updateSalespeople(snum, sname, city, comm, isActive);

        console.log(salesPeople);

        res.status(200).json({
            success: true,
            message: "salespeople updated sucessfully",
            data: salesPeople
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: []
        })
    }
}



module.exports = {
    listsalespeople,
    postsalespeople,
    deletesalespeople,
    updateSalespeople
}