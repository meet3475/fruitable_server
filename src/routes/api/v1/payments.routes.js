const express = require('express');
const { paymentsController } = require('../../../controller');


const routes = express.Router();

routes.get(
    '/list-payment', 
    paymentsController.listPayment
)

routes.get(
    '/get-payment/:payment_id', 
    paymentsController.getPayment
)

routes.post(
    '/create-payment', 
    paymentsController.createPayment
)

routes.put(
    '/update-payment/:payment_id',
    paymentsController.updatePayment
)

routes.delete(
    '/delete-payment/:payment_id',
    paymentsController.deletePayment
)

routes.get(
    '/order/:order_id', 
    paymentsController.orderPayment
)

module.exports = routes;