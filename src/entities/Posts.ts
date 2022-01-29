export type Post = {
    id: string;
    photo: string;
    description: string;
    type: string;
    createdAt: Date;
    authorId: string;
};

export interface CreatePostDTO {
    photo: string;
    description: string;
    type: string;
}



