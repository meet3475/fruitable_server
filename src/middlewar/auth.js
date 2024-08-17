
const jwt = require("jsonwebtoken")
const Users = require("../model/users.model")

const auth = (roles=[]) => async (req, res, next) => {
    console.log(roles);
    
    try {
        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not Available"
            })
        }

        try {
            const variToken = await jwt.verify(token, "fshjkjhjkas4578ghks")
            console.log(variToken);

            const user = await Users.findById(variToken._id)
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not Found"
                })
            }

            console.log(user, roles);

            if (!roles.some((v) => v === user.role)) {
                return res.status(404).json({
                    success: false,
                    message: "You have Not Access"
                })
            }

            console.log("ok");

            req.user = user;

            next();
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid Token"
            })
        }


    } catch (error) {
        return res.status(500).json({
                success: false,
                message: "Internal server error " + error.message
            })
    }
}

module.exports = auth;