import FullAuditModel from "../database/utilities/fullaudit.model";

export class ReturnDto {

    /**
     * @typedef {Object} error
     * @property {string[]} message - passing a friendly message.
    */

    /**
     * Generic method create to create an entity in a model. 
     * @param {JSON | Object | FullAuditModel | null} body
     * @param {error | null} error
     */
    constructor(body = {}, error = { message: [] }){
        this.body = body;
        this.error = error;
    }
}