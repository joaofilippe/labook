import { User } from '../entities/Users';
import BaseDatabase from './Basedatabase';
import express from 'express';

export default class UserDatabase extends BaseDatabase {
    async insertUser(user: User) {
        try {
            await this.connection('users').insert({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
            });
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async selectUserByEmail(email: string): Promise<User> {
        const queryResult = await this.connection('users')
            .select()
            .where({ email });

        const user: User = {
            id: queryResult[0].id,
            name: queryResult[0].name,
            email: queryResult[0].email,
            password: queryResult[0].password,
        };

        return user;
    }
}
