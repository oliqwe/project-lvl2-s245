import fs from 'fs';
import lodash from 'lodash';

export default (first, second) => {
  const before = JSON.parse(fs.readFileSync(first, 'utf8'));
  const after = JSON.parse(fs.readFileSync(second, 'utf8'));

  const missingRows = Object.keys(before).reduce((acc, val) =>
    (!lodash.has(after, val) ? [...acc, ['-', [val, before[val]]]] : acc), []);

  const presentRows = Object.keys(after).reduce((acc, val) =>
    (!lodash.has(before, val) ? [...acc, ['+', [val, after[val]]]] : acc), []);

  const differenceRow = Object.keys(before).reduce((acc, val) => {
    if (after[val] === undefined) {
      return acc;
    }

    return before[val] === after[val]
      ? [...acc, [' ', [val, before[val]]]]
      : [...acc, ['+', [val, after[val]]], ['-', [val, before[val]]]];
  }, []);

  const res = [...differenceRow, ...missingRows, ...presentRows].reduce((acc, val) => `${acc} ${val[0]} ${val[1].join(': ')}\n`, '');
  return `{\n${res}}`;
};

