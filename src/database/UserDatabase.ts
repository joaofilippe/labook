import { User } from '../entities/Users';
import BaseDatabase from './Basedatabase';
import express from 'express';
import UserModels from '../models/Users';

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
        try {
            const queryResult = await this.connection('users')
                .select()
                .where({ email });

            const userModel = new UserModels();

            return userModel.toUserModel(queryResult[0]);
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
