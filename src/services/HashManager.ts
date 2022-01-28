import * as bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export default class HashManager {
    hash = async (plainText: string): Promise<string> => {
        const rounds = Number(process.env.BCRYPT_COST);
        const salt = await bcrypt.genSalt(rounds);
        return (await bcrypt.hash(plainText, salt)).toString();
    };

    compare = async (
        plainText: string,
        cypherText: string
    ): Promise<boolean> => {
        return bcrypt.compare(plainText, cypherText);
    };
}
