import stylish from './stylish.js';

export default (diff, format) => {
  switch (format) {
    case 'stylish':
    default:
      return stylish(diff);
  }
};
