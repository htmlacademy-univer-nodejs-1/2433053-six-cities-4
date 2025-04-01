import { User } from './user.js';

export type City = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export type HousingType = 'apartment' | 'house' | 'room' | 'hotel';

export type Amenity = 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';

export enum Coordinates {
  Paris = 'latitude: 48.85661, longitude: 2.351499',
  Cologne = 'latitude: 50.938361, longitude: 6.959974',
  Brussels = 'latitude: 50.846557, longitude: 4.351697',
  Amsterdam = 'latitude: 52.370216, longitude: 4.895168',
  Hamburg = 'latitude: 53.550341, longitude: 10.000654',
  Dusseldorf = 'latitude: 51.225402, longitude: 6.776314'
}

export type Offer = {
  title: string;
  description: string;
  publicationDate: Date;
  city: City;
  previewImage: string;
  housingPhotos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  roomsCount: number;
  guestsCount: number;
  rentPrice: number;
  amenities: Amenity[];
  author: User;
  coordinates: Coordinates;
};
