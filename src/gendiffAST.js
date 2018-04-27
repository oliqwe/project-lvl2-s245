
import _ from 'lodash';

export const parseAST = (before, after) => {
  const keys = _.union(_.keys(before), _.keys(after));

  return keys.reduce((acc, val) => {
    if (before[val] instanceof Object && after[val] instanceof Object) {
      return [...acc, {
        name: val, status: 'hasChildren', children: parseAST(before[val], after[val]),
      }];
    }

    if (!_.has(before, val)) {
      return [...acc, { name: val, status: 'added', value: after[val] }];
    }

    if (!_.has(after, val)) {
      return [...acc, { name: val, status: 'removed', value: before[val] }];
    }

    if (_.has(before, val) && _.has(after, val)) {
      if (before[val] === after[val]) {
        return [...acc, { name: val, status: 'unchanged', value: before[val] }];
      } else if (before[val] !== after[val]) {
        return [...acc, { name: val, status: 'changed', value: { removed: before[val], added: after[val] } }];
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


export const renderAST = (ast, offset = 2) => _.flatten(ast.map((node) => {
  const {
    name, status, value, children,
  } = node;

  if (status === 'hasChildren') {
    return `${' '.repeat(offset)}  ${name}: {\n${renderAST(children, offset + 4)}\n${' '.repeat(offset + 2)}}`;
  }

  if (status === 'changed') {
    return [
      `${' '.repeat(offset)}- ${name}: ${stringify(value.removed, offset + 1)}`,
      `${' '.repeat(offset)}+ ${name}: ${stringify(value.added, offset + 1)}`,
    ];
  }

  if (status === 'added') {
    return `${' '.repeat(offset)}+ ${name}: ${stringify(value, offset + 1)}`;
  }

  if (status === 'removed') {
    return `${' '.repeat(offset)}- ${name}: ${stringify(value, offset + 1)}`;
  }

  return `${' '.repeat(offset)}  ${name}: ${stringify(value, offset + 1)}`;
})).join('\n');
