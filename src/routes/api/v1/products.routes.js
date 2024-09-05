const express = require("express");
const { productsController } = require("../../../controller");
const upload = require("../../../middlewar/upload");

const routes = express.Router();

//localhost:3000/api/v1/products/list-products
routes.get(
    '/list-products',
    productsController.listproducts
)

routes.get(
    '/search/:name',
    productsController.searchName
)

routes.get(
    '/list-category/:category_id',
    productsController.productsByCategory
)

routes.get(
    '/list-subcategory/:subcategory_id',
    productsController.productsBySubcategory
)

routes.get(
    '/top-rated',
    productsController.topRate
)

routes.get(
    '/new-arrivals',
    productsController.newArrivals
)

routes.get(
    '/count-categories',
    productsController.countCategories
)

routes.get(
    '/get-products/:product_id', 
    productsController.getproducts
)

routes.post(
    '/add-products',
    upload.single("product_img"), 
    productsController.addproducts
)

routes.put(
    '/update-products/:product_id', 
    upload.single("product_img"), 
    productsController.updateproducts
)

routes.delete(
    '/delete-products/:product_id', 
    productsController.deleteproducts
)

routes.get(
    '/searchproduct',
    productsController.searchProduct
)

routes.get(
    '/discount',
    productsController.discountProduct
)

module.exports = routes;