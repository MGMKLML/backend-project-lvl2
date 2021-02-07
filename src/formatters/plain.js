const isObject = (value) => value && typeof value === 'object';

const printValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  return JSON.stringify(value).replace(/"/g, "'");
};

const print = (tree) => tree.flatMap((element) => {
  const {
    path, type, value, before, after, children,
  } = element;
  switch (type) {
    case 'changed':
      return `Property '${path}' was updated. From ${printValue(before)} to ${printValue(after)}`;
    case 'removed':
      return `Property '${path}' was removed`;
    case 'added':
      return `Property '${path}' was added with value: ${printValue(value)}`;
    case 'parent':
      return print(children);
    case 'same':
    default:
      return null;
  }
}).filter((line) => !!line).join('\n');

export default (tree) => print(tree);
