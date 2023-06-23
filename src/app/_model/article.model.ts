import { Comment } from "./comment.model";
import { User } from "./user.model";

export class Article {
    id!: number;
    titre!: string;
    contenu!: string;
    auteur!: number;
    image!: ArrayBuffer;
    Comments!: Comment[];
    User!: User;
    createdAt!: Date;
    updatedAt!: Date;
}