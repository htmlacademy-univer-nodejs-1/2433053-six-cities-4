import { City } from '../../../types/city.js';
import { ApartmentType } from '../../../types/apartment.js';
import { Amenities } from '../../../types/amenities.js';

export class CreateOfferDto {
  public title!: string;

  public city!: City;

  public description!: string;

  public date!: Date;

  public previewPath!: string;

  public images!: string[];

  public isPremium!: boolean;

  public isFavorite!: boolean;

  public rating!: number;

  public apartmentType!: ApartmentType;

  public roomCount!: number;

  public guestCount!: number;

  public cost!: number;

  public amenities!: Amenities[];

  public author!: string;

  public latitude!: number;

  public longitude!: number;
}
