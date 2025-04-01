import { User } from './user.js';

export type Comment = {
  text: string; 
  publicationDate: string; 
  rating: number; 
  author: User; 
};
