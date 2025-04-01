import { readFileSync } from 'fs';
import { IFileReader } from './fileReaderInterface.js';
import { Offer, City, HousingType, Amenity, Coordinates } from '../types/offer.js';
import { User } from '../types/user.js';

export class TSVFileReader implements IFileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, publicationDate, city, previewImage, housingPhotos, isPremium, isFavorite, rating, housingType, roomsCount, guestsCount, rentPrice, amenities, name, email, avatarPath, coordinates]) => ({
        title,
        description,
        publicationDate: new Date(publicationDate),
        city: city as City,
        previewImage,
        housingPhotos: housingPhotos ? housingPhotos.split(';').map((url) => url.trim()) : [],
        isPremium: isPremium === 'true',
        isFavorite: isFavorite === 'true',
        rating: parseInt(rating, 10),
        housingType: housingType as HousingType,
        roomsCount: parseInt(roomsCount, 10),
        guestsCount: parseInt(guestsCount, 10),
        rentPrice: parseInt(rentPrice, 10),
        amenities: amenities ? amenities.split(';').map((amenitiy) => amenitiy.trim()) as Amenity[] : [],
        author: { name, email, avatarPath} as User,
        coordinates: coordinates as Coordinates,
      }));
  }
}
