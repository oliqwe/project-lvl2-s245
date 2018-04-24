
import fs from 'fs';
import genDiff from './../src';


test('difference between 2 json files', () => {
  const result = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf8');
  const after = '__tests__/__fixtures__/before.json';
  const before = '__tests__/__fixtures__/after.json';

  expect(genDiff(after, before)).toBe(result);
});


test('difference between 2 yaml files', () => {
  const result = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf8');
  const after = '__tests__/__fixtures__/before.yaml';
  const before = '__tests__/__fixtures__/after.yaml';

  expect(genDiff(after, before)).toBe(result);
});


test('difference between 2 ini files', () => {
  const result = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf8');
  const after = '__tests__/__fixtures__/before.ini';
  const before = '__tests__/__fixtures__/after.ini';

  expect(genDiff(after, before)).toBe(result);
});
