import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (fileName) => path.join(__dirname, '__fixtures__', fileName);

describe('plain json diff', () => {
  test('two different files', () => {
    const plainJson1 = getFilePath('plain_1.json');
    const plainJson2 = getFilePath('plain_2.json');
    const plainResult = fs.readFileSync(getFilePath('two_plain_jsons_res.txt')).toString();

    expect(genDiff(plainJson1, plainJson2)).toBe(plainResult);
  });

  test('same file', () => {
    const plainJson = getFilePath('plain_1.json');
    const plainResult = fs.readFileSync(getFilePath('same_plain_json_res.txt')).toString();
    expect(genDiff(plainJson, plainJson)).toBe(plainResult);
  });
});
