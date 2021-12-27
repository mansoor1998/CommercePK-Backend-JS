import db from "../../database/models";

export default class InventoryRepository {
    /**
     * @typedef {Object} Message
     * @property {string} message - passing a friendly message.
    */

    /**
     * get all inventory items. Inventory SKU, trackInventory, variants, variant options
     * @returns { Promise } 
     */
    async getAll(){
        const {SKU, VariantOption, SKUValue} = db;
        try{
            return await SKU.findAllAsync({
                include: [
                    {
                        model: SKUValue,
                        include: [
                            {
                                model: VariantOption,
                                attributes: []
                            },
                        ],
                        attributes: [[ db.Sequelize.literal('"SKUValues->VariantOption".name') , 'variantName']]
                    }
                ],
                attributes: ['id', 'productId', 'skuNumber', 'trackInventory']
            });
        }catch(e){
            throw e;
        }
        
    }

    /**
     * get a single variant of a product with details of SKU, its varaiants and variant options.
     * @param {string} SKUId 
     * @returns {Promise}
     */
    async getById(SKUId){
        const { SKU, ProductVariant, VariantOption } = db;

        return await SKU.findOneAsync({
            where: {
                id: SKUId
            },
            include: [
                {
                    model: ProductVariant,
                    include: [{
                        mode: VariantOption,
                        attributes: ['name']
                    }],
                    attrbutes: ['name']
                }
            ]
        });
    }

    /**
     * adjust(increment/decrement or set) the quantity of SKU of the product
     * @param {{ quantity: number, operationName: string, SKUId: string }} inventory 
     * @return {Promise<void>}
     */
    async adjustQuantity(inventory){
        const { SKU } = db;
        const { quantity, operationName, SKUId } = inventory

        try{
            switch (operationName){
                case 'SetInventory':
                    await SKU.increment('trackInventory', { by: quantity, where: { SKUId: SKUId } })
                    break;
                case 'IncrementInventory':
                    await SKU.update({ 
                        trackInventory: quantity
                    }, {
                        where: {
                            id: SKUId
                        }
                    });    
                    break;
                default:
                    throw new Error("Operation Name Error");
            }
        }catch(e){
            throw e
        }
        
    }

    /**
     * soft delet the inventory SKUid and same in the SKUValues table.
     * @param {string} SKUId 
     */
    async deleteVariant(SKUId){
        const { SKU, SKUValue } = db;

        const inventoryTransaciton = await db.sequelize.transaction();

        try{
            await SKU.softDeleteAsync({
                where: {
                    id: SKUId
                }
            });
    
            await SKUValue.softDeleteAsync({
                where: {
                    id: SKUId
                }
            });

            await inventoryTransaciton.commit();
        }catch(e){
            await inventoryTransaciton.rollback();
            throw e;
        }
    }

}