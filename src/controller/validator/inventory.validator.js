import joi from 'joi';

export const InventoryLevel = joi.object({
    SKUId: joi.string().required(),
    quantity: joi.string().required(),
    operationName: joi.string().required()
});