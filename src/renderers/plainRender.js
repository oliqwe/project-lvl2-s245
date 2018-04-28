
import _ from 'lodash';

const stringify = value => (_.isObject(value) ? 'complex value' : `value: '${value}'`);

const nodeTypeCorrelation = {
  nested: (name, currentNode, val, fn) => `${fn(val, `${currentNode}${name}.`)}`,
  changed: (name, currentNode, val) => `Property '${currentNode}${name}' was updated. From ${stringify(val.old)} to ${stringify(val.new)}`,
  removed: (name, currentNode) => `Property '${currentNode}${name}' was removed`,
  added: (name, currentNode, val) => `Property '${currentNode}${name}' was added with ${stringify(val)}`,
  unchanged: (name, currentNode) => `Property '${currentNode}${name}' remained unchanged`,
};

const plainRender = (ast, currentNode = '') => {
  const res = ast.map((node) => {
    const { name, type, value } = node;
    const nodeRender = nodeTypeCorrelation[type];
    return nodeRender(name, currentNode, value, plainRender);
  });

  return _.flatten(res).join('\n');
};

export default plainRender;

// const valueAdded = _.isObject(value) ? ' complex value' : value: ${ value }; ` (edited)
