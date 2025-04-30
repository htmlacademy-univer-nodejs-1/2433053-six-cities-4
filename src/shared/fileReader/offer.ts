import { Offer, City, HouseType, Coordinates, Amentity, User, UserType } from '../types/index.js';


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
    avatar,
    numberComments,
    userType,
    coordinates
  ] = offerData.replace('\n', '').split('\t');

  const user: User = {
    name,
    email,
    avatar,
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
    numberComments: parseInt(numberComments, 10),
    coordinates: coordinates as Coordinates,
  };
}
