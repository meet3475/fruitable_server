const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONENCT_URL)
                                                                                                   //
            .then(() => console.log("mongoDB is Sucessfully Conencted"))
            .catch((error) => console.log("mongoDB is data based not Conencted" + error))

    } catch (error) {
        console.log("mongoDB is data based not Conencted" + error)
    }

}

module.exports = connectDB



