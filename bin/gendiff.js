#!/usr/bin/env node
import program from 'commander';
import getDiff from '../index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filePath1> <filePath2>')
  .option('-f, --format [type]', 'output format')
  .action((filePath1, filePath2) => {
    console.log(getDiff(filePath1, filePath2));
  });

program.parse();
