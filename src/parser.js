
import { safeLoad } from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yaml': safeLoad,
};

export default format => (data) => {
  const parse = parsers[format];
  if (!parse) {
    throw new Error(`unknown format: ${format}`);
  }
  return parse(data);
};
