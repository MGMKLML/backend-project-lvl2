import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (fileName) => path.join(__dirname, '__fixtures__', fileName);

let plainTwoFilesResult, plainSameFilesResult;

beforeAll(() => {
  plainTwoFilesResult = fs.readFileSync(getFilePath('two_plain_files_res.txt')).toString();
  plainSameFilesResult = fs.readFileSync(getFilePath('same_plain_files_res.txt')).toString();
});


describe('plain json diff', () => {
  const plainJson1 = getFilePath('plain_1.json');
  const plainJson2 = getFilePath('plain_2.json');

  test('two different files', () => {
    expect(genDiff(plainJson1, plainJson2)).toBe(plainTwoFilesResult);
  });

  test('same file', () => {
    expect(genDiff(plainJson1, plainJson1)).toBe(plainSameFilesResult);
  });
});

describe('plain yaml diff', () => {
  const plainYml1 = getFilePath('plain_1.yml');
    const plainYml2 = getFilePath('plain_2.yml');
  test('two different files', () => {
    expect(genDiff(plainYml1, plainYml2)).toBe(plainTwoFilesResult);
  });

  test('same file', () => {
    expect(genDiff(plainYml1, plainYml1)).toBe(plainSameFilesResult);
  });
});
