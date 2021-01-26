import _ from 'lodash';

const getStringFromDiff = (diff) => {
  const res = diff.reduce((prev, [key, value, sign]) => `${prev}\n  ${sign} ${key}: ${value}`, '');
  return `{${res}\n}`;
};

export default (jsonData1, jsonData2) => {
  const merged = { ...jsonData1, ...jsonData2 };
  const diff = [];
  const keys = Object.getOwnPropertyNames(merged).sort();
  keys.forEach((key) => {
    if (_.has(jsonData1, key) && !_.has(jsonData2, key)) diff.push([key, jsonData1[key], '-']);
    if (_.has(jsonData2, key) && !_.has(jsonData1, key)) diff.push([key, jsonData2[key], '+']);
    if (_.has(jsonData1, key) && _.has(jsonData2, key)) {
      if (jsonData1[key] === jsonData2[key]) {
        diff.push([key, jsonData1[key], ' ']);
      } else {
        diff.push([key, jsonData1[key], '-']);
        diff.push([key, jsonData2[key], '+']);
      }
    }
  });
  return getStringFromDiff(diff);
};
