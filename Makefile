
install:
	npm install

publish:
	npm publish

lint:
	npm run eslint .

run:
	npm run babel-node -- src/bin/gendiff.js


.PHONY: test log