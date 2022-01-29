import { Post } from "../entities/Posts"

export default class PostModel{
    toPostModel = (obj: any) : Post=> {
        const post: Post = {
            id: obj.id,
            photo: obj.photo,
            description: obj.description,
            type: obj.type,
            createdAt: obj.created_at,
            authorId: obj.author_id
        }

        return obj && post
    }
}