import { User } from "./user.model";

export class Comment {
    
    id!: number;
    contenu!: string;
    auteur!: number;
    article_id!: number;
    createdAt!: Date;
    updatedAt!: Date;
    User!: User;
}