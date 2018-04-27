
import lodash from 'lodash';


export const parseAST = (before, after) => {
  const keys = lodash.union(lodash.keys(before), lodash.keys(after));

  return keys.reduce((acc, val) => {
    if (before[val] instanceof Object && after[val] instanceof Object) {
      return [...acc, {
        name: val, status: ' ', value: '', children: parseAST(before[val], after[val]),
      }];
    }

    if (!lodash.has(before, val)) {
      return [...acc, { name: val, status: '+', value: after[val] }];
    }

    if (!lodash.has(after, val)) {
      return [...acc, { name: val, status: '-', value: before[val] }];
    }

    if (lodash.has(before, val) && lodash.has(after, val)) {
      if (before[val] === after[val]) {
        return [...acc, { name: val, status: ' ', value: before[val] }];
      } else if (before[val] !== after[val]) {
        return [...acc, { name: val, status: '-', value: before[val] }, { name: val, status: '+', value: after[val] }];
      }
    }
    return acc;
  }, []);
};

const stringify = (obj, offset) => {
  if (obj instanceof Object) {
    const str = Object.keys(obj).map(val => `${' '.repeat(offset + 5)}${val}: ${obj[val]}`).join('\n');
    return `{\n${str}\n${' '.repeat(offset + 1)}}`;
  }
  return `${obj}`;
};


export const renderAST = (ast, offset = 2) => lodash.flatten(ast.map((val) => {
  const {
    name, status, value, children,
  } = val;

  if (children instanceof Array) {
    return `${' '.repeat(offset)} ${status}${name}: {\n${renderAST(children, offset + 4)}\n${' '.repeat(offset + 2)}}`;
  }
  return `${' '.repeat(offset)}${status} ${name}: ${stringify(value, offset + 1)}`;
})).join('\n');
