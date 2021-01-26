import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filePath) => {
  const fileContent = fs.readFileSync(filePath);
  const ext = path.extname(filePath);
  switch (ext) {
    case '.json': return JSON.parse(fileContent);
    case '.yml': return yaml.load(fileContent);
    default: return {};
  }
};
