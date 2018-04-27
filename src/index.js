
import fs from 'fs';
import path from 'path';
import getParser from './parser';
import { parseAST , renderAST} from "./gendiffAST";

export default (first, second) => {
  const ext = path.extname(first);
  const parse = getParser(ext);
  const before = parse(fs.readFileSync(first, 'utf8'));
  const after = parse(fs.readFileSync(second, 'utf8'));
  return `{\n${renderAST(parseAST(before, after))}\n}`;
};


// return `{\n${genDiffAST(before, after)}\n  123234}`;

// const keys = lodash.union(lodash.keys(before), lodash.keys(after));

// const res = keys.map((val) => {
//   if (!lodash.has(before, val)) {
//     return [`  + ${val}: ${after[val]}`];
//   }
//   if (!lodash.has(after, val)) {
//     return [`  - ${val}: ${before[val]}`];
//   }
//   if (before[val] === after[val]) {
//     return [`    ${val}: ${before[val]}`];
//   }
//   return [`  + ${val}: ${after[val]}`, `  - ${val}: ${before[val]}`];
// });

// return `{\n${lodash.flatten(res).join('\n')}\n  }`;
