export type Post = {
    id: string;
    photo: string;
    description: string;
    type: string;
    authorId: string;
};

export interface CreatePostDTO {
    photo: string;
    description: string;
    type: string;
}

