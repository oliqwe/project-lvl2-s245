
install:
	npm install

publish:
	npm publish

lint:
	npm run eslint .

test:
	npm run test

run:
	npm run babel-node -- src/bin/gendiff.js


.PHONY: test log