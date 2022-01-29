import { Request, Response } from 'express';
import PostBusiness from '../business/PostBusiness';
import { CreatePostDTO, Post } from '../entities/Posts';

export default class PostController {
    async create(req: Request, res: Response) {
        try {
            let message: string = 'Sucesso!';
            const { photo, description, type } = req.body;
            const token: string = req.headers.authorization as string;
            const input: CreatePostDTO = {
                photo,
                description,
                type,
            };
            const postBusiness = new PostBusiness();

            await postBusiness.create(token, input);

            res.status(201).send(message);
        } catch (error: any) {
            let message = error.message;
            throw new Error(message);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            let message = 'Sucesso!';
            const { id } = req.params;
            const token = req.headers.authorization as string;

            const post: Post = await new PostBusiness().getPostById(
                token,
                id
            );

            res.status(200).send({ message, post });
        } catch (error: any) {
            let message = error.sqlMessage || error.message;

            res.status(400).send({ message });
        }
    }
}
