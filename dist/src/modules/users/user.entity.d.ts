import { Post } from '../blogs/blog.entity';
export declare class User {
    id: number;
    email: string;
    name: string;
    profilePicture: string;
    isVerified: boolean;
    posts: Post[];
}
