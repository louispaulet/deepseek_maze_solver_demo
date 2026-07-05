.PHONY: up lint test build deploy

up:
	npm install
	npm run dev

lint:
	npm run lint

test:
	npm test

build:
	npm run build

deploy:
	npm run build
	cp public/CNAME dist/CNAME
	npx gh-pages -d dist
