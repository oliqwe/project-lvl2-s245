import program from 'commander';

export default args =>
  (program
    .version('0.0.6')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig>  <secondConfig>')
    .option('-f, --format [type]', 'output format')
    .parse(args));

