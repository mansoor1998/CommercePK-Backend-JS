const { Model } = require("sequelize");


/**
 * @typeparam {T} the type parameter
 * @constructor {FullAuditModel.<T>}
*/
module.exports = class FullAuditModel extends Model {

    /**
     * select all rows with filter options.
     * @param {object} options - filter where query
     * @returns {Promise<FullAuditModel[]>} 
     */
    static async findAllAsync(options){
        try{
            options = {};
            options.where = (options.where) ? { isDeleted: false, ...options.where } : { isDeleted: false };
            return await this.findAll(options);
        }catch(e){
            throw e;
        }
    }

    /**
     * select first or default with filter options.
     * @param {import("sequelize").NonNullFindOptions<any>} options - filter where query
     * @return {Promise<FullAuditModel>}
     */
    static async findOneAsync(options){
        try{
            options.where = (options.where) ? { isDeleted: false, ...options.where } : { isDeleted: false };
            return await this.findOne(options);
        }catch(e){
            throw e;
        }
    }

    /**
     * create a database row.
     * @param {object} options - filter where query
     * @return {Promise<FullAuditModel>}
     */
    static async createAsync(model, options){
        // creation time.date and the creator id is added in the options. (currently, id is not available middleware is not implemented)
        try{
            if(!options) options = {};
            model.creationTime = new Date();
            // options.creatorUserId = user.id
            return await this.create(model, options);    
        } catch(e){
            throw e;
        }
    }

    /**
     * update a database row.
     * @param {object} options - filter where query
     * @return {Promise<[number, FullAuditModel[]]>}
     */
    static async updateAsync(model, options){
        try{
            if ( options.where ) options.where = { isDeleted: false, ...options.where }
            model.UpdationTime = new Date();
            return await this.update(model, options);    
        } catch(e){
            throw e;
        }
    }

     /**
     * set isDeleted to true.
     * @param {object} options - filter where query
     * @return {Promise<[number, FullAuditModel[]]>}
     */
    static async softDeleteAsync(options){
        try{
            return await this.update({ isDeleted: true, deletionTime: new Date() }, options);
        } catch(e){
            throw e;
        }
    }

     /**
     * delete a row from database.
     * @param {object} options - filter where query
     * @return {Promise<number>}
     */
    static async deleteasync(options) {
        try{
            return await this.destroy(options);
        }catch(e){
            throw e;
        }
    }
}
