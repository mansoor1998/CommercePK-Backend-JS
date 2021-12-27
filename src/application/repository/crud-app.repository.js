import FullAuditModel from "../../database/utilities/fullaudit.model";

export default class CrudAppRepository {
    /**
     * @typedef {Object} Message
     * @property {string} message - passing a friendly message.
    */

    /**
     * Getting the actual database model and selected attibutes from the query result. attributes only for getAll, getById 
     * @param {typeof FullAuditModel} model
     * @param {string[]?} attributes 
     */
    constructor(model, attributes){
        if ( !model ) throw new Error('model does not exist');
        this.model = model;
        if(attributes) 
            this.attributes = attributes;
    }

    
    
    /**
     * Generic getAll method to return all fields from entity. 
     * @return {Promise<FullAuditModel[]>} 
     */
    async getAll(){
        return await this.model.findAllAsync( (this.attributes) ? {
            attributes: this.attributes
        } : {});
    }

    /**
     * Generic getAll method to return all fields from entity. 
     * @param {string | number} Id
     * @return {Promise<FullAuditModel>} 
     */
    async getById(Id){
        /**@type {import("sequelize/types").NonNullFindOptions} */
        const options = {
            where: {
                id: Id
            },
            rejectOnEmpty: undefined
        };
        return await this.model.findOneAsync( (this.attributes) ? {
            ...options,
            attributes: this.attributes
        } : { ...options } );
    }

    /**
     * Generic method create to create an entity in a model. 
     * @param {FullAuditModel} body
     * @return {Promise<FullAuditModel | Object>} 
     */
    async create(body){
        // body.CreationTime;
        // body.CreatorUserId;
        const response = await this.model.createAsync(body, { attributes: this.attributes });
        const returnBody = {};
        for(let attribute of this.attributes){
            returnBody[attribute] = response[attribute]
        }

        return returnBody;
    }

    /**
     * Generic method update to update an entry in the database table. 
     * @param {FullAuditModel} body
     * @return {Promise<void>} 
     */
    async update(id, body){
        // body.UpdationTime
        // body.updatorUserId
        await this.model.updateAsync(body, {
            where: {
                id: id
            }
        });
    }

    /**
     * Generic method delete to softDeleteAsync an entity. 
     * @param {string | number} id
     * @return {Promise<[number, FullAuditModel[]]>} 
     */
    async softDeleteAsync(id){
        return await this.model.softDeleteAsync({
            where: {
                id: id
            }
        });
    }

    async getAllIncluding(){

    }
}