npm-install:
	npm install

bower-install:
	bower install

install: npm-install bower-install

run-app:
	grunt run-application

run-tests:
	grunt run-karma