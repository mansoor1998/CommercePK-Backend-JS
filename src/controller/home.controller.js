import ProjectDependencies from "../dependencies";
import express from 'express';
import { validator } from "../utilities/validator";
import { createHomeDto } from  './validator/CreateHome';
import UserRepository from "../application/repository/user.repository";

/**
 * global api router for every controller
 * @param {ProjectDependencies} dependencies 
 * @returns {express.Router}
 */
const HomeController = (dependencies) => {

    const router = express.Router();

    const { homeRepository, userRepository } = dependencies.DatabaseService;

    /**
     * Custom HomeController for testing purposes.
     * @param {string} parameter
     * @returns {string} Returns a string.
    */
    router.post('/greet', validator(createHomeDto), async (req, res) => {
        const data = homeRepository.getWelcomeData();
        const result = await userRepository.Create(null);
        return res.status(200).send(result);
    });

    return router;
};


export default HomeController;