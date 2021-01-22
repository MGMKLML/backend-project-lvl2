import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import process from 'process';

const getFileContent = (filePath) => {
  const fileContent = fs.readFileSync(filePath);
  return JSON.parse(fileContent);
};

const getStringFromDiff = (diff) => {
  const res = diff.reduce((prev, [key, value, sign]) => `${prev}\n  ${sign} ${key}: ${value}`, '');
  return `{${res}\n}`;
};

const findJsonDiff = (data1, data2) => {
  const merged = { ...data1, ...data2 };
  const diff = [];
  const keys = Object.getOwnPropertyNames(merged).sort();
  keys.forEach((key) => {
    if (_.has(data1, key) && !_.has(data2, key)) diff.push([key, data1[key], '-']);
    if (_.has(data2, key) && !_.has(data1, key)) diff.push([key, data2[key], '+']);
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        diff.push([key, data1[key], ' ']);
      } else {
        diff.push([key, data1[key], '-']);
        diff.push([key, data2[key], '+']);
      }
    }
  });
  return getStringFromDiff(diff);
};

export default (filePath1, filePath2) => {
  const cwd = process.cwd();
  const fullPath1 = path.resolve(cwd, filePath1);
  const fullPath2 = path.resolve(cwd, filePath2);
  const jsonData1 = getFileContent(fullPath1);
  const jsonData2 = getFileContent(fullPath2);
  const diff = findJsonDiff(jsonData1, jsonData2);
  return diff;
};
