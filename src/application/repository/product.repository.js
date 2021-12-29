import { Sequelize } from "sequelize";
import db from "../../database/models";

const STATUS = { Active: 'Active', Draft: 'Draft' };

export default class ProductRepository{


    async getById(productId){
        const { Product, SKU, SKUValue, ProductVariant, VariantOption } = db;

        return await Product.findOne({
            where: {
                id: productId
            },
            include: [
                {
                    model: SKU,
                    include: [
                        {
                            model: SKUValue,
                            include: [
                                {
                                    model: ProductVariant,
                                    // as: 'productVarinats',
                                    attributes: []
                                },
                                {
                                    model: VariantOption,
                                    attributes: []
                                },
                            ],
                            attributes: [
                                // [ Sequelize.literal('"SKUs->SKUValues->ProductVariant"."name"'), 'productVariantName' ],
                                [ Sequelize.literal('"SKUs->SKUValues->VariantOption"."name"'), 'variantOptionName' ]
                            ]
                        }
                    ],
                    attributes: [ 
                        'id', 'skuNumber', 'trackInventory'
                    ]
                },
                {
                    model: ProductVariant,
                    include: [
                        {
                            model: VariantOption,
                            as: 'options',
                            attributes: ['name']
                        }
                    ],
                    as: 'variants',
                    attributes: ['name']
                }
            ],
            attributes: [ 'code', 'isActive', 'keywords', 'shortDiscription' ]
        });

    }

    async getAll(){
        const { Product, SKU } = db;
        try{
            return await Product.findAll({
                include: [{
                    model: SKU,
                    attributes: []
                }],
                attributes: ['id', 'keywords', 'hasVariant', 'status', 
                    [ db.Sequelize.fn('count', '*'), 'variantsCount '], 
                    [ db.Sequelize.fn('sum', db.Sequelize.col('"SKUs"."trackInventory"') ) , 'trackInventory' ] 
                ],
                group: ['Product.id', 'Product.keywords', 'Product.description', 'Product.hasVariant', 'Product.isActive', 'Product.status']
            });

            // return await Product.findAllAsync({
            //     attributes: ['id', 'title', 'status', 'description']
            // });
        }catch(e){
            console.error( e ); 
        }
    }

    /**
     * Create a product antoher funciton.
     * @param {Object} product
     * @returns {Promise<any>}
     */
    async create(product){
        try{
            const {Product, SKU, ProductVariant, VariantOption}  = db;
            const newProduct = await Product.create(product,
                { 
                    include: [
                        { model: SKU }, 
                        { model: ProductVariant, 
                            include: [
                                { model: VariantOption }
                            ]        
                        }
                    ],
                }
            );

            const productId = newProduct.getDataValue('id');
            const optionIdArr = newProduct.getDataValue('ProductVariants').map(item => {
                return item.VariantOptions.map(x => x.id); 
            }).flat();

            await VariantOption.update({ ProductId: productId  }, { where: { id: {
                [db.Sequelize.Op.in]: optionIdArr
            } } });


            return {
                id: newProduct.getDataValue('id'),
                SKUs: newProduct.getDataValue("SKUs").map(x => ({id: x.id, skuNumber: x.skuNumber})),
                ProductVariant: newProduct.getDataValue('ProductVariants').map(x => {
                    return {
                        id: x.id,
                        VariantOptions: x.VariantOptions.map(x => x.id)
                    }
                })
            }
        }catch(e){
            console.error(e );
        }
    }


    /**
     * Creates a product. Variants and variant option is optional feture, every variant/single-product is going to have multiple skus and SKUvalues
     * @param {Object} product
     * @param {Object} SKUVariants
     * @returns {Promise<any>}
     */
    async createProduct(product, SKUVariants){

        const productTransaciton = await db.sequelize.transaction();

        try{
            const {Product, SKU,  ProductVariant, VariantOption, SKUValue}  = db;

            if ( product.ProductVariants ) product.hasVariant = true;
            else product.hasVariant = false;

            const productOptions = {
                include: [
                    {
                        model: SKU
                    }
                ]
            };

            if (product.hasVariant) productOptions.include.push({ 
                // @ts-ignore
                model: ProductVariant, 
                include: [
                    { model: VariantOption }
                ]        
            });


            const newProduct = await Product.create(product, { transaction: productTransaciton, ...productOptions} );
            // product id is added in variant options after product has been created.
            await VariantOption.update({ productId: newProduct.getDataValue('id') }, { 
                where: { 
                    variantId: {
                        [db.Sequelize.Op.in]: (newProduct.getDataValue('ProductVariants')) ? newProduct.getDataValue('ProductVariants').map(item => item.id) : [] 
                    } 
                },
                transaction: productTransaciton
            });

            console.log(Array.from(newProduct.getDataValue('ProductVariants')).find(x => true));

            if(product.hasVariant){
                // this is incomplete program
                /**@type { import('../../database/models/product').Product } */
                const productObj = newProduct.get({ plain: true });
                const optionVariants = SKUVariants.map(( /**@type { import('../../database/models/sku').SKU }*/ sku) => {
                        let skuNumber = sku.skuNumber;
                        //@ts-ignore
                        return sku.variants.map(item => {
                            const variant = Array.from(newProduct.getDataValue('ProductVariants')).find(x => x.name === item['variantName']);
                            const { id: variantId } = variant;
                            const { id: optionId } = variant?.VariantOptions?.find(x => { return x.name === item['optionName']});
                            // SKUVariants.find(x => x)
                            return {
                                productId: newProduct.getDataValue('id'),
                                variantId: variantId,
                                optionId: optionId,
                                SKUId: productObj.SKUs?.find(x => x.skuNumber == skuNumber)?.id
                            }
                        });
                    }
                ).flat();

                await SKUValue.bulkCreate(optionVariants, { transaction: productTransaciton });
            }


            await productTransaciton.commit();
            

            return {
                id: newProduct.getDataValue('id'),
                // SKUs: newProduct.getDataValue("SKUs").map(x => ({id: x.id, skuNumber: x.skuNumber})),
                // ProductVariant: (newProduct.getDataValue('ProductVariants')) ? newProduct.getDataValue('ProductVariants').map(x => {
                //     return {
                //         id: x.id,
                //         VariantOptions: x.VariantOptions.map(x => x.id)
                //     }
                // }) : null
            };

        }catch(e){
            await productTransaciton.rollback();
            console.error(e);
        }
    }

    async updateProduct(product, id){
        
        const { Product, ProductVariant, VariantOption } = db;

        const { ProductVariants, ...productModel } = product;
        
        const updateProductTransaciton = await db.sequelize.transaction();

        try{

            await Product.update(productModel, { where: { id: id } });
    
    
            for(let variants of ProductVariants){
                variants.productId = id; 
                await ProductVariant.upsert(variants);
                
                const { VariantOptions } = variants;
    
                if(!VariantOptions) continue;
    
                for(let option of VariantOptions){
                    await VariantOption.upsert(option);
                }
            }
    
            await updateProductTransaciton.commit();
        }catch(e){
            await updateProductTransaciton.rollback();
            console.log(e);
        }
    }

    async setStatus(status, productId){
        const { Product } = db;

        const s =  STATUS[status];
        if(!s) throw new Error("Invalid Status");

        await Product.update({ status: s }, {
            where: {
                id: productId
            }
        });
    }

    updateVariantOptions(){

    }
}