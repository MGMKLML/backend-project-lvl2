const isObject = (value) => value && typeof value === 'object';

const getIndentLevel = (path) => path.split('.').length;

const makeIndent = (level, shift = 0) => ' '.repeat(level * 4 - shift);

const stringify = (node, level = 0) => {
  let str = '';

  if (isObject(node)) {
    str = `${str}{\n`;
    const keys = Object.getOwnPropertyNames(node).sort();
    keys.forEach((key) => {
      const value = node[key];
      if (isObject(value)) {
        str = `${str}${makeIndent(level + 1)}${key}: ${stringify(value, level + 1)}\n`;
      } else {
        str = `${str}${makeIndent(level + 1)}${key}: ${stringify(value, level)}\n`;
      }
    });
    str = `${str}${makeIndent(level)}}`;
  } else {
    str = `${str}${node}`;
  }

  return str;
};

const print = (tree) => {
  let str = '';
  tree.forEach((element) => {
    const {
      key, path, type, value, before, after, children,
    } = element;
    const depth = getIndentLevel(path);
    switch (type) {
      case 'parent':
        str = `${str}${makeIndent(depth)}${key}: {\n`;
        str = `${str}${print(children)}`;
        str = `${str}${makeIndent(depth)}}\n`;
        break;
      case 'same':
        str = `${str}${makeIndent(depth, 2)}  ${key}: ${stringify(value, depth)}\n`;
        break;
      case 'changed':
        str = `${str}${makeIndent(depth, 2)}- ${key}: ${stringify(before, depth)}\n`;
        str = `${str}${makeIndent(depth, 2)}+ ${key}: ${stringify(after, depth)}\n`;
        break;
      case 'removed':
        str = `${str}${makeIndent(depth, 2)}- ${key}: ${stringify(value, depth)}\n`;
        break;
      case 'added':
        str = `${str}${makeIndent(depth, 2)}+ ${key}: ${stringify(value, depth)}\n`;
        break;
      default:
        break;
    }
  });
  return str;
};

export default (tree) => `{\n${print(tree)}}`;
