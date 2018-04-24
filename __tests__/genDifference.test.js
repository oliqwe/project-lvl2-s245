
import fs from 'fs';
import genDiff from './../src';

const result = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf8');

test('difference between 2 json files', () => {
  const after = '__tests__/__fixtures__/before.json';
  const before = '__tests__/__fixtures__/after.json';

  expect(genDiff(after, before)).toBe(result);
});


test('difference between 2 yaml files', () => {
  const after = '__tests__/__fixtures__/before.yaml';
  const before = '__tests__/__fixtures__/after.yaml';

  expect(genDiff(after, before)).toBe(result);
});
