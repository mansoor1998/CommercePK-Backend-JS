import { Sequelize } from 'sequelize';
import db from '../../database/models';


export default class UserRepository {
    /**
     * @param {Object} user
     * @returns {Promise<any>} Returns a string.
    */
    async Create(user){
        const  { User } = db;
        const res = User.build(user);
        //@ts-ignore
        res.creationTime = new Date();
        return await res.save();
    } 

    async getAll(){
        const { User, UserDetail } = db;
        return await User.findAll();
    }

    async getAllUserRoles(){
        const { User, Role, UserRole, UserDetail } = db;

        return await User.findAll({
            include: [{
                model: Role,
                attributes: ['name'],
                through: { attributes: [] }
            }],
            attributes: ['username', 'firstName', 'email']
        });
    }

    async test(){
        const { Product, SKU, ProductVariant, SKUValue, VariantOption } = db;

        // return await Product.findAll({
        //     include: [{
        //         model: ProductVariant,
        //         attributes: ['name', 'id'],
        //         include: [
        //             {
        //                 model: VariantOption,
        //                 attributes: ['name', 'id']
        //             }
        //         ]
        //     }],
        //     attributes: ['shortDiscription', 'id']
        // });


        // const result = await SKUValue.findAll({
        //     where: {
        //         productId: '7bde8a1d-5f6c-4349-bfda-428399c88291'
        //     },
        //     include: [
        //         {
        //             model: SKU
        //         },
        //         {
        //             model: VariantOption,
        //             attributes: []
        //         },
        //         {
        //             model: ProductVariant,
        //             attributes: []
        //         }
        //     ],
        //     attributes: [
        //         'SKUId',
        //         [Sequelize.literal('"ProductVariant"."name"'), 'productVariant'],
        //         [Sequelize.literal('"VariantOption"."name"'), 'variantOption']
        //     ]
        // });

        return await SKU.findAll({
            where: {
                productId: '7bde8a1d-5f6c-4349-bfda-428399c88291'
            },
            include: [
                {
                    model: SKUValue,
                    include: [{
                        model: ProductVariant,
                        include: [
                            {
                                model: VariantOption,
                                attributes: ['name']
                            }
                        ],
                        attributes: ['name', 'description']
                    }],
                    attributes: {
                        exclude: ['productId', 'variantId', 'SKUId']
                    }
                }
            ],
            attributes: ['productId', 'skuNumber', 'skuName', 'skuMessage', 'smallImage', 'mediumImage', 'largeImage']
        });

        // return result;

        // let map = {};

        // result.forEach(item => {
        //     if ( !map[item.get('SKUId')] ) {
        //         map[item.get('SKUId')] = [{ productVariant: item.get('productVariant'), variantOption: item.get('variantOption') }];
        //         return;
        //     }
        //    map[item.get('SKUId')].push( { productVariant: item.get('productVariant'), variantOption: item.get('variantOption') } );
        // });

        // return map;
    }
}
