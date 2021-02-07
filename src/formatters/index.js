import stylish from './stylish.js';
import plainFormat from './plain.js';

export default (diff, format) => {
  switch (format) {
    case 'plain':
      return plainFormat(diff);
    case 'stylish':
    default:
      return stylish(diff);
  }
};
