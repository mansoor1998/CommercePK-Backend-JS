import Joi from "joi";
import joi from "joi";

const arrayUnique = joi.array().unique((a, b) => a.receiverId === b.receiverId && a.senderId === b.senderId);


export const SKUValidator = joi.object({
    skuNumber: joi.string().required(),
    skuName: joi.string().required(),
    skuMessage: joi.string().required(),
    trackInventory: joi.number().required(),
    inventoryLevel: joi.number().required(),
    smallImage: joi.string().required(),
    mediumImage: joi.string().required(),
    largeImage: joi.string().required()
});

/**
 * @typedef {Object} createProductVariants
 * @property {string} name
 * @property {string} description
 * @property {string} code
 */

const createProductVariants = {
    name: joi.string().required(),
    description: joi.string(),
    code: joi.string()
    // VariantOptions: joi.array().items(joi.object({
    //     name: joi.string(),
    //     description: joi.string()
    // })).required().unique( (a, b) => a.name === b.name )
}
export const productVariants = joi.object(createProductVariants);


/**
 * @typedef {Object} createSKUVariants
 * @property {string} skuNumber
 * @property {string} trackInventory
 * @property {string} unitPrice
 * @property {Array<{ 'optionName': string }>} variants
 */
const createSKUVariants = {
    skuNumber: joi.string().required(),
    trackInventory: joi.number().required(),
    unitPrice: joi.number().required(),
    variants: joi.array().items(joi.object({
        // "variantName": joi.string(),
        "optionName": joi.string().required()
    }))
}
export const SKUVariants = joi.object(createSKUVariants);



/**
 * @typedef {Object} createProdcut
 * @property {string} code
 * @property {string} keywords
 * @property {string} shortDiscription
 * @property {string} description
 * @property {number} unitCost
 * @property {string} productSKU
 * @property {number} trackInventory
 * @property {number} unitPrice
 * @property {number} weight
 * @property {string} smallImage
 * @property {string} mediumImage
 * @property {string} largeImage
 * @property {createSKUVariants} ProductVariants
 * @property {createProductVariants} SKUVariants
 */
const createProduct = {
    code: joi.string().required(),
    keywords: joi.string(),
    shortDiscription: joi.string(),
    description: joi.string(),
    unitCost: joi.number().required(),
    productSKU: joi.string(),
    trackInventory: joi.number(),
    unitPrice: joi.number(),
    weight: joi.number(),
    smallImage: joi.string(),
    mediumImage: joi.string(),
    largeImage: joi.string(),
    ProductVariants: joi.array().items(productVariants).unique((a,b) => a.name === b.name),
    SKUVariants: joi.array().items(SKUVariants)
}

export const productValidator = joi.object(createProduct);
// .custom((product, helper) => {
//     if (!product.ProductVariants) return;
//     const variants = product.ProductVariants.map( x => ({ name: x.name, VariantOptions: x.VariantOptions.map(x => x.name) }) );
//     const { SKUVariants } = product;
//     for(let item of SKUVariants){
//         // @ts-ignore
//         let itemVariants = item.variants.map(x => ({ variantName: x['variantName'], optionName: x['optionName'] }));

//         // check if the itemVariants are available in all variants and its sub options.
//         let result = itemVariants.filter( x =>  variants.find(y => y.name === x.variantName)?.VariantOptions.includes(x.optionName) );
//         if ( result.length != variants.length ) return helper.error("any.invalid");
//     }
// });


export const updateProductVariants = joi.object({
    id: joi.string(),
    name: joi.string().required(),
    description: joi.string().required(),
    VariantOptions: joi.array().items(joi.object({
        id: joi.string(),
        name: joi.string(),
        description: joi.string()
    })).unique( (a, b) => a.name === b.name )
});

// will look at this validator later.
const updateSKUValidator = joi.object({
    skuId: joi.string().required(),
    skuNumber: joi.string().required(),
    trackInventory: joi.number().required(),
    unitPrice: joi.number().required(),
    variants: joi.array().items(joi.object({
        variantId: joi.string(),
         optionId: joi.string(),
        "variantName": joi.string(),
        "optionName": joi.string().required()
    }))
});


export const updateProductValidator = joi.object({
    keywords: joi.string().required(),
    shortDescription: joi.string().required(),
    description: joi.string().required(),
    unitCost: joi.number().required(),
    unitPrice: joi.number().required(),
    weight: joi.number().required(),
    smallImage: joi.string().required(),
    mediumImage: joi.string().required(),
    largeImage: joi.string().required(),
    ProductVariants: joi.array().items(updateProductVariants).unique((a,b) => a.name === b.name),
});

export const productStatusValidator = joi.object({
    productId: joi.string().required(),
    status: joi.string().required()
});


