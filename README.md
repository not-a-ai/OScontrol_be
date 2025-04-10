# 🧑‍💻 Gerenciador de Ordens de Serviço - Backend

Este é o backend da aplicação de gestão de ordens de serviço. Desenvolvido com **Node.js**, **Express**, **Sequelize** e **PostgreSQL**, fornece uma API RESTful segura com autenticação JWT e controle de permissões por tipo de usuário.

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- Sequelize (ORM)
- JWT (autenticação)
- bcrypt (hash de senhas)
- dotenv
- express-validator
- cors

## 📁 Estrutura de Pastas

```plaintext
📦 src/
├── 📁 controllers/        # Lógica dos endpoints (ex: clienteController.js)
├── 📁 middleware/         # Middlewares como autenticação e tratamento de erros
├── 📁 models/             # Modelos Sequelize (ex: Usuario.js, OrdemServico.js)
├── 📁 routes/             # Definições de rotas agrupadas por entidade
│   └── index.js          # Junta todas as rotas num só lugar
├── server.js             # Ponto de entrada principal do app
├── database.js           # Conexão com o banco de dados
└── app.js                # Instância do Express e configuração de middlewares

📄 .env                    # Variáveis de ambiente
📄 package.json
```

## 🚀 Instalação e Execução

1. Clone o repositório:

```bash
git clone https://github.com/not-a-ai/OScontrol_be
cd OScontrol_be
npm install
```

2. Configure o banco de dados no arquivo .env:

```bash
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=sua_chave_secreta
```

3. Execução em desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

## 🔐 Autenticação

A aplicação utiliza autenticação JWT:

Ao fazer login, o usuário recebe um token.

Este token deve ser enviado no cabeçalho Authorization em todas as requisições protegidas.

Há middleware para validar o token e permissões.

## 👤 Tipos de Usuário e Permissões

Administrador: acesso total (CRUD de usuários, clientes e serviços).

Técnico: acesso às ordens de serviço atribuídas.

## 📌 Endpoints Principais

| Método | Rota                      | Descrição                                     |
| ------ | ------------------------- | --------------------------------------------- |
| POST   | `/login`                  | Realiza login e retorna token JWT             |
| POST   | `/usuario`                | Cria um novo usuário                          |
| GET    | `/usuario/tecnicos`       | Lista usuários com perfil técnico             |
| GET    | `/usuario/:id`            | Busca um usuário por ID                       |
| PUT    | `/usuario/:id`            | Atualiza dados de um usuário                  |
| DELETE | `/usuario/:id`            | Remove um usuário                             |
| POST   | `/clientes`               | Cria um novo cliente                          |
| GET    | `/clientes`               | Lista todos os clientes                       |
| GET    | `/clientes/:id`           | Busca um cliente por ID                       |
| PUT    | `/clientes/:id`           | Atualiza dados de um cliente                  |
| DELETE | `/clientes/:id`           | Remove um cliente                             |
| POST   | `/servico`                | Cria um novo serviço                          |
| GET    | `/servico`                | Lista todos os serviços                       |
| GET    | `/servico/:id`            | Busca um serviço por ID                       |
| PUT    | `/servico/:id`            | Atualiza dados de um serviço                  |
| DELETE | `/servico/:id`            | Remove um serviço                             |
| POST   | `/ordem-servico`          | Cria uma nova ordem de serviço                |
| GET    | `/ordem-servico`          | Lista todas as ordens de serviço              |
| GET    | `/ordem-servico/:id`      | Detalha uma ordem de serviço                  |
| PUT    | `/ordem-servico/:id`      | Atualiza uma ordem de serviço                 |
| DELETE | `/ordem-servico/:id`      | Remove uma ordem de serviço                   |
| POST   | `/atendimentos`           | Cria um novo atendimento técnico              |
| GET    | `/atendimentos/:ordem_id` | Lista os atendimentos de uma ordem de serviço |
| GET    | `/atendimentos`           | Lista os atendimentos realizados              |
| DELETE | `/atendimentos/:id`       | Remove um atendimento criado pelo técnico     |

## 👩‍💻 Desenvolvedora

Este projeto foi desenvolvido por Aléxia Costa como parte de uma atividade acadêmica, com foco em desenvolvimento web fullstack.

⚙️ Atividades realizadas no backend

- Estruturação do servidor com **Express.js**
- Conexão e manipulação de dados com **Sequelize** e **PostgreSQL**
- Criação de modelos e relacionamentos entre entidades (Usuário, Cliente, Serviço, Ordem de Serviço)
- Geração e verificação de **tokens JWT** para autenticação
- Implementação de **middleware de autenticação e autorização**
- Validação de dados com **express-validator**
- Configuração de variáveis de ambiente com **dotenv**
- Uso de **bcrypt** para hash de senhas

📅 Atividades previstas no planejamento

- ✅ Cadastro e autenticação de usuários (cliente, técnico, admin)
- ✅ CRUD de clientes, técnicos, serviços e ordens de serviço
- ✅ Controle de permissões com base no tipo de usuário
- ✅ Proteção de rotas com middleware de autenticação

---

📧 Contato: [alexia.cassia09@gmail.com]  
🔗 LinkedIn: [https://www.linkedin.com/in/alexiagcosta/](https://www.linkedin.com/in/alexiagcosta/)
