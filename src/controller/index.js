import express from 'express';
import db from '../database/models';
import ProjectDependencies from '../dependencies';
import CrudAppController from './crud-app.cotnroller';
import HomeController from './home.controller';
import InventoryController from './inventory.controller';
import ProductController from './product.controller';
import TokenAuthController from './token-auth.controller';
import { CreateCategoryValidator } from './validator/category.validator';


/**
 * global api router for every controller
 * @param {ProjectDependencies} dependencies 
 * @returns {express.Router}c
 */
const apiRouter = (dependencies) => {
    const router = express.Router();
    
    const { getCrudAppRepository } = dependencies.DatabaseService;


    // using all router values.
    router.use('/home', HomeController(dependencies));
    router.use('/token-auth', TokenAuthController(dependencies));
    router.use('/product', ProductController(dependencies));
    router.use('/inventory', InventoryController(dependencies));
    router.use('/categories',CrudAppController(CreateCategoryValidator, CreateCategoryValidator, getCrudAppRepository(db.Category, [ 'id', 'name', 'description', 'displayName', 'smallImage', 'mediumImage']) ) );
    // router.use('/users', CrudAppController(getCrudAppRepository(db.User, ['id', 'username', 'isActive'])));
    return router;
}



export default apiRouter;