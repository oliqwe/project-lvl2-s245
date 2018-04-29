import fs from 'fs';
import genDiff from './../src';

describe('compare AST json, yaml, ini files with json output ', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/expectedJSON.json', 'utf8');

  test('output json - difference between AST JSON files', () => {
    const after = '__tests__/__fixtures__/json/beforeAST.json';
    const before = '__tests__/__fixtures__/json/afterAST.json';
    expect(JSON.parse(genDiff(after, before, 'json'))).toEqual(JSON.parse(expected));
  });

  test('output json - difference between AST YAML files', () => {
    const after = '__tests__/__fixtures__/yaml/beforeAST.yaml';
    const before = '__tests__/__fixtures__/yaml/afterAST.yaml';
    expect(JSON.parse(genDiff(after, before, 'json'))).toEqual(JSON.parse(expected));
  });

  test('output json - difference between INI files', () => {
    const after = '__tests__/__fixtures__/ini/beforeAST.ini';
    const before = '__tests__/__fixtures__/ini/afterAST.ini';
    expect(JSON.parse(genDiff(after, before, 'json'))).toEqual(JSON.parse(expected));
  });
});

describe('compare AST json, yaml, ini files plain', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/expectedFlat.txt', 'utf8');

  test('difference between AST files JSON plain format', () => {
    const after = '__tests__/__fixtures__/json/beforeAST.json';
    const before = '__tests__/__fixtures__/json/afterAST.json';
    expect(genDiff(after, before, 'plain')).toEqual(expected);
  });

  test('difference between AST files YAML plain format', () => {
    const after = '__tests__/__fixtures__/yaml/beforeAST.yaml';
    const before = '__tests__/__fixtures__/yaml/afterAST.yaml';
    expect(genDiff(after, before, 'plain')).toEqual(expected);
  });

  test('difference between AST files INI plain format', () => {
    const after = '__tests__/__fixtures__/ini/beforeAST.ini';
    const before = '__tests__/__fixtures__/ini/afterAST.ini';
    expect(genDiff(after, before, 'plain')).toEqual(expected);
  });
});


describe('compare AST json, yaml, ini files', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/expectedAST.txt', 'utf8');

  test('difference between AST files JSON', () => {
    const after = '__tests__/__fixtures__/json/beforeAST.json';
    const before = '__tests__/__fixtures__/json/afterAST.json';
    expect(genDiff(after, before, 'tree')).toEqual(expected);
  });

  test('difference between AST files YAML', () => {
    const after = '__tests__/__fixtures__/yaml/beforeAST.yaml';
    const before = '__tests__/__fixtures__/yaml/afterAST.yaml';
    expect(genDiff(after, before, 'tree')).toEqual(expected);
  });

  test('difference between AST files INI', () => {
    const after = '__tests__/__fixtures__/ini/beforeAST.ini';
    const before = '__tests__/__fixtures__/ini/afterAST.ini';
    expect(genDiff(after, before, 'tree')).toEqual(expected);
  });
});
