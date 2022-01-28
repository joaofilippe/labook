import connection from '../database/Basedatabase';
import { SignupInputDTO, User } from '../entities/Users';
import Authenticator from '../services/Authenticator';
import HashManager from '../services/HashManager';
import generateId from '../services/idGenerator';
import UserDatabase from '../database/UserDatabase';
export default class UserBusiness {
    signup = async (input: SignupInputDTO) => {
        let message = 'Sucesso!';
        const { name, email, password } = input;

        if (!name || !email || !password) {
            throw new Error('As propriedades "name", "email" ou "password" não foram repassadas');
        }

        const id: string = generateId();
        
        const cypherPassword = await HashManager.hash(password);

        const user: User = {
            id, 
            name,
            email,
            password: cypherPassword
        }

        const userDatabase = new UserDatabase()

        const token: string = Authenticator.generateToken({ id });
    };
}
