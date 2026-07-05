.PHONY: up test build deploy

up:
	npm install
	npm run dev

test:
	npm test

build:
	npm run build

deploy:
	npm run build
	cp public/CNAME dist/CNAME
	npx gh-pages -d dist
