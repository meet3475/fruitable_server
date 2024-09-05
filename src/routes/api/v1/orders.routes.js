const express = require('express');
const { ordersController } = require('../../../controller');


const routes = express.Router();

routes.get(
    '/list-order', 
    ordersController.listOrder
)

routes.get(
    '/get-order/:order_id', 
    ordersController.getOrders
)

routes.put(
    '/update-order/:order_id',
    ordersController.updateOrders
)

routes.delete(
    '/delete-order/:order_id',
    ordersController.deleteOrder
)

routes.get(
    '/user/:user_id', 
    ordersController.alluser
)

routes.get(
    '/seller/:user_id', 
    ordersController.allsellar
)

routes.get(
    '/product/:product_id', 
    ordersController.allsellar
)

routes.get(
    '/cancel/:order_id', 
    ordersController.cancelorder
)

routes.post(
    '/place-order',
    ordersController.placeOrder
)

module.exports = routes;