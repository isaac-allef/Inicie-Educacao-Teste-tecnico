# Inicie-Educacao-Teste-tecnico

> Este é o repositório para resolução de um teste técnico para a Inicie Educação. Trata-se de uma API que elege as top 10 cidades com maior percentual de casos confirmados da COVID-19 em relação à sua população total em período.

# :pushpin: Table of Contents

* [Features](#rocket-features)
* [Exemplo](#eyes-example)
* [Installation](#construction_worker-installation)
* [Getting Started](#runner-getting-started)
* [FAQ](#postbox-faq)
* [License](#closed_book-license)

# :rocket: Features

* Busca dados sobre a COVID-19 nas cidades dos estados brasileiros
* Elege dentro de um estado escolhido as top 10 cidades com maior percentual de casos confirmados da COVID-19 em relação à sua população total em período
* Envia os resultados obtidos para outra API que irá fazer o armazenamento

# :eyes: Example

Abaixo, exemplo da chamada feita na API:
```
GET /?state=PR&dateStart=2020-05-10&dateEnd=2020-05-18
```
O código HTTP de retorno é 200 e o corpo da resposta é:
> No total são 10 itens mas aqui foram colocados somente 2
```
[
  {
    "name": "Santo Antônio do Caiuá",
    "percentageOfCases": 0.7235338918507236
  },
  {
    "name": "São João do Caiuá",
    "percentageOfCases": 0.5482268288504368
  },
  ...
]
```
Se os parâmetros da requisição estiverem errados será retornado um erro com status 400 e uma mensagem informando qual o tipo de erro. Caso aja algum erro interno será retornado um erro com status 500

# :construction_worker: Installation

**É preciso ter instalado o [Node.js](https://nodejs.org/en/download/) e o [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/), então, para clonar o projeto via HTTPS e instala-lo, execute estes comandos:**

```bash
# Clone este repositório
git clone https://github.com/isaac-allef/inicie-educacao-teste-tecnico.git

# Entre na pasta do projeto
$ cd inicie-educacao-teste-tecnico

# Instale as dependências
yarn install
```

# :runner: Getting Started

> Este project utiliza a API do Brasil.IO e para isso é necessário a utilização de um token de acesso fornecido pela organização, caso não possua um [este post](https://blog.brasil.io/2020/10/31/nossa-api-sera-obrigatoriamente-autenticada/) explica como consegui-lo.

Crie o arquivo ```.env``` na raiz do projeto e siga o arquivo de exemplo ```.env.example``` para preenche-lo com o token de acesso da API do Brasil.IO.

Então rode o seguinte comando para iniciar esta API:

```yarn dev:server```

Para rodar os testes unitários, utilize o seguinte comando:

```yarn test```

# :postbox: Faq

**Question:** What are the tecnologies used in this project?

**Answer:** The tecnologies used in this project are [NodeJS](https://nodejs.org/en/), [Express Framework](http://expressjs.com/en/), [Typescript](https://www.typescriptlang.org/) and [Jest](https://jestjs.io/).

# :closed_book: License
## :memo: License
This project is under the MIT license. See the [LICENSE](LICENSE) for more information.

---

Made with ♥ by Isaac Allef :wave:
