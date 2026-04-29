import { Command } from 'commander'
import { initCommand } from './commands/init'
import { addCommand } from './commands/add'
import { themeCommand } from './commands/theme'

const program = new Command()

program
  .name('tokiui')
  .description('Add tokiui components to your project')
  .version('0.0.1')

program.addCommand(initCommand)
program.addCommand(addCommand)
program.addCommand(themeCommand)

program.parse()
