import _ from 'lodash';

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

export default renderAST;
