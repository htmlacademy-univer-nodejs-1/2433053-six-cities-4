import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/createOfferDto.js';
import { OfferEntity } from './offerEnity.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}