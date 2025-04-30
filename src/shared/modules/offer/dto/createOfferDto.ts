import { City, Amentity, HouseType, Coordinates } from '../../../types/index.js';

export class CreateOfferDto {
  title!: string;
  description!: string;
  publicationDate!: Date;
  city!: City;
  previewPhotoPath!: string;
  photosPaths!: string[];
  isPremium!: boolean;
  isFavorite!: boolean;
  rating!: number;
  houseType!: HouseType;
  roomsCount!: number;
  guestsCount!: number;
  price!: number;
  amentities!: Amentity[];
  authorId!: string;
  numberComments!: number;
  coordinates!: Coordinates;
}
