
import fs from 'fs';
import genDiff from './../src';

const after = '__tests__/__fixtures__/before.json';
const before = '__tests__/__fixtures__/after.json';

const result = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf8');

test('difference between 2 json files', () => {
  expect(genDiff(after, before)).toBe(result);
});
