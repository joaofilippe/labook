import { Post } from '../entities/Posts';
import BaseDatabase from './Basedatabase';

export default class PostDatabase extends BaseDatabase {
    create = async (input: Post) => {
        const { id, photo, description, type, authorId } = input;
        const post = {
            id,
            photo,
            description,
            type,
            author_id: authorId,
        };
        try {
            await this.connection('posts').insert(post);
        } catch (error: any) {
            const message = error.sqlMessage || error.message;
            throw new Error(message);
        }
    };
}
