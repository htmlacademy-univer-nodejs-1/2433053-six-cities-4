#!/usr/bin/env node
import { CLIApplication } from './cli/cli-application.js';
import { HelpCommand } from './commands/help.js';
import { VersionCommand } from './commands/version.js';
import { ImportCommand } from './commands/import.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registredCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
