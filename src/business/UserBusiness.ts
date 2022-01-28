import connection from '../database/Basedatabase';
import { SignupInputDTO, User, LoginInputDTO } from '../entities/Users';
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

    login = async(input: LoginInputDTO) => {
        try {
            if (!input.email || !input.password){
                const message = 'O email e o password precisam ser fornecidos.'
                throw new Error(message)
            }

            const {email, password} = input 
            
            const userDatabase = new UserDatabase()
            const checkUser = await userDatabase.selectUserByEmail(email)

            if(!checkUser) {
                let message = 'As credenciais são inválidas'
                throw new Error (message)
            }

            const hashManager = new HashManager()
            const checkPassword = hashManager.compare(password, checkUser.password)

            if(!checkPassword){
                let message = 'As credenciais são inválidas'
                throw new Error (message)
            }

            const authenticator = new Authenticator();
            const token = authenticator.generateToken({id: checkUser.id})

            return token

        } catch (error: any) {
            throw new Error(error.message);

        }
    }
}
