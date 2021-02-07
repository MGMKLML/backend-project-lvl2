const isObject = (value) => value && typeof value === 'object';

const printValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  return JSON.stringify(value).replace(/"/g, "'");
};

const print = (tree) => {
  let str = '';
  tree.forEach((element) => {
    const {
      path, type, value, before, after, children,
    } = element;
    switch (type) {
      case 'changed':
        str = `${str}Property '${path}' was updated. From ${printValue(before)} to ${printValue(after)}\n`;
        break;
      case 'removed':
        str = `${str}Property '${path}' was removed\n`;
        break;
      case 'added':
        str = `${str}Property '${path}' was added with value: ${printValue(value)}\n`;
        break;
      case 'parent':
        str = `${str}${print(children)}`;
        break;
      case 'same':
      default:
        break;
    }
  });
  return str;
};

export default (tree) => {
  const result = print(tree);
  return result.replace(/\n*$/, '');
};
