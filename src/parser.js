import ini from 'ini';
import { safeLoad } from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yaml': safeLoad,
  '.ini': ini.parse,
};

export default format => (data) => {
  const parse = parsers[format];
  if (!parse) {
    throw new Error(`unknown format: ${format}`);
  }
  return parse(data);
};
