import plainRender from './plainRender';
import treeRender from './treeRender';
import jsonRender from './jsonRender';

export { plainRender, treeRender, jsonRender };

const renderers = {
  plain: plainRender,
  tree: treeRender,
  json: jsonRender,
};

export default format => (data) => {
  const render = renderers[format];
  if (!render) {
    throw new Error(`unkown format: ${format}`);
  }
  return render(data);
};
