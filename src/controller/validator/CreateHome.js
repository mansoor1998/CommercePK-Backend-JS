import joi from 'joi';

const obj = joi.object({
    address: joi.string().required()
});

// nesting is also possible.

const createHomeDto = joi.object({
    id : joi.number().required(),
    name: joi.string().required(),
    address: joi.string().required(),
    city: joi.string().required(),
    postalCode: joi.string().pattern(/^[0-9]+$/).required(),
    invoice: obj.required()
});

export { createHomeDto }


