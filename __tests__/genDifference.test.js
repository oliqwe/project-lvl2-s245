import fs from 'fs';
import genDiff from './../src';

const getFile = (name, ext) => `__tests__/__fixtures__/${ext}/${name}.${ext}`;

describe('compare AST json, yaml, ini files with json output ', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/expectedJSON.json', 'utf8');

  test('output json - difference between AST JSON files', () => {
    const before = getFile('beforeAST', 'json');
    const after = getFile('afterAST', 'json');
    expect(JSON.parse(genDiff(before, after, 'json'))).toEqual(JSON.parse(expected));
  });

  test('output json - difference between AST YAML files', () => {
    const before = getFile('beforeAST', 'yaml');
    const after = getFile('afterAST', 'yaml');
    expect(JSON.parse(genDiff(before, after, 'json'))).toEqual(JSON.parse(expected));
  });

  test('output json - difference between INI files', () => {
    const before = getFile('beforeAST', 'ini');
    const after = getFile('afterAST', 'ini');
    expect(JSON.parse(genDiff(before, after, 'json'))).toEqual(JSON.parse(expected));
  });
});

describe('compare AST json, yaml, ini files plain', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/expectedFlat.txt', 'utf8');

  test('difference between AST files JSON plain format', () => {
    const before = getFile('beforeAST', 'json');
    const after = getFile('afterAST', 'json');
    expect(genDiff(before, after, 'plain')).toEqual(expected);
  });

  test('difference between AST files YAML plain format', () => {
    const before = getFile('beforeAST', 'yaml');
    const after = getFile('afterAST', 'yaml');
    expect(genDiff(before, after, 'plain')).toEqual(expected);
  });

  test('difference between AST files INI plain format', () => {
    const before = getFile('beforeAST', 'ini');
    const after = getFile('afterAST', 'ini');
    expect(genDiff(before, after, 'plain')).toEqual(expected);
  });
});


describe('compare AST json, yaml, ini files', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/expectedAST.txt', 'utf8');

  test('difference between AST files JSON', () => {
    const before = getFile('beforeAST', 'json');
    const after = getFile('afterAST', 'json');
    expect(genDiff(before, after, 'tree')).toEqual(expected);
  });

  test('difference between AST files YAML', () => {
    const before = getFile('beforeAST', 'yaml');
    const after = getFile('afterAST', 'yaml');
    expect(genDiff(before, after, 'tree')).toEqual(expected);
  });

  test('difference between AST files INI', () => {
    const before = getFile('beforeAST', 'ini');
    const after = getFile('afterAST', 'ini');
    expect(genDiff(before, after, 'tree')).toEqual(expected);
  });
});
