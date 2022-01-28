import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class Authenticator {
    static generateToken = (payload: string): string => {
        return jwt.sign(payload, process.env.JWT_KEY as string, {
            expiresIn: '24min',
        });
    };

    static getTokenData = (token: string) => {
        return jwt.verify(token, process.env.JWT_KEY as string);
    };
}
