#Makefile
install:
			npm install

publish: 
			npm publish --dry-run

gendiff:
			node bin/gendiff.js

lint: 
			npx eslint .	

lintfix:
			npx eslint . --fix	

test:
			npm test

test-coverage:
			npm test -- --coverage --coverageProvider=v8