import genDiff from './../src';
import genDiffAST from './../src/gendiffAST';


describe('compare AST json, yaml, ini files', () => {
  const expected = `{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;

  test('difference between AST files JSON', () => {
    const after = '__tests__/__fixtures__/json/beforeAST.json';
    const before = '__tests__/__fixtures__/json/afterAST.json';
    expect(genDiffAST(after, before)).toEqual(expected);
  });
});


describe('compate flat json, yaml, ini files', () => {
  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
  }`;

  test('difference between 2 json files', () => {
    const after = '__tests__/__fixtures__/json/before.json';
    const before = '__tests__/__fixtures__/json/after.json';

    expect(genDiff(after, before)).toBe(expected);
  });


  test('difference between 2 yaml files', () => {
    const after = '__tests__/__fixtures__/yaml/before.yaml';
    const before = '__tests__/__fixtures__/yaml/after.yaml';

    expect(genDiff(after, before)).toBe(expected);
  });


  test('difference between 2 ini files', () => {
    const after = '__tests__/__fixtures__/ini/before.ini';
    const before = '__tests__/__fixtures__/ini/after.ini';

    expect(genDiff(after, before)).toBe(expected);
  });
});
