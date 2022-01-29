import PostDatabase from '../database/PostDatabase';
import { CreatePostDTO, Post } from '../entities/Posts';
import { AuthenticationData } from '../entities/Users';
import Authenticator from '../services/Authenticator';
import idGenerator from '../services/idGenerator';
export default class PostBusiness {
    create = async (token: string, input: CreatePostDTO) => {
        try {
            const { photo, description, type } = input;

            if (!token) {
                throw new Error(
                    'Você precisa estar logado para criar um post'
                );
            }
            const id: string = idGenerator();
            const authenticator = new Authenticator();
            const tokenData: AuthenticationData =
                authenticator.getTokenData(token);
            const authorId = tokenData.id;

            const post: Post = {
                id,
                photo,
                description,
                type,
                createdAt: new Date(),
                authorId,
            };

            await new PostDatabase().create(post);
        } catch (error: any) {
            let message = error.message || error.sqlMessage;
        }
    };

    getPostById=  async (token: string, id: string) => {
        try {
            if (!token) {
                let message = 'Você precisa estar logado para ver um post.';
                throw new Error(message);
            }

            const post: Post = await new PostDatabase().getPostById(id);

            if (!post) {
                let message = 'Post não encontrado';
            }

            return post

        } catch (error: any) {
            let message = error.message;
            throw new Error(message);
        }
    }
}
