const express = require('express');
const { reviewsController } = require('../../../controller');

const routes = express.Router();

routes.get(
    '/list-review', 
    reviewsController.listReviews
)

routes.get(
    '/get-review/:reviews_id', 
    reviewsController.getReviews
)

routes.post(
    '/create-review', 
    reviewsController.creatReviews
)

routes.put(
    '/update-review/:reviews_id',
    reviewsController.updateReviews
)

routes.delete(
    '/delete-review/:reviews_id',
    reviewsController.deleteReviews
)

routes.get(
    '/approve/:reviews_id', 
    reviewsController.getReviews
)

routes.get(
    '/reject/:reviews_id', 
    reviewsController.getReviews
)

routes.get(
    '/user/:user_id', 
    reviewsController.reviewofuser
)

routes.get(
    '/product/:product_id', 
    reviewsController.reviewofproduct
)

routes.get(
    '/no-reviews', 
    reviewsController.noreviewProduct
)

routes.get(
    '/top-rated-products', 
    reviewsController.toprate
)

routes.get(
    '/speuser/:user_id', 
    reviewsController.specificeUser
)

routes.get(
    '/with-comments', 
    reviewsController.withcomment
)

routes.get(
    '/count-products', 
    reviewsController.countProduct
)
module.exports = routes;