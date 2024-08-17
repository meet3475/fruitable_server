const express = require("express");
const { categoriesController } = require("../../../controller");
const auth = require("../../../middlewar/auth");
const { Validation } = require("../../../middlewar/validation");
const { categoryValidation } = require("../../../../validation");


const routes = express.Router();

//localhost:3000/api/v1/categories/list-categories
routes.get(
    '/list-categories',
    // auth(["admin", "user"]),
    categoriesController.listcategories
)

// routes.get(
//     '/get-categories/:category_id', 
//     categoriesController.getcategory
// )

routes.get(
    '/get-categories',
    Validation(categoryValidation.getcategory),
    categoriesController.getcategory
)

routes.get(
    '/count-active',
    categoriesController.countActive
)

routes.get(
    '/most-products',
    categoriesController.mostProducts
)

routes.get(
    '/total-products',
    categoriesController.totalProducts
)

routes.get(
    '/inactive',
    categoriesController.listInactive
)

routes.get(
    '/count-subcategories',
    categoriesController.countSubcategories
)

routes.get(
    '/category-subcategory/:category_id',
    categoriesController.specificCategory
)

routes.post(
    '/add-categories', 
    Validation(categoryValidation.createcategory),
    categoriesController.addcategory
)

routes.put(
    '/update-category/:category_id', 
    Validation(categoryValidation.updatecategory),
    categoriesController.updatecategory
)

routes.delete(
    '/delete-category/:category_id', 
    Validation(categoryValidation.deletecategory),
    categoriesController.deletecategory
)


module.exports = routes;