
import _ from 'lodash';


const types = [
  {
    type: 'nested',
    check: (before, after, val) => (_.isObject(before[val]) && _.isObject(after[val])),
    process: (before, after, fn) => fn(before, after),
  },
  {
    type: 'added',
    check: (before, after, val) => !_.has(before, val),
    process: (before, after) => _.identity(after),
  },
  {
    type: 'removed',
    check: (before, after, val) => !_.has(after, val),
    process: before => _.identity(before),
  },
  {
    type: 'unchanged',
    check: (before, after, val) =>
      _.has(before, val) && _.has(after, val) && before[val] === after[val],
    process: before => _.identity(before),
  },
  {
    type: 'changed',
    check: (before, after, val) =>
      _.has(before, val) && _.has(after, val) && before[val] !== after[val],
    process: (before, after) => ({ old: before, new: after }),
  },
];


export const parseAST = (before, after) => {
  const keys = _.union(_.keys(before), _.keys(after));
  return keys.map((val) => {
    const { type, process } = _.find(types, item => item.check(before, after, val));
    const value = process(before[val], after[val], parseAST);
    return { name: val, type, value };
  });
};


const stringify = (obj, offset) => {
  if (obj instanceof Object) {
    const str = Object.keys(obj).map(val => `${' '.repeat(offset + 5)}${val}: ${obj[val]}`).join('\n');
    return `{\n${str}\n${' '.repeat(offset + 1)}}`;
  }
  return `${obj}`;
};

const nodeTypeCorrelation = {
  nested: (name, val, offset, fn) => `${' '.repeat(offset)}  ${name}: {\n${fn(val, offset + 4)}\n${' '.repeat(offset + 2)}}`,
  changed: (name, val, offset) => [
    `${' '.repeat(offset)}- ${name}: ${stringify(val.old, offset + 1)}`,
    `${' '.repeat(offset)}+ ${name}: ${stringify(val.new, offset + 1)}`,
  ],
  removed: (name, val, offset) => `${' '.repeat(offset)}- ${name}: ${stringify(val, offset + 1)}`,
  added: (name, val, offset) => `${' '.repeat(offset)}+ ${name}: ${stringify(val, offset + 1)}`,
  unchanged: (name, val, offset) => `${' '.repeat(offset)}  ${name}: ${stringify(val, offset + 1)}`,
};

export const renderAST = (ast, offset = 2) => {
  const res = ast.map((node) => {
    const { name, type, value } = node;
    const nodeRender = nodeTypeCorrelation[type];
    return nodeRender(name, value, offset, renderAST);
  });

  return _.flatten(res).join('\n');
};
