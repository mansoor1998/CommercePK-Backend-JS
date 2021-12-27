import express from "express";
import ProjectDependencies from "../dependencies";
import { validator } from "../utilities/validator";
import { createUser } from "./validator/token-auth.validator";

/**
 * global api router for every controller
 * @param {ProjectDependencies} dependencies 
 * @returns {express.Router}
 */
const TokenAuthController = (dependencies) => {
    const router = express.Router();

    const { userRepository } = dependencies.DatabaseService;

    router.post('/register', validator(createUser), async (req,res) => {
        const user = req.body;
        const result = await userRepository.Create(user);
        res.send(result);
    });

    router.get('/getAll', async (req, res) => {
        let variable = 10;
        variable++;
        res.send( await userRepository.getAll() );
    });

    router.get('/userroles', async (req, res) => {
        res.send( await userRepository.getAllUserRoles() );
    });

    router.get('/test', async (req, res) => {
        res.send(await userRepository.test());
    });

    return router;
}

export default TokenAuthController;