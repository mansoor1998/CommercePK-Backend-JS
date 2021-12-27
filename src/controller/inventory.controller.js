import ProjectDependencies from "../dependencies";
import express from 'express';
import { validator } from "../utilities/validator";
import { InventoryLevel } from "./validator/inventory.validator";

/**
 * global api router for every controller
 * @param {ProjectDependencies} dependencies 
 * @returns {express.Router}
 */
const InventoryController = (dependencies) => {

    const router = express.Router();

    const { inventoryRepository } = dependencies.DatabaseService;

    /**
     * Custom HomeController for testing purposes.
     * @param {string} parameter
     * @returns {string} Returns a string.
    */
    router.get('/getAll', async (req, res) => {
       res.send( await inventoryRepository.getAll() );
    });

    router.get('/getById', async (req, res) => {
        res.send ( await InventoryLevel );
    });

    router.delete('/delete', async (req, res) => {
        const { SKUId } = req.query;
        if(SKUId) return res.status(404).send({ "message": "SKU id is not defined" });
        await inventoryRepository.deleteVariant(SKUId.toString());
        res.status(200).send();

    });

    router.put('/adjust-level', validator(InventoryLevel), async (req, res) => {
        const inventory = req.body;
        try{
            inventoryRepository.adjustQuantity(inventory);
            res.status(200).send();
        }catch(e) { res.status(500).send( { "message": e.name } ) }
    });

    return router;
};


export default InventoryController;