import genDiff from './../src';
// import createAST from './../src/gendiffAST';
// import { plainRender, treeRender, jsonRender } from './../src/renderers';
// import fs from 'fs';
// import genDiffAST from './../src/gendiffAST';

describe('compare AST json, yaml, ini files plain', () => {
  // const expectedtxt = fs.readFileSync('__tests__/__fixtures__/expectedFlat.txt', 'utf8');

  const expected = `Property 'common.setting1' remained unchanged
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From value: 'true' to complex value
Property 'common.setting6.key' remained unchanged
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with complex value
Property 'group1.baz' was updated. From value: 'bas' to value: 'bars'
Property 'group1.foo' remained unchanged
Property 'group1.nest' was updated. From complex value to value: 'str'
Property 'group2' was removed
Property 'group3' was added with complex value`;

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
  // const expected = fs.readFileSync('__tests__/__fixtures__/expectedAST.txt', 'utf8');

  const expected = `  common: {
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
`;

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


// describe('compate flat json, yaml, ini files', () => {
//   const expected = fs.readFileSync('__tests__/__fixtures__/expectedFlat.txt', 'utf-8');

//   test('difference between 2 json files', () => {
//     const after = '__tests__/__fixtures__/json/before.json';
//     const before = '__tests__/__fixtures__/json/after.json';

//     expect(genDiff(after, before)).toBe(expected);
//   });


//   test('difference between 2 yaml files', () => {
//     const after = '__tests__/__fixtures__/yaml/before.yaml';
//     const before = '__tests__/__fixtures__/yaml/after.yaml';

//     expect(genDiff(after, before)).toBe(expected);
//   });


//   test('difference between 2 ini files', () => {
//     const after = '__tests__/__fixtures__/ini/before.ini';
//     const before = '__tests__/__fixtures__/ini/after.ini';

//     expect(genDiff(after, before)).toBe(expected);
//   });
// });
