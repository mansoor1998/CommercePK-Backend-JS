import CrudAppRepository from "../application/repository/crud-app.repository";
import HomeRepository from "../application/repository/home.repository";
import InventoryRepository from "../application/repository/inventory.repository";
import ProductRepository from "../application/repository/product.repository";
import UserRepository from "../application/repository/user.repository";
import FullAuditModel from "../database/utilities/fullaudit.model";

export default class DatabaseService {
    constructor(){
        // Creating repositories inside here
        this.homeRepository = new HomeRepository();
        this.userRepository = new UserRepository();
        this.productRepository = new ProductRepository();
        this.inventoryRepository = new InventoryRepository();
    }

    /**
     * Generic function for returing a repository based on the database model provided
     * @param {typeof FullAuditModel} model 
     * @param {string[] | null} attributes 
     * @returns {CrudAppRepository}
     */
    getCrudAppRepository(model, attributes){
        return new CrudAppRepository(model, attributes);
    }


    /**
     * Initiazlize the database server.
     * @returns {Promise<boolean|any>} returning a promise of type boolean.
    */
    async initDatabase(){
        const db = await import('../database/models');
        //const a = db.sequelize.authenticate();

        try{
            await db.default.sequelize.authenticate();
            return Promise.resolve();
        }catch(e){
            return Promise.reject(e);
        }
    }
}