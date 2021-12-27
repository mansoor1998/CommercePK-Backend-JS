import express from 'express';
import CrudAppRepository from "../application/repository/crud-app.repository";
import joi from 'joi';
import { validator } from '../utilities/validator';
import { ReturnDto } from '../utilities/return.dto';

/**
 * global api router for every controller
 * @param {joi.ObjectSchema} createValidtor
 * @param {joi.ObjectSchema} updateValidator
 * @param {CrudAppRepository} repository
 * @returns {express.Router}
 */
const CrudAppController = (createValidtor, updateValidator, repository) => {

    const router = express.Router();

    router.get('/getAll', async (req, res) => {
        try{
            const response = await repository.getAll();
            return res.send(response);
        }catch(e){
            return res.send( new ReturnDto( null, { message: [ e.message ] } ));
        }
    });

    router.get('/getById', async (req, res) => {
        const { id } = req.query;
        if(!id) return res.status(404).send(new ReturnDto(null, { message: [ "Id does not exist" ] } ));
        const response = await repository.getById(id.toString());
        res.send(new ReturnDto(response, null));
    });

    router.post('/create', validator(createValidtor), async (req, res) => {
        const createDto = req.body;
        const response = await repository.create(createDto);
        res.status(200).send(new ReturnDto(response)); //.send('create funciton is created');
    });

    router.put('/update', validator(updateValidator), async (req, res) => {
        const updateDto = req.body;

        const { id } = req.query;
        if(!id) return res.status(404).send(new ReturnDto(null, { message: [ "id does not exist" ] } ));

        const response = await repository.update(id.toString(), updateDto);
        res.status(200).send(new ReturnDto(response));
    });

    router.delete('/softDeleteAsync', async (req, res) => {
        const { id } = req.query;
        if(!id) return res.status(404).send(new ReturnDto(null, { message: [ "id does not exist" ] } ));
        await repository.softDeleteAsync(id.toString());
        res.status(200).send();
    });
    
    return router;
};


export default CrudAppController;