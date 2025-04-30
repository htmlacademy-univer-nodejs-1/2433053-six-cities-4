import { ICommand } from './commandInterface.js';
import { TSVFileReader, createOffer } from '../../shared/fileReader/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';
import { getMongoURI } from '../../shared/helpers/database.js';
import { UserService } from '../../shared/modules/user/userServiceInterface.js';
import { OfferService } from '../../shared/modules/offer/offerServiceInterface.js';
import { DatabaseClient } from '../../shared/libs/databaseClient/databaseClientInterface.js';
import { Logger } from '../../shared/libs/logger/loggerInterface.js';
import { ConsoleLogger } from '../../shared/libs/logger/consoleLogger.js';
import { DefaultOfferService } from '../../shared/modules/offer/defaultOfferService.js';
import { DefaultUserService } from '../../shared/modules/user/defaultUserService.js';
import { MongoDatabaseClient } from '../../shared/libs/databaseClient/mongoDatabaseClient.js';
import { OfferModel } from '../../shared/modules/offer/offerEnity.js';
import { UserModel } from '../../shared/modules/user/userEntity.js';
import { Offer } from '../../shared/types/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './constants.js';

export class ImportCommand implements ICommand {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt!: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const author = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      publicationDate: offer.publicationDate,
      previewPhotoPath: offer.previewPhoto,
      photosPaths: offer.photos,
      city: offer.city,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: offer.rating,
      houseType: offer.houseType,
      roomsCount: offer.roomsCount,
      guestsCount: offer.guestsCount,
      price: offer.price,
      amentities: offer.amentities,
      authorId: author.id,
      numberComments: offer.numberComments,
      coordinates: offer.coordinates
    });

  }

  public getName(): string {
    return '--import';
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      if(!(error instanceof Error)){
        throw error;
      }
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
