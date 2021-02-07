import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (fileName) => path.join(__dirname, '__fixtures__', fileName);

let plainTwoFilesResult;
let plainSameFilesResult;
let fullSameFilesResult;
let fullTwoFilesResult;
let twoFullPlainStyleResult;

beforeAll(() => {
  plainTwoFilesResult = fs.readFileSync(getFilePath('two_plain_files_res.txt')).toString();
  plainSameFilesResult = fs.readFileSync(getFilePath('same_plain_files_res.txt')).toString();
  fullSameFilesResult = fs.readFileSync(getFilePath('same_full_files_res.txt')).toString();
  fullTwoFilesResult = fs.readFileSync(getFilePath('two_full_files_res.txt')).toString();
  twoFullPlainStyleResult = fs.readFileSync(getFilePath('two_full_plain_style.txt')).toString();
});

describe('plain files difference, stylish', () => {
  const plainJson1 = getFilePath('plain_1.json');
  const plainJson2 = getFilePath('plain_2.json');
  const plainYml1 = getFilePath('plain_1.yml');
  const plainYml2 = getFilePath('plain_2.yml');

  test('same jsons', () => {
    expect(genDiff(plainJson1, plainJson1)).toBe(plainSameFilesResult);
  });

  test('two jsons', () => {
    expect(genDiff(plainJson1, plainJson2)).toBe(plainTwoFilesResult);
  });

  test('same yamls', () => {
    expect(genDiff(plainYml1, plainYml1)).toBe(plainSameFilesResult);
  });

  test('two yamls', () => {
    expect(genDiff(plainYml1, plainYml2)).toBe(plainTwoFilesResult);
  });

  test('json & yaml', () => {
    expect(genDiff(plainJson1, plainYml2)).toBe(plainTwoFilesResult);
  });
});

describe('full files difference', () => {
  const fullJson1 = getFilePath('full_1.json');
  const fullJson2 = getFilePath('full_2.json');
  const fullYml1 = getFilePath('full_1.yml');
  const fullYml2 = getFilePath('full_2.yml');

  test('same full jsons, stylish', () => {
    expect(genDiff(fullJson1, fullJson1)).toBe(fullSameFilesResult);
  });

  test('two full jsons, stylish', () => {
    expect(genDiff(fullJson1, fullJson2)).toBe(fullTwoFilesResult);
  });

  test('same full yamls, stylish', () => {
    expect(genDiff(fullYml1, fullYml1)).toBe(fullSameFilesResult);
  });

  test('two full yamls, stylish', () => {
    expect(genDiff(fullYml1, fullYml2)).toBe(fullTwoFilesResult);
  });

  test('full json & yaml, stylish', () => {
    expect(genDiff(fullJson1, fullYml2)).toBe(fullTwoFilesResult);
  });

  test('two full jsons, plain', () => {
    expect(genDiff(fullJson1, fullJson2, 'plain')).toBe(twoFullPlainStyleResult);
  });

  test('full json & yaml, plain', () => {
    expect(genDiff(fullJson1, fullYml2, 'plain')).toBe(twoFullPlainStyleResult);
  });
});
