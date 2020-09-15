# Template with Typescript, Postgres and Docker

## Getting Started

### Dependencies

- [Ubunto based linux distro](https://ubuntu.com/)
- [Docker](https://www.docker.com/)
- [Docker-Compose](https://docs.docker.com/compose/)
- [Make](https://askubuntu.com/questions/161104/how-do-i-install-make)
- [Postgres](https://www.postgresql.org/)
- [Yarn (for tests)](https://classic.yarnpkg.com/en/)

### Installing

#### Make:

```sh
sudo apt-get install build-essential
```

#### Docker:

Follow the official documentation: [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)

#### Docker-Compose:

Follow the official documentation: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

#### Postgres:

On Ubunto 20, follow this tutorial: [https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart)

#### Clone the project:

```sh
git clone git@github.com:henriqueleite42/genoa-backend-test.git

cd genoa-backend-test
```

### Executing

With `make`, Docker and Docker-Compose insatalled, run:

```sh
sudo make up
```

### Stoping

To stop the program from running, run:

With `make` and Docker:

```sh
sudo make stop
```

## Routes

After run the app, send a GET request to `http://localhost:8080` and this will return a tutorial about the routes

## Tips

In case you use the browser to make requests, it's recommended to use the [JSON Viewer](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh) plugin

## Help

For more information on the commands available, run:

```sh
sudo make help
```

## Tests

Install `yarn`:

Follow the official documentation: [https://classic.yarnpkg.com/en/docs/install](https://classic.yarnpkg.com/en/docs/install)

Install the application locally:

```sh
yarn
```

Run the tests with the command:

```sh
yarn test
```
