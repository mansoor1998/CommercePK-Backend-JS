import express from "express";
import ProjectDependencies from "../dependencies";


/**
 * global api router for every controller
 * @param {ProjectDependencies} dependencies 
 * @returns {express.Router}
 */
const CustomerController = (dependencies) => {
    const router = express.Router();

    router.get('/getAll', async (req, res) => {
        res.send('all customers are sent');
    });
    

    return router;
} 