import express from "express";
import ProjectDependencies from "../dependencies";
import { validator } from "../utilities/validator";
import { productStatusValidator, productValidator, updateProductValidator } from "./validator/product.validator";


/** @typedef {import('../database/models/product').Product} Product */
/** @typedef {import('./validator/product.validator').createProdcut} CreateProduct */



/**
 * global api router for every controller
 * @param {ProjectDependencies} dependencies 
 * @returns {express.Router}
 */
const ProductController = (dependencies) => {

    const router = express.Router();
    const { productRepository } = dependencies.DatabaseService;

    router.get('/getAll', async (req, res) => {
        res.status(200).send ( await productRepository.getAll() );
    });

    router.get('/getById', async (req, res) => {
        const { productId } = req.query; 
        if(!productId) return res.status(404).send({ message : "please add a product id in the query params"});
        let result = await productRepository.getById(productId);
        res.status(200).send(result)
    });

    router.post('/create-product',validator(productValidator), async (req, res) => {
        // req.body.primaryCategoryId = '00851956-3131-4757-be64-4732497dd39a';
        // res.send ( await productRepository.Create(req.body) );

        const { SKUVariants, ...product }  = req.body;
        // add the product sku for all the SKUvariants 
        if (SKUVariants){
            product.SKUs = SKUVariants.map(item => ({
                skuNumber: item.skuNumber,
                trackInventory: item.trackInventory,
                unitPrice: item.unitPrice
            }));
            
            // nest variantoptions object in productvariant object
            let variants = SKUVariants.map((sku, i) => sku.variants.map(option => option['optionName']));
            // transpose callback function of the matrix. 
            const transpose = (list) => {
                let longestArr = list.sort( (a,b) => b.length - a.length  )[0];
                return longestArr.map( (arr, i) =>  list.filter(b => b.length > i).map(x => x[i]) ) 
            }
            variants =  transpose(variants) // variants[0].map((col, i) => variants.map(row => row[i]))
            .map( (item) => Array.from(new Set(item)) )
            .map(variants => variants.filter(name => name ? true : false));
            
            variants = variants.filter(x => x.length > 0);
            if(!variants.every( x => x.length === product.ProductVariants?.length )) return res.status(404).send({ "message": [ 'Bad input' ] });
            product.ProductVariants.forEach((variant, index) => {
                variant.VariantOptions = variants[index].map(option => ({ name: option }));
            });

            // add variant options in skuVariants.
            const productVariants = product.ProductVariants.map(x => x.name);
            SKUVariants.forEach(sku => {
                sku.variants.forEach((v, i) => v['variantName'] = productVariants[i])
            });

            // product.ProductVariants.forEach((item, i) => {
            //     item.VariantOptions = [];
            //     let options = item.VariantOptions;
            //     variants[i].forEach(v => options.push(v));
            // })
            // SKUVariants.map((item) => {
            //     const options = item.variants;
            //     product.ProductVariants
            //     .push({
            //         name: options.name
            //     });
            // });
        }

        // else product.SKUs = [
        //     {
        //         skuNumber: product.productSKU,
        //         trackInventory: product.trackInventory,
        //         unitPrice: product.unitPrice
        //     }
        // ];

        // return res.send('this is the result.');

        const result = await productRepository.createProduct(product, SKUVariants);

        res.send(result);
        
    });

    router.put('/update-product', validator(updateProductValidator)  ,async (req, res) => {

        const {productId} = req.query;

        if(!productId) res.status(404).send({ message: "productId is not available"});


        const product = req.body;

        const result = await productRepository.updateProduct(product, productId);


        res.status(200).send(result)
    });

    router.patch('/change-status', validator(productStatusValidator), async (req, res) => {
        const { productId, status } = req.body;

        await productRepository.setStatus(status, productId);

        res.status(200).send();
    })

    return router;
}

export default ProductController;