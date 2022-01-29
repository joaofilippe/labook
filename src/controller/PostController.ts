import { Request, Response } from 'express';
import PostBusiness from '../business/PostBusiness';
import { CreatePostDTO } from '../entities/Posts';

export default class PostController {
    async create(req: Request, res: Response) {
        try {
            let message: string = 'Sucesso!'
            const { photo, description, type } = req.body;
            const token: string = req.headers.authorization as string;
            const input: CreatePostDTO = {
                photo,
                description,
                type,
            };
            const postBusiness = new PostBusiness();

            await postBusiness.create(token, input);

            res.status(201).send(message)

        } catch (error: any) {
            let message = error.message
            throw new Error (message)
        }
    }
}
