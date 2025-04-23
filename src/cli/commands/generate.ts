import { TSVOfferGenerator } from '../../shared/offerGenerator/tsvOfferGenerator.js';
import { TSVFileWriter } from '../../shared/fileWriter/tsvFileWriter.js';

import { MockServerData } from '../../shared/types/mockServerData.js';
import { ICommand } from './commandInterface.js';
import got from 'got';

export class GenerateCommand implements ICommand {
  private initialData!: MockServerData;

  private async load(url: string): Promise<void> {
    try {
      const response = await got.get(url);
      this.initialData = JSON.parse(response.body) as MockServerData;
    } catch (error) {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number): Promise<void> {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
