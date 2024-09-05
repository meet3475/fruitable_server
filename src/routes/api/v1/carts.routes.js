const express = require('express');
const { cartsController } = require('../../../controller');

const routes = express.Router();

routes.get(
    '/list-cart', 
    cartsController.listcarts
)

routes.post(
    '/add-to-cart', 
    cartsController.addcart
)

routes.put(
    '/update-cart/:cart_id',
    cartsController.updatecart
)

routes.put(
    '/update-quantity/:cart_id',
    cartsController.updatequantity
)

routes.get(
    '/user/:user_id',
    cartsController.getcartUser
)

routes.delete(
    '/delete-cart/:cart_id/:product_id',
    cartsController.deleteCart
)


module.exports = routes;