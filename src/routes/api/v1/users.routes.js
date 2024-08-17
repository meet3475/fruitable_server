const express = require("express");
const { usersController } = require("../../../controller");
const passport = require("passport");
const sentMail = require("../../../utils/nodemailer");
const exportpdfmake = require("../../../utils/pdfmake");
const { sendOTP, verifyOTP } = require("../../../utils/twilio");
const upload = require("../../../middlewar/upload");
const { craeteToken } = require("../../../controller/users.controller");



const routes = express.Router();


routes.post(
    '/register',
    // upload.single('avtar'),
    usersController.ragister
)

routes.post(
    '/registerOTP',
    sendOTP,
    usersController.ragisterOTP
)

routes.post(
    '/verifyOTP',
    verifyOTP,
    usersController.verifyotp
)


routes.post(
    '/login',
    usersController.login
)

routes.post(
    '/generateNewTokens',
    usersController.generateNewTokens
)

routes.post(
    '/logout',
    usersController.logout
)

routes.get(
    '/checkAuth',
    usersController.checkAuth
)

routes.get(
    '/googleLogin',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

routes.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async function (req, res) {
        console.log("login sucessfully");
        // Successful authentication, redirect home.
        // res.redirect('/');

        console.log("mmmmm");
        console.log(req.isAuthenticated());
        console.log("session", req.session);
        console.log("user_data", req.user);
        console.log("nnnn");

        if (req.isAuthenticated()) {

            const { accessToken, refreshToken } = await craeteToken(req.user._id)

            console.log({ accessToken, refreshToken });

            const accessTokenoption = {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 1000
            }

            const refreshTokenoption = {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24 * 10 * 1000
            }

            res.status(200)
                .cookie("accessToken", accessToken, accessTokenoption)
                .cookie("refreshToken", refreshToken, refreshTokenoption)
                .redirect("http://localhost:3000/")

        }
    });


routes.get(
    '/facebookLogin',
    passport.authenticate('facebook', { scope: ["public_profile", "email"] })
);

routes.get(
    '/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        console.log("login sucessfully");
        // Successful authentication, redirect home.
        res.redirect('/');
    });


// routes.get(
//     '/sendMail',
//     sentMail
// )

routes.get(
    '/pdfmake',
    exportpdfmake
)




module.exports = routes;