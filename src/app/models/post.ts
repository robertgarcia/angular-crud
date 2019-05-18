import { Category } from './category';

export class Post {
    id: number;
    title: string;
    text: string;
    categories: (number|Category)[]
}