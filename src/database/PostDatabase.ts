import { Post } from '../entities/Posts';
import BaseDatabase from './Basedatabase';
import moment from 'moment';

export default class PostDatabase extends BaseDatabase {
    create = async (input: Post) => {
        const { id, photo, description, type, createdAt, authorId } = input;
        const created_at = moment(createdAt).format("YYYY-MM-DD hh:mm:ss")
        console.log(created_at)
        const post = {
            id,
            photo,
            description,
            type,
            created_at,
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
