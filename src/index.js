import fs from 'fs';
import lodash from 'lodash';

export default (first, second) => {
  const before = JSON.parse(fs.readFileSync(first, 'utf8'));
  const after = JSON.parse(fs.readFileSync(second, 'utf8'));
  const mergedObj = { ...before, ...after };

  const result = Object.keys(mergedObj).reduce((acc, val) => {
    if (!lodash.has(before, val)) {
      return [...acc, ['+', [val, after[val]]]];
    }

    if (!lodash.has(after, val)) {
      return [...acc, ['-', [val, before[val]]]];
    }

    if (before[val] === after[val]) {
      return [...acc, [' ', [val, before[val]]]];
    }

    return [...acc, ['+', [val, after[val]]],
      ['-', [val, before[val]]],
    ];
  }, []);

  return `{\n${result.reduce((acc, val) => (`${acc} ${val[0]} ${val[1].join(': ')}\n`), '')}}`;
};
