import _ from 'lodash';

const isObject = (value) => value && typeof value === 'object';

const getIndentLevel = (path) => path.split('.').length;

const makeIndent = (level, shift = 0) => ' '.repeat(level * 4 - shift);

const stringify = (node, level = 0) => {
  if (isObject(node)) {
    const beginning = '{\n';
    const keys = Object.keys(node).slice().sort();
    const printTree = keys.map((key) => {
      const value = node[key];
      if (isObject(value)) {
        return `${makeIndent(level + 1)}${key}: ${stringify(value, level + 1)}`;
      }
      return `${makeIndent(level + 1)}${key}: ${stringify(value, level)}`;
    }).join('\n');
    const ending = `\n${makeIndent(level)}}`;
    return beginning.concat(printTree, ending);
  }

  return `${node}`;
};

const print = (tree) => _.flatMapDeep(tree, (element) => {
  const {
    key, path, type, value, before, after, children,
  } = element;
  const depth = getIndentLevel(path);
  switch (type) {
    case 'parent':
      return [
        `${makeIndent(depth)}${key}: {`,
        print(children),
        `${makeIndent(depth)}}`,
      ];
    case 'same':
      return `${makeIndent(depth, 2)}  ${key}: ${stringify(value, depth)}`;
    case 'changed':
      return [
        `${makeIndent(depth, 2)}- ${key}: ${stringify(before, depth)}`,
        `${makeIndent(depth, 2)}+ ${key}: ${stringify(after, depth)}`,
      ];
    case 'removed':
      return `${makeIndent(depth, 2)}- ${key}: ${stringify(value, depth)}`;
    case 'added':
      return `${makeIndent(depth, 2)}+ ${key}: ${stringify(value, depth)}`;
    default:
      return null;
  }
});

export default (tree) => `{\n${print(tree).join('\n')}\n}`;
