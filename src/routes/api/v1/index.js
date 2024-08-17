const express = require("express");

const routes = express.Router();

const categoriesRoute = require("./categories.routes");
const subcategoriesRoute = require("./subcategories.routes");
const productsRoute = require("./products.routes");
const variantsRoute = require("./variants.routes");
const salespeopleRoute = require("./salespeople.routes");
const usersRoute = require("./users.routes");

//localhost:3000/api/v1/categories
routes.use("/categories", categoriesRoute);
//localhost:3000/api/v1/subcategories
routes.use("/subcategories", subcategoriesRoute);
//localhost:3000/api/v1/products
routes.use("/products", productsRoute);
//localhost:8000/api/v1/variants
routes.use("/variants", variantsRoute);
//localhost:8000/api/v1/salespeople
routes.use("/salespeople", salespeopleRoute);
//localhost:8000/api/v1/users
routes.use("/users", usersRoute);

module.exports = routes;