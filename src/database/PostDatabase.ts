import { Post } from '../entities/Posts';
import BaseDatabase from './Basedatabase';
import moment from 'moment';
import PostModel from '../models/PostModel';

export default class PostDatabase extends BaseDatabase {
    tableName = 'posts';
    create = async (input: Post) => {
        const { id, photo, description, type, createdAt, authorId } =
            input;
        const created_at = moment(createdAt).format(
            'YYYY-MM-DD hh:mm:ss'
        );
        console.log(created_at);
        const post = {
            id,
            photo,
            description,
            type,
            created_at,
            author_id: authorId,
        };
        try {
            await this.connection(this.tableName).insert(post);
        } catch (error: any) {
            const message = error.sqlMessage || error.message;
            throw new Error(message);
        }
    };

    getPostById = async (id: string): Promise<Post> => {
        const result: any[] = await this.connection(this.tableName)
            .select()
            .where({ id });

        const postFromDB = result[0];
        const post = new PostModel().toPostModel(postFromDB);
        return post
    };
}
