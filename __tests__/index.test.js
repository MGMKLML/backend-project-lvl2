import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (fileName) => path.join(__dirname, '__fixtures__', fileName);

let stylish;
let plain;
let stringified;

describe('plain files difference, stylish', () => {
  const stylish = fs.readFileSync(getFilePath('stylish.txt')).toString();
  const plain = fs.readFileSync(getFilePath('plain.txt')).toString();
  const stringified = fs.readFileSync(getFilePath('stringified.txt')).toString();
  const beforeJson = getFilePath('before.json');
  const afterJson = getFilePath('after.json');
  const beforeYml = getFilePath('before.yml');
  const afterYml = getFilePath('after.yml');

  test('json diff in stylish format', () => {
    expect(genDiff(beforeJson, afterJson, 'stylish')).toBe(stylish);
  });

  test('json diff in plain format', () => {
    expect(genDiff(beforeJson, afterJson, 'plain')).toBe(plain);
  });

  test('json diff in stringified format', () => {
    expect(genDiff(beforeJson, afterJson, 'json')).toBe(stringified);
  });

  test('yml diff in stylish format', () => {
    expect(genDiff(beforeYml, afterYml, 'stylish')).toBe(stylish);
  });

  test('yml diff in plain format', () => {
    expect(genDiff(beforeYml, afterYml, 'plain')).toBe(plain);
  });

  test('yml diff in stringified format', () => {
    expect(genDiff(beforeYml, afterYml, 'json')).toBe(stringified);
  });

  test('json <> yml diff in stylish format', () => {
    expect(genDiff(beforeJson, afterYml, 'stylish')).toBe(stylish);
  });

  test('json <> yml diff in plain format', () => {
    expect(genDiff(beforeJson, afterYml, 'plain')).toBe(plain);
  });

  test('json <> yml diff in stringified format', () => {
    expect(genDiff(beforeJson, afterYml, 'json')).toBe(stringified);
  });
});
