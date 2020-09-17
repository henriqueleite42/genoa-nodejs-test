# Genoa - NodeJs Test

## Project Requirements

```md
# Teste Genoa - Backend

## Requisitos obrigatórios

- Node.js
- MySQL

## Instruções

- Você deve criar um CRUD(POST, GET, PUT, DELETE)
- Você é livre para utilizar as libs que quiser
- O case é baseado em uma contratação ficticia, a tabela deve ser baseada nessa:

| id  | cnpj           | razao_social  | data_inicio | data_final | ativo_total | abertura_empresa |
| --- | -------------- | ------------- | ----------- | ---------- | ----------- | ---------------- |
| 1   | 12345678901122 | nomedaempresa | 11/09/2020  | 11/09/2021 | R\$1500000  | 10/03/2002       |

- CRUD - permitir inserir nova empresa, listar dados do banco, atualizar dados da empresa e deletar empresa
- data_inicio/data_final - duração do seguro
- abertura_empresa - data de fundação da empresa

# Regras de negócio

1. validações de campos em branco
2. CNPJ pode ser incluido como XX.XXX.XXX/0001-XX, então a validação deve retirar caracteres especiais
3. data_inicio não pode ser maior que data_final
4. data_final deve ser 1 ano após a data_inicio
5. se o ativo total for menor que R$1000000 e maior que R$153000000, deverá retornar uma mensagem negando a contratação
6. se a empresa estiver aberta a menos de 2 anos(abertura_empresa) deverá retornar uma mensagem negando a contratação

## Duvidas ou entrega

- Dúvidas e entregas devem ser enviadas para rodrigo.pedroni@genoaseguros.com.br ou rodrigo.tanaka@genoaseguros.com.br
- Mandar o link do repositorio ou .zip sem a pasta node_modules
```

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

### List all companies

**Method**: GET

**Path**: `/companies/get-all-companies`

### Create Company

**Method**: POST

**Path**: `/companies/create`

**Params:**

| Param             | Type   | Description                                      |
| ----------------- | ------ | ------------------------------------------------ |
| cnpj              | String | Company CNPJ                                     |
| razaoSocial       | String | Company Razão Social                             |
| startDateMillis   | Number | Start Date, im Milliseconds since Epoch          |
| endDateMillis     | Number | `optional` End Date, im Milliseconds since Epoch |
| totalAssets       | Number | Company Total Assets                             |
| openingDateMillis | Number | Opening Date, im Milliseconds since Epoch        |

**Query Params:**

| Param            | Value | Description                                                    |
| ---------------- | ----- | -------------------------------------------------------------- |
| automaticEndDate | 1     | If passed, the function will generate the End Date automaticly |

### Edit Company

**Method**: PUT

**Path**: `/companies/edit`

**Params:**

| Param             | Type   | Description                                          |
| ----------------- | ------ | ---------------------------------------------------- |
| id                | String | Company ID                                           |
| razaoSocial       | String | `optional` Company Razão Social                      |
| startDateMillis   | Number | `optional` Start Date, im Milliseconds since Epoch   |
| endDateMillis     | Number | `optional` End Date, im Milliseconds since Epoch     |
| totalAssets       | Number | `optional` Company Total Assets                      |
| openingDateMillis | Number | `optional` Opening Date, im Milliseconds since Epoch |

### Delete Company

**Method**: DELETE

**Path**: `/companies/delete`

**Params:**

| Param | Type   | Description |
| ----- | ------ | ----------- |
| id    | String | Company ID  |

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
