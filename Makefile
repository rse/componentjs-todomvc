
NPM   = npm
GRUNT = ./node_modules/grunt-cli/bin/grunt 

all: build

bootstrap:
	@if [ ! -x $(GRUNT) ]; then $(NPM) install; fi

build: bootstrap
	@$(GRUNT)

test: build
	@$(GRUNT) test
cover: build
	@$(GRUNT) cover
complexity: build
	@$(GRUNT) complexity

release: bootstrap
	@$(GRUNT) release
snapshot: bootstrap
	@$(GRUNT) snapshot

clean: bootstrap
	@$(GRUNT) cleanup
distclean: clean
	-rm -rf node_modules

update-package-json: bootstrap
	$(NPM) install npm-check-updates
	./node_modules/npm-check-updates/bin/npm-check-updates -u

