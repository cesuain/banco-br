# 🏦 Dock: Gerenciador de contas

O sistema foi criado com o objetivo de auxiliar todos os clientes da Dock com o gerenciamento de contas.

## 📍 Rotas

Abaixo segue todas as rotas e suas funcionalidades baseando-se nos métodos de requisição HTTP:

### Pessoas

| Método | Rota         | Função                                                                                                  |
| ------ | ------------ | ------------------------------------------------------------------------------------------------------- |
| POST   | /pessoas     | Envia uma requisição para inserir uma pessoa no sistema.                                                |
| GET    | /pessoas     | Envia uma requisição para obter um array com todas as pessoas.                                          |
| GET    | /pessoas/:id | Envia uma requisição para obter um objeto com as informações da pessoa que possui o id inserido na url. |
| PUT    | /pessoas/:id | Envia uma requisição para atualizar as informações da pessoa que possui o id inserido na url.           |

### Contas

| Método | Rota                    | Função                                                                                                 |
| ------ | ----------------------- | ------------------------------------------------------------------------------------------------------ |
| POST   | /contas                 | Envia uma requisição para uma conta ser inserida no sistema.                                           |
| GET    | /contas                 | Envia uma requisição para obter um array com todas as contas.                                          |
| GET    | /contas/:id             | Envia uma requisição para obter um objeto com as informações da conta que possui o id inserido na url. |
| PUT    | /contas/:id             | Envia uma requisição para atualizar as informações da conta que possui o id inserido na url.           |
| GET    | /contas/:id/saldo       | Envia uma requisição para obter o saldo da conta que possui o id inserido na url.                      |
| PUT    | /contas/:id/bloquear    | Envia uma requisição para bloquear a conta que possui o id inserido na url.                            |
| PUT    | /contas/:id/desbloquear | Envia uma requisição para desloquear a conta que possui o id inserido na url.                          |

### Transações

| Método | Rota                               | Função                                                                                                                            |
| ------ | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /transacoes/:idConta/depositar     | Envia uma requisição para realizar um depósito na conta que possui o idConta inserido na url.                                     |
| POST   | /transacoes/:idConta/sacar         | Envia uma requisição para realizar um saque na conta que possui o idConta inserido na url.                                        |
| GET    | /transacoes                        | Envia uma requisição para obter um array com todas as transações.                                                                 |
| GET    | /transacoes/buscar/:id             | Envia uma requisição para obter um array com todas as transações que possui o id inserido na url.                                 |
| GET    | /transacoes/conta/:idConta         | Envia uma requisição para obter um array com todas as transações que possui o idConta inserido na url.                            |
| GET    | /transacoes/periodo                | Envia uma requisição para obter um array com todas as transações por um determinado período.                                      |
| GET    | /transacoes/periodo/conta/:idConta | Envia uma requisição para obter um array com todas as transações que possui o idConta inserido na url por um determinado período. |

## 🔧 Como configurar o ambiente de desenvolvimento

1 - Instalar o [MySQL](https://www.mysql.com/) (O projeto foi desenvolvido utilizando a versão: 8.0.18)

2 - Instalar o [NodeJS](https://nodejs.org/en/download/) (O projeto foi desenvolvido utilizando a versão: 14.17.4)

3 - Criar um fork do projeto na sua conta

4 - Clonar o seu fork na sua máquina

```
git clone https://github.com/SEU_GITHUB/createreadme.git
```

5 - Abrir o terminal, ir até a pasta do projeto e instalar as dependências:

```
npm install
```

6 - Criar o arquivo .env e inserir as variáveis abaixo com as informações do seu database:

```
PORT=3000
DB_USERNAME=""
DB_PASSWORD=""
DB_NAME=""
DB_HOST=""
```

7 - Criar as tabelas no seu database:

```
npx sequelize-cli db:migrate
```

8 - Popular as tabelas no seu database:

```
npx sequelize-cli db:seed:all
```

9 - Iniciar o projeto com o comando abaixo:

```
npm run dev
```

## 🧪 Como configurar o ambiente de teste

1 - Instalar o [Insomnia](https://insomnia.rest/download)

2 - Criar um novo projeto

3 - Importar as configurações do arquivo Insomnia.json o qual encontra-se na raiz do projeto

4 - Executar qual teste desejar
