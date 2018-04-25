import fs from 'fs';
import lodash from 'lodash';
import path from 'path';
import getParser from './parser';


export default (first, second) => {
  const ext = path.extname(first);
  const parse = getParser(ext);
  const before = parse(fs.readFileSync(first, 'utf8'));
  const after = parse(fs.readFileSync(second, 'utf8'));

  const result = Object.keys({ ...before, ...after })
    .reduce((acc, val) => {
      if (!lodash.has(before, val)) {
        return [...acc, ` + ${val}: ${after[val]}`];
      }

      if (!lodash.has(after, val)) {
        return [...acc, ` - ${val}: ${before[val]}`];
      }

      if (before[val] === after[val]) {
        return [...acc, `   ${val}: ${before[val]}`];
      }
      return [...acc, ` + ${val}: ${after[val]}`, ` - ${val}: ${before[val]}`];
    }, []);
  return `{\n${result.join('\n')}\n}`;
};
