const express = require('express');
const { variantsController } = require('../../../controller');
const upload = require('../../../middlewar/upload');

const routes = express.Router();

routes.get(
    '/list-variant',
    variantsController.listVariants
)

routes.get(
    '/get-variant/:variant_id',
    variantsController.getVariant
)

routes.post(
    '/add-variant',
    upload.single("variant_img"),
    variantsController.addVariant
)

routes.put(
    '/update-variant/:variant_id',
    upload.single("variant_img"),
    variantsController.updateVariant
)

routes.delete(
    '/delete-variant/:variant_id',
    variantsController.deleteVariant
)

routes.get(
    '/list-variant/:product_id',
    variantsController.particularProduct
)

routes.get(
    '/count-stock/:product_id',
    variantsController.countStock
)

routes.get(
    '/low-quantity',
    variantsController.lowQuantity  
)

routes.get(
    '/high-price',
    variantsController.highPrice  
)

routes.get(
    '/multiple-variants',
    variantsController.multipleVariants  
)

routes.get(
    '/active',
    variantsController.countActive  
)

routes.get(
    '/count-products',
    variantsController.countProduct  
)
module.exports = routes;