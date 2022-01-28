import { User } from '../entities/Users';
import BaseDatabase from './Basedatabase';

export default class UserDatabase extends BaseDatabase {
    async insertUser(user: User) {
        try {
            await this.connection('users').insert({
                id : user.id,
                name : user.name,
                email : user.email,
                cypherPassword : user.password,
            });
        } catch (error: any) {
            throw new Error (error.sqlMessage || error.message)
        }
    }
}
