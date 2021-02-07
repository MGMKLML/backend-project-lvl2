import stylish from './stylish.js';
import plainFormat from './plain.js';
import stringified from './json.js';

export default (diff, format) => {
  switch (format) {
    case 'plain':
      return plainFormat(diff);
    case 'json':
      return stringified(diff);
    case 'stylish':
    default:
      return stylish(diff);
  }
};
