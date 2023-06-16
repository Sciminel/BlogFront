export class Article {
    id!: number;
    titre!: string;
    contenu!: string;
    auteur!: number;
    image!: string;
    comments!: Comment[];
}