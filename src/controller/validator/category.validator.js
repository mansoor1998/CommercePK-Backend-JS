import joi from 'joi'

export const CreateCategoryValidator = joi.object({
    code: joi.string().required(),
    name: joi.string().required(),
    description: joi.string().required(),
    displayName: joi.string().required()
});
