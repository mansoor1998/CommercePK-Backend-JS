import joi from 'joi';

export const createUserDetail = joi.object({
    address: joi.string().required(),
    city: joi.string().required(),
    postalCode: joi.string().required(),
    country: joi.string().required(),
    mobile: joi.string().required()
});

export const createUser = joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().required()
            .pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,6}|[0-9]{1,3})(\]?)$/)
            .messages({
                "string.pattern.base": "email pattern is invalid"
            })
    // userDetail: createUserDetail
});
