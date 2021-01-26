import fs from 'fs';
import path from 'path';
import process from 'process';
import getJsonDiff from './src/compare.js';

const getFileContent = (filePath) => {
  const fileContent = fs.readFileSync(filePath);
  return JSON.parse(fileContent);
};

export default (filePath1, filePath2) => {
  const cwd = process.cwd();
  const fullPath1 = path.resolve(cwd, filePath1);
  const fullPath2 = path.resolve(cwd, filePath2);
  const jsonData1 = getFileContent(fullPath1);
  const jsonData2 = getFileContent(fullPath2);
  const diff = getJsonDiff(jsonData1, jsonData2);
  return diff;
};
