import connection from '../database/Basedatabase';
import { SignupInputDTO, User } from '../entities/Users';
import Authenticator from '../services/Authenticator';
import HashManager from '../services/HashManager';
import generateId from '../services/idGenerator';
import UserDatabase from '../database/UserDatabase';
export default class UserBusiness {
    
    signup = async (input: SignupInputDTO): Promise<string> => {
        try {
            const { name, email, password } = input;

            if (!name || !email || !password) {
                throw new Error(
                    'As propriedades "name", "email" ou "password" não foram repassadas'
                );
            }

            const id: string = generateId();
            console.log(id)
            const hashManager = new HashManager()
            const cypherPassword = await hashManager.hash(password);

            const user: User = {
                id,
                name,
                email,
                password: cypherPassword,
            };

            const userDatabase = new UserDatabase();
            await userDatabase.insertUser(user);
            const authenticator = new Authenticator()
            const token: string = authenticator.generateToken({ id });
            return token as string;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };
}
