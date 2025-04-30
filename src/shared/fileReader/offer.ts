import { Offer, City, HouseType, Coordinates, Amentity } from '../types/offer.js';
import { User, UserType } from '../types/user.js';


export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postDate,
    city,
    previewPhoto,
    photos,
    isPremium,
    isFavorite,
    rating,
    type,
    roomCount,
    guestsCount,
    price,
    facilities,
    name,
    email,
    avatarPath,
    password,
    userType,
    coordinates
  ] = offerData.replace('\n', '').split('\t');

  const user: User = {
    name,
    email,
    avatarPath,
    password,
    type: userType as UserType,
  };

  return {
    title,
    description,
    publicationDate: new Date(postDate),
    city: city as City,
    previewPhoto,
    photos: photos ? photos.split(';').map((url) => url.trim()) : [],
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: parseInt(rating, 10),
    houseType: type as HouseType,
    roomsCount: parseInt(roomCount, 10),
    guestsCount: parseInt(guestsCount, 10),
    price: Number.parseInt(price, 10),
    amentities: facilities ? facilities.split(';').map((facility) => facility.trim()) as Amentity[] : [],
    author: user,
    coordinates: coordinates as Coordinates,
  };
}
