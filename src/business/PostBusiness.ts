import { CreatePostDTO } from '../entities/Posts';
import { AuthenticationData } from '../entities/Users';
import Authenticator from '../services/Authenticator';
import idGenerator from '../services/idGenerator';
export default class PostBusiness {
    create = async (token: string, input: CreatePostDTO) => {
        const { photo, description, type } = input;

        if (!token) {
            throw new Error ('Você precisa estar logado para criar um post')
        }
        const id: string = idGenerator();
        const authenticator = new Authenticator();
        const tokenData: AuthenticationData =
            authenticator.getTokenData(token);
        const authorId = tokenData.id;


    };
}
