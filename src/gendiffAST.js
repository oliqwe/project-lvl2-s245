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


const createAST = (before, after) => {
  const keys = _.union(_.keys(before), _.keys(after));
  return keys.map((val) => {
    const { type, process } = _.find(types, item => item.check(before, after, val));
    const value = process(before[val], after[val], createAST);
    return { name: val, type, value };
  });
};

export default createAST;
