import {
    defaultClasses,
    getModelForClass,
    modelOptions,
    prop,
    Ref,
  } from '@typegoose/typegoose';
  
  import { City, HouseType, Amentity } from '../../types/index.js';
  import { UserEntity } from '../user/userEntity.js';
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
  export interface OfferEntity extends defaultClasses.Base {}
  
  @modelOptions({
    schemaOptions: {
      collection: 'offers',
    },
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
  export class OfferEntity extends defaultClasses.TimeStamps {
    @prop({ trim: true, required: true })
    public title!: string;
  
    @prop({ trim: true })
    public description!: string;
  
    @prop()
    public image!: string;
  
    @prop()
    public date!: Date;
  
    @prop()
    public cost!: number;
  
    @prop({
      type: () => String,
      enum: City,
    })
    public town!: City;
  
    @prop()
    public gallery!: string[];
  
    @prop()
    public isPremium!: boolean;
  
    @prop()
    public isFavorite!: boolean;
  
    @prop()
    public rating!: number;
  
    @prop({
      type: () => String,
      enum: HouseType,
    })
    public apartmentType!: HouseType;
  
    @prop()
    public roomCount!: number;
  
    @prop()
    public guestCount!: number;
  
    @prop()
    public amenities!: Amentity[];
  
    @prop({
      ref: UserEntity,
      required: true,
    })
    public userId!: Ref<UserEntity>;
  }
  
  export const OfferModel = getModelForClass(OfferEntity);