# Ergomanager Frontend - A node app base project

## Prerequisites
Please install and verify that your enviroment has installed and configured:

### Docker
First you must [Install docker](https://docs.docker.com/install)

### Mutagen 
Please install [mutagen install](https://mutagen.io/documentation/introduction/installation)

https://github.com/mutagen-io/mutagen/releases/tag/v0.13.1
https://github.com/mutagen-io/mutagen-compose/releases/tag/v0.13.1

### Clone and run localdevtools
Clone and run  [localdevtools](https://gitlab.com/rocket-path/localdevtools) to be able to host multiple projects.

## Initial repo setup after git clone

Edit .env
```
code .env
```
change
```
PROJECT_NAME=
PROJECT_BASE_URL=
PROJECT_STAGE_URL=
```

## Makefile - custom helper commands

Use make commands to work with the environment.
make help will list all available commands but you can just run

```
make up
```

to get started.

## Prerequisites (node container has already installed)

1. Nodejs https://nodejs.org/en/
2. Yarn

## Install project

Project codebase is located inside docroot folder 
1. Copy .env.example and rename the new file to .env
2. Change the .env contents according to your set up
3. Install the node packages

## Yarn install for dependencies
```
make shell
```
and then run `yarn install`

## Run project (Dev mode)

run the development server:

```bash
yarn dev
```



## Git tag to release for production.

When we push changes to master a new set of images is build. That way we keep in sync master branch (with merged changes) and docker hub images. When we release software we need to create a git tag, which in turn creates a versioned (tagged) image to be deployed to production.
`git tag -a v1.4.0 -m "added new shipping method"`
We try to keep [semantic versioning](https://semver.org/) for tagging.
