import plainRender from './plainRender';
import treeRender from './treeRender';

export { plainRender, treeRender };

const renderers = {
  plain: plainRender,
  tree: treeRender,
  json: JSON.stringify,
};

export default format => (data) => {
  const render = renderers[format];
  if (!render) {
    throw new Error(`unknown format: ${format}`);
  }
  return render(data);
};
