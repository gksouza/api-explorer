Criar pasta com nome API (exemplo)
Entrar no prompt e iniciar o node

Para iniciar o Node.js (package.json)

D:\EXPLORER\STAGE8\api> npm init -y
Wrote to D:\EXPLORER\STAGE8\api\package.json:

{
  "name": "api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

D:\EXPLORER\STAGE8\api>

REQUISIÇÕES (http)
Framework Express

No terminal instalar o Express:

PS D:\EXPLORER\STAGE8\api> npm install express --save

(podemos acrescentar os módulos, conforme à ncessidade da nossa aplicação)

package-lock.json guarda infos sobre o projeto (dependências). NUNCA APAGAR!

.gitignore (evita que pastas como node.modules seja enviada para o GitHub)

route params são utilizados para dados simples (ex.: id, user, etc) - valores obrigatórios

Query params (valores opcionais)

Nodemon

Method GET
const express = require('express');

const app = express();

app.get("/message/:id/:user", (request, response) => {
  const { id, user } = request.params;

  response.send(`
    Mensagem ID: ${id}.
    Nome do usuário: ${user}
  `);
});

app.get("/users", (request, response) => {
  const { page, limit } = request.query;

  response.send( `Página: ${page}. Mostrar: ${limit}`);
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));

Method POST

const express = require('express');

const app = express();

app.post("/users", (request, response) => {
  
  response.send( "Você chamou o POST");
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));

BODY PARAMS
const express = require('express');

const app = express();
app.use(express.json());


app.post("/users", (request, response) => {
  const { name, email, password } = request.body;
  
  response.json({ name, email, password });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));

Controllers

* index - GET para listar vários registros
* show - GET para exibir um registro específico
* create - POST para criar um registro
* update - PUT para atualizar um registro
* delete - DELETE para remover um registro

Se necessitar de mais métodos, uma boa prática é criar outro arquivo de controle

HTTP Codes

Informa o status do código HTTP

Middlewares

function myMiddleware(request, response, next) {
  console.log("Você passou pelo Middleware!");
  
  if(!request.body.isAdmin) {
    return response.json({ message: "user unauthorized" });
  }

  next();
}

usersRoutes.use(myMiddleware);

SGBD

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR,
  email VARCHAR,
  password VARCHAR,
  avatar VARCHAR NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)


(alterando o nome da tabela)

ALTER TABLE users
RENAME TO clients

(adicionando uma nova coluna)
ALTER TABLE users
ADD status VARCHAR

(renomeando coluna)
ALTER TABLE users
RENAME COLUMN status TO active

(deletando uma coluna)
ALTER TABLE users
DROP COLUMN status

(inserindo dados na tabela)
INSERT INTO users
(name, email, password)
VALUES
('grace', 'g@email.com', '123')

(selecionando todos os dados)
SELECT * FROM users
(selecionando dados específicos)
SELECT id, name, email FROM users

(atualizando dados)
UPDATE users SET
avatar = 'grace.png'
WHERE id = 1

(deletando dados)
DELETE FROM users
WHERE id = 2

UsersController.js

const AppError = require("../utils/AppError");

class UsersController {
  create(request, response) {
    const { name, email, password } = request.body;

    if(!name) {
      throw new AppError("Nome é obrigatório!");
    }
  
    response.status(201).json({ name, email, password });
  }

}

module.exports = UsersController;

updating password

Duplicar abas no banco de dados é uma prática interessante para não gerar erros de PRD., exemplo:
- Esquecer de colocar / entre Base-URL e RESOURCE

async update(request, response) {
    const { name, email } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if(!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.");
    }

    user.name = name;
    user.email = email;

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      updated_at = ?
      WHERE id = ?`,
      [user.name, user.email, new Date(), id]
    );

    return response.json();   
  } 

  comentários do Knex
  // Update with your config settings.

staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

  createNotes knex (comentários)
  /**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

 /**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

