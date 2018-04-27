#!/usr/bin/env node
import program from 'commander';
import genDiff from './..';

program
  .version('0.0.17')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((before, after) => {
    console.log(program.format);
    console.log(genDiff(before, after));
  });

program.parse(process.argv);
