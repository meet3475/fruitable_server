const Users = require('../model/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sentMail = require('../utils/nodemailer');

const craeteToken = async (id) => {
    try {
        const user = await Users.findOne(id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not fond"
            })
        }

        console.log(user);

        const accessToken = await jwt.sign({
            _id: user._id,
            role: user.role,
            expiresIn: '1 hours'
        },
            process.env.USER_ACCESS_TOKEN_KEY,
            { expiresIn: 3600 }
        )

        const refreshToken = await jwt.sign({
            _id: id,
        },
            process.env.USER_REFRESH_TOKEN_KEY,
            { expiresIn: '10 days' }
        )

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        console.log(error.message);
    }
}


const ragister = async (req, res) => {

    console.log(req.body);

    // console.log(req.file);


    try {

        const { email, password } = req.body

        const user = await Users.findOne({
            $or: [{ email }]
        })

        if (user) {
            return res.status(409).json({
                success: false,
                message: "user alredy exist"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const userData = await Users.create({ ...req.body, password: hashPassword, }) //avtar: req.file.path

        if (!userData) {
            return res.status(500).json({
                success: false,
                message: "create hash password error"
            })
        }

        const userDataF = await Users.findById({ _id: userData._id }).select("-password")

        if (!userDataF) {
            return res.status(500).json({
                success: false,
                message: "internal server error" + error.message
            })
        }

        // const { accessToken, refreshToken } = await craeteToken(userData._id);

        await sentMail(email);

        res.status(201).json({
            success: true,
            message: "ragister succesfully",
            data: userDataF,
            // tokens: { accessToken, refreshToken }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}

const ragisterOTP = async (req, res) => {

    res.status(200).json({
        success: true,
        message: "ragister with OTP succesfully"
    })

}

const verifyotp = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "verify with OTP succesfully"
    })
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({
            $or: [{ email }]
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user are not exist."
            })
        }

        const variPassword = await bcrypt.compare(password, user.password)

        if (!variPassword) {
            return res.status(400).json({
                success: false,
                message: "invalid Credistional"
            })
        }

        const { accessToken, refreshToken } = await craeteToken(user._id)

        console.log({ accessToken, refreshToken });

        // res.status(200).json({
        //     success: true,
        //     message: "login successful",
        //     tokens: { accessToken, refreshToken }
        // });


        const userDataF = await Users.findById({ _id: user._id }).select("-password -refreshToken")

        const accessTokenoption = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 60 * 60 * 1000,

        }

        const refreshTokenoption = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 60 * 60 * 24 * 10 * 1000,

        }

        res.status(200)
            .cookie("accessToken", accessToken, accessTokenoption)
            .cookie("refreshToken", refreshToken, refreshTokenoption)
            .json({
                success: true,
                message: "Login Sucessfully",
                data: {
                    ...userDataF.toObject(),
                    accessToken
                }
            })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}

const generateNewTokens = async (req, res) => {
    try {
        console.log("generateNewTokens", req.cookies.refreshToken);

        const VerifyToken = await jwt.verify(req.cookies.refreshToken, process.env.USER_REFRESH_TOKEN_KEY);
        console.log(VerifyToken);

        if (!VerifyToken) {
            return res.status(400).json({
                success: false,
                message: "Invalid Token"
            })
        }

        const user = await Users.findById(VerifyToken._id);
        console.log(user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Define"
            })
        }

        if (req.cookies.refreshToken != user.toObject().refreshToken) {
            return res.status(400).json({
                success: false,
                message: "Invalid Token"
            })
        }

        const { accessToken, refreshToken } = await craeteToken(user._id)

        console.log({ accessToken, refreshToken });

        const option = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 30 * 24 * 60 * 60 * 1000
            
        }

        res.status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", refreshToken, option)
            .json({
                success: true,
                message: "Refresh Token Sucessfully",
                data: {
                    accessToken
                }
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        console.log(req.body._id);

        const user = await Users.findByIdAndUpdate(
            req.body._id,
            {
                $unset: { refreshToken: 1 }
            },
            {
                new: true
            }
        )

        console.log(user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Logout"
            });
        }

        res.status(200)
            .clearCookie("accessToken")
            .clearCookie("refreshToken")
            .json({
                success: true,
                message: "User Logeed Out."

            });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}

const checkAuth = async (req, res) => {
    try {
        const accessToken = req.cookies.accessToken
        console.log(accessToken);

        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: "Token not Found."
            });
        }

        const verifyUser = await jwt.verify(accessToken, process.env.USER_ACCESS_TOKEN_KEY)
        console.log(verifyUser);

        if (!verifyUser) {
            return res.status(400).json({
                success: false,
                message: "Token Expire or Invalid Token."
            });
        }

        res.status(200).json({
            success: true,
            data: verifyUser,
            message: "User Authenticated."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}



module.exports = {
    ragister,
    ragisterOTP,
    verifyotp,
    login,
    generateNewTokens,
    logout,
    checkAuth,
    craeteToken
} 