import program from 'commander';
import fs from 'fs';
import path from 'path';

const findDifferences = (before, after) =>{
  const parsedBefore = JSON.parse(before);
  const parsedAfter = JSON.parse(after);
  console.log(parsedBefore, parsedAfter)
}

program
  .version('0.0.6')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((before, after) => {
    const first = fs.readFileSync(path.join(__dirname + "/json", before), 'utf8')
    const second = fs.readFileSync(path.join(__dirname + "/json", after), 'utf8')
    findDifferences(first, second)
  })

  



export default args => program.parse(args)
