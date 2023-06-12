include .env

default: up

## help	:	Print commands help.
.PHONY: help
help : Makefile
	@sed -n 's/^##//p' $<

## up	:	Start up containers.
.PHONY: up
up:
	@echo "Starting up containers for $(PROJECT_NAME)..."
	docker-compose pull
	mutagen-compose up -d --remove-orphans

## down	:	Stop containers.
.PHONY: down
down: stop

## start	:	Start containers without updating.
.PHONY: start
start:
	@echo "Starting containers for $(PROJECT_NAME) from where you left off..."
	mutagen-compose start 

## stop	:	Stop containers.
.PHONY: stop
stop:
	@echo "Stopping containers for $(PROJECT_NAME)..."
	@mutagen-compose stop

## prune	:	Remove containers and their volumes.
##		You can optionally pass an argument with the service name to prune single container
##		prune mariadb	: Prune `mariadb` container and remove its volumes.
##		prune mariadb solr	: Prune `mariadb` and `solr` containers and remove their volumes.
.PHONY: prune
prune:
	@echo "Removing containers for $(PROJECT_NAME)..."
	@mutagen-compose down -v $(filter-out $@,$(MAKECMDGOALS))


## ps	:	List running containers.
.PHONY: ps
ps:
	@docker ps --filter name='$(PROJECT_NAME)*'

## shell	:	Access `php` container via shell.
.PHONY: shell
shell:
	docker exec -ti -e COLUMNS=$(shell tput cols) -e LINES=$(shell tput lines) $(shell docker ps --filter name='$(PROJECT_NAME)_node' --format "{{ .ID }}") bash

## composer	:	Executes `composer` command in a specified `COMPOSER_ROOT` directory (default is `/var/www/html/docroot`).
##		To use "--flag" arguments include them in quotation marks.
##		For example: make composer "update drupal/core --with-dependencies"
.PHONY: composer
composer:
	docker exec $(shell docker ps --filter name='^/$(PROJECT_NAME)_php' --format "{{ .ID }}") composer --working-dir=$(COMPOSER_ROOT) $(filter-out $@,$(MAKECMDGOALS))

## drush	:	Executes `drush` command in a specified `DRUPAL_ROOT` directory (default is `/var/www/html/web`).
##		To use "--flag" arguments include them in quotation marks.
##		For example: make drush "watchdog:show --type=cron"
.PHONY: drush
drush:
	docker exec $(shell docker ps --filter name='^/$(PROJECT_NAME)_php' --format "{{ .ID }}") drush -r $(DRUPAL_ROOT) $(filter-out $@,$(MAKECMDGOALS))

## logs	:	View containers logs.
##		You can optinally pass an argument with the service name to limit logs
##		logs php	: View `php` container logs.
##		logs nginx php	: View `nginx` and `php` containers logs.
.PHONY: logs
logs:
	@mutagen-compose logs -f $(filter-out $@,$(MAKECMDGOALS))

## import_db	:	import DB from provided file.
##		Mainly used on local environment
.PHONY: import_db
import_db: 
	@docker cp $(filter-out $@,$(MAKECMDGOALS)) ${shell docker-compose ps -q db}:/mnt/backups/
	@docker-compose exec db bash -c 'make -f /usr/local/bin/actions.mk import source=/mnt/backups/$(filter-out $@,$(MAKECMDGOALS))'

## export_db	:	export DB to file.
##		Mainly used on local environment
.PHONY: export_db
export_db: 
	@docker-compose exec db bash -c 'make -f /usr/local/bin/actions.mk backup filepath=/mnt/backups/local_db_export.sql.gz'
	@docker cp ${shell docker-compose ps -q db}:/mnt/backups/local_db_export.sql.gz .

## export_files	:	export files.
##		Mainly used on local environment
.PHONY: export_files
export_files: 
	@docker-compose exec php bash -c 'cd /var/www/html; touch /mnt/files/.wodby.yaml; echo wodby > /mnt/files/.wodby.yml; tar cvfz ${PROJECT_NAME}-files.tar.gz -C /mnt/files/ .'
	@docker cp ${shell docker-compose ps -q php}:/var/www/html/${PROJECT_NAME}-files.tar.gz .

# https://stackoverflow.com/a/6273809/1826109
%:
	@:
