import {Request, Response} from 'express'
import HashManager from '../services/HashManager'
import generateId from '../services/idGenerator'
import connection from '../database/Basedatabase';
import Authenticator from '../services/Authenticator';

export default class UserController {
    signup = async (req: Request, res: Response) => {
        try {
            let message = 'Sucesso!'
            const {email, name, password} = req.body
            if (!name || !email || !password) {
                res.statusCode = 406
                message = `As propriedades "name", "email" ou "password" não foram repassadas`
                throw new Error(message)
            }

            const id: string = generateId()
            const cypherPassword = await HashManager.hash(password)

            await connection('users')
                  .insert ({
                      id, name, email, cypherPassword
                  })
            const token : string = Authenticator.generateToken(id)

            res.status(201).send({message, token})

            
        } catch (error: any) {
            res.statusCode = 400
            let message = error.sqlMessage || error.message

            res.send({message})
        }
    }
}