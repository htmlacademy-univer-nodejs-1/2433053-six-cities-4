import { Comment } from './comment.js';
import { User } from './user.js';
import { Amentity, City, HouseType, Coordinates } from './index.js';

export type Offer = {
  title: string;
  description: string;
  publicationDate: Date;
  city: City;
  previewPhoto: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  houseType: HouseType;
  roomsCount: number;
  guestsCount: number;
  price: number;
  amentities: Amentity[];
  author: User;
  numberComments: number;
  coordinates: Coordinates
};
