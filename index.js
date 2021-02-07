import path from 'path';
import process from 'process';
import getJsonDiff from './src/compare.js';
import getFileContent from './src/parsers.js';
import print from './src/formatters/index.js';

export default (filePath1, filePath2, format = 'stylish') => {
  const cwd = process.cwd();
  const fullPath1 = path.resolve(cwd, filePath1);
  const fullPath2 = path.resolve(cwd, filePath2);
  const jsonData1 = getFileContent(fullPath1);
  const jsonData2 = getFileContent(fullPath2);
  const diff = getJsonDiff(jsonData1, jsonData2);
  const formatted = print(diff, format);
  return formatted;
};
