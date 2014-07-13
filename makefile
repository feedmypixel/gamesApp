npm-install:
	npm install

bower-install:
	bower install

install: npm-install bower-install

run:
	grunt run-application

run-tests:
	grunt run-karma