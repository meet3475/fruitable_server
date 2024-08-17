const express = require("express");
const { subcategoriesController } = require("../../../controller");

const routes = express.Router();

//localhost:3000/api/v1/subcategories/list-subcategories
routes.get(
    '/list-subcategories', 
    subcategoriesController.listsubcategories
)

routes.get(
    '/parent-of-subcategory/:category_id', 
    subcategoriesController.parentOfSubcategory
)

routes.get(
    '/count-active', 
    subcategoriesController.countActive
)

routes.get(
    '/most-products', 
    subcategoriesController.mostProducts
)

routes.get(
    '/inactive', 
    subcategoriesController.countInactive
)

routes.get(
    '/count-products', 
    subcategoriesController.countProducts
)

routes.get(
    '/bycategory-list-subcategories/:category_id', 
    subcategoriesController.getcategorybysubcategory
)

routes.get(
    '/get-subcategories/:subcategories_id', 
    subcategoriesController.getsubcategory
)

routes.post(
    '/add-subcategories', 
    subcategoriesController.addsubcategory
)

routes.put(
    '/update-subcategory/:subcategories_id',
    subcategoriesController.updatesubcategory 
   
)

routes.delete(
    '/delete-subcategory/:subcategories_id', 
    subcategoriesController.deletesubcategory
)


module.exports = routes;