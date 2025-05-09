import { ICommand } from './commandInterface.js';


export class HelpCommand implements ICommand {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
      Программа для подготовки данных для REST API сервера.
      Пример: 
        cli.js --<command>-- [--argument]
      Команды: 
        --version:                       
        --help:                          
        --import <path>:                 
        --generate <n> <path> <url>     
    `);
  }
}
