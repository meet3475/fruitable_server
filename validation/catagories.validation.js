const Joi = require('joi');

const getcategory = {
    query: Joi.object().keys({
        cat_id:Joi.string().required()
    })
}

const createcategory =  {
    body: Joi.object().keys({
        name: Joi.string().required().max(30).uppercase().trim(),
        discription: Joi.string().required().max(100),
        image: Joi.string().allow('')
    })
}

const updatecategory =  {
    body: Joi.object().keys({
        name: Joi.string().required().max(30).uppercase().trim(),
        discription: Joi.string().required().max(100),
        image: Joi.string().allow('')
    }),
    params: Joi.object().keys({
        category_id: Joi.string().required()
    })
}

const deletecategory = {
    params: Joi.object().keys({
        category_id: Joi.string().required().max(24)
    })
}



module.exports = {
    createcategory,
    getcategory,
    updatecategory,
    deletecategory
}

