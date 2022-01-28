import {Request, Response} from 'express'
import HashManager from '../services/HashManager'
import generateId from '../services/idGenerator'
import connection from '../database/Basedatabase';
import Authenticator from '../services/Authenticator';

export default class UserController {
    signup = async (req: Request, res: Response) => {
        try {
            const {email, name, password} = req.body
            

            res.status(201).send({message, token})

            
        } catch (error: any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message

            res.send({message})
        }
    }
}