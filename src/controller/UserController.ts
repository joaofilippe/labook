import {Request, Response} from 'express'
import HashManager from '../services/HashManager'
import generateId from '../services/idGenerator'
import connection from '../database/Basedatabase';
import Authenticator from '../services/Authenticator';
import { SignupInputDTO } from '../entities/Users';
import UserBusiness from '../business/UserBusiness';

export default class UserController {
    signup = async (req: Request, res: Response) => {
        try {
            let message = 'Sucesso!';

            const {email, name, password} = req.body
            const input: SignupInputDTO = {email, name, password}
            
            const userBusiness = new UserBusiness()
            const token = userBusiness.signup(input)

            res.status(201).send({message, token})

            
        } catch (error: any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message

            res.send({message})
        }
    }
}