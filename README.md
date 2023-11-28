## Desafio
![image](https://github.com/KozielGPC/person-crud/assets/37910437/d94271e3-9110-4ba1-a7aa-2b9bd3889ae6)

# Utilização
### Serviços
O primeiro passo é subir o Redis, RabbitMQ e o MongoDB rodando `docker-compose up -d` na pasta raíz do projeto.

### Backend
```bash
# Entre na pasta backend
cd backend

# Crie o arquivo contendo as variáveis de ambiente
cp .env.example .env

# Instale as dependências
npm install

# Rode o backend
npm start
```
### Frontend
```bash
# Entre na pasta frontend
cd frontend

# Crie o arquivo contendo as variáveis de ambiente
cp .env.example .env

# Instale as dependências
npm install

# Rode o frontend
npm start
```
# Backend
Para o backend, utilizei o NodeJs. 

### Collections

A collection principal é a `Users`, definida como no exemplo abaixo:
``` json
{
	"_id": "6564d13f6a76b0f57933e45a",
	"firstName": "Márcio Gabriel",
	"lastName": "de Campos",
	"addresses": [
		{
			"street": "Cristo Rei",
			"city": "Campo Mourão",
			"state": "Paraná",
			"zipCode": "23242-423",
			"_id": "6564d73e6a76b0f57933e470"
		}
	],
	"dateOfBirth": "2023-11-02T17:26:11.561Z",
	"email": "gpcgabriel0@gmail.com",
	"documentNumber": "063.297.329-30",
	"phoneNumbers": [
		{
			"number": "(44) 99101-6824",
			"type": "work",
			"_id": "6564d79e850b5928299a28f1"
		},
		{
			"number": "(44) 99101-6482",
			"type": "personal",
			"_id": "6564d79e850b5928299a28f2"
		}
	],
	"__v": 0
	}
```

Além dela, também existe a collection de `Logs`:

``` json
{
	"_id": "6564d79e850b5928299a28f9",
	"requestTime": "2023-11-27T17:53:34.111Z",
	"responseTime": "2023-11-27T17:53:34.145Z",
	"method": "PUT",
	"url": "/6564d13f6a76b0f57933e45a/phoneNumbers",
	"statusCode": 200,
	"userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 OPR/104.0.0.0",
	"body": {
		"phoneNumbers": [
			{
				"number": "(44) 99101-6824",
				"type": "work",
				"_id": "6564d79e850b5928299a28f1"
			},
			{
				"number": "(44) 99101-6482",
				"type": "personal",
				"_id": "6564d79e850b5928299a28f2"
			}
		]
	},
	"params": {
		"id": "6564d13f6a76b0f57933e45a"
	},
	"query": {}
		"__v": 0
	}
```

### Autenticação
A autenticação é feita através de uma palavra chave, presente na variável de ambiente `API_KEY`. Para validar uma palavra chave, uma requisição é feita na rota `http://localhost:3001/auth/validate`, passando no body a chave `apiKey`, e então a api retorna um token JWT (que contém a palavra chave testada pelo usuário). Este token é salvo no redis e a cada requisição nas rotas protegidas pelo middleware de autenticação, é feita uma consulta no redis para verificar se o token está presente, e se a palavra chave é válida. Toda requisição protegida pelo middleware deve conter a chave `token` no header. Exemplo de body:

``` json
{
   "apiKey": "KEY_WORD"
}
```

### Validadores de input
Para validar os inputs recebidos pela API, utilizei o `express-validator` e criei funções de validação utilizando regex para verificar campos como email, número de telefone, documento, CEP.

### Middlewares
Dois middlewares foram implementados, explico com mais detalhes sobre eles logo abaixo na sessão de extras:
- Middleware de autenticação
- Middleware de log

## Extras

### Testes automatizados
Para demonstrar conhecimento com testes automatizados, foram escritos tanto testes unitários quanto testes e2e. No total, existem 21 casos de teste para funções de validação (no caso dos testes unitários) e requests para as principais rotas (no caso e2e)

Para rodar, basta utilizar o comando `npm run test` (na pasta backend)

### Documentação (Swagger)
A documentação completa da API pode ser acessada em `http://localhost:3001/api-docs`

![image](https://github.com/KozielGPC/person-crud/assets/37910437/b266a849-36c5-489c-8a40-842a4ee1e942)
![image](https://github.com/KozielGPC/person-crud/assets/37910437/4edfe19d-1737-4fe4-a7fe-37d852f85eca)


### Fila (RabbitMQ)
Como vi na descrição da vaga que um diferencial técnico seria o conhecimento de RabbitMQ, resolvi utilizá-lo também. O caso de uso é para a escrita de um novo registro na collection de Logs. Para cada requisição que passa pelo middleware de logs, é publicada uma mensagem para ser consumida de forma assíncrona pelo consumer, e então gerar o novo registro na collection. A ideia é que a escrita do novo log não gere gargalo nas requisições padrões. O consumidor pode ser ligado ou desligado através da variável de ambiente `LOGGER`, que por padrão vem com o valor `ON`.

### Redis
Seguindo a mesma ideia do RabbitMQ, por ver que também seria um diferencial na descrição da vaga, implementei um sistema de cache com Redis com o objetivo de validar a autenticação do usuário. A validação é feita buscando o token na memória do redis, e extraindo dele a palavra chave. Cada vez que um usuário tenta validar uma apiKey, é salvo um novo registro no Redis.

### Docker compose
4 serviços estão presentes no `docker-compose.yml`:
- Redis (porta 6379)
- RabbitMQ (porta 5672)
- Painel RabbitMQ (porta 15672)
- MongoDB (porta 27017)


# Frontend
Para o frontend, optei por usar o ant design como biblioteca para estilização. O layout se baseia em 4 principais sessões: 
- Um input para validar a palavra chave da API
- A tabela de usuários, com listagem, criação, atualização e exclusão
- Modal para criação de um novo usuário
- A tabela de logs para listagem dos registros


Além disso, o desgin foi feito visando responsividade para se adequar a qualquer tamanho de tela. Também foram adicionados validadores de formulários, máscaras de input, filtros e ordenação nas tabelas, atualização e deleção de usuários, números de telefone e endereços direto na própria tabela, facilitando a experiência do usuário.

Prints para melhor visualização: 
![image](https://github.com/KozielGPC/person-crud/assets/37910437/d3b358f0-7754-47c5-b83d-72310ef384e1)

![image](https://github.com/KozielGPC/person-crud/assets/37910437/75cdbcbd-b076-4417-8f18-d8e7982aea88)

![image](https://github.com/KozielGPC/person-crud/assets/37910437/df799036-70c9-4991-bffd-ef56925a57a3)

![image](https://github.com/KozielGPC/person-crud/assets/37910437/ab01b1bb-dea7-4dbe-a118-284e99e9316e)

![image](https://github.com/KozielGPC/person-crud/assets/37910437/79cead48-e2ca-4571-9d56-cac249baf0ea)

![image](https://github.com/KozielGPC/person-crud/assets/37910437/5ee629fb-c727-488f-a7ce-d08ff1b86db0)

![image](https://github.com/KozielGPC/person-crud/assets/37910437/0a122cab-81a7-4d6c-a368-ad600c658af8)

![image](https://github.com/KozielGPC/person-crud/assets/37910437/8344ce2d-5197-4d69-bea1-c3a7a02049d1)

## Tasks

### Backend
- [x] Criar setup inicial 
- [x] Criar conexão com banco de dados
- [x] Criar modelos do banco de dados
- [x] Criar rotas
    - [x] Create
    - [x] Update
    - [x] Read One
    - [x] Read Many
    - [x] Delete
- [x] Adicionar logs para escrita e leitura (loggar no console e também salvar em uma tabela no banco contendo ação, origem, timestamps, etc)
- [x] Adicionar validação de input nas rotas
- [x] Adicionar autenticação com jwt nas rotas (gerar API-KEY para validar requisições)
- [x] Adicionar error e success handlers personalizados
- [x] Adicionar documentação de rotas com swagger
- [x] Implementar fila com RabbitMQ
- [x] Implementar cache com Redis
- [x] Adicionar testes unitarios
- [x] Adicionar testes end to end
- [x] Criar configuração de docker-compose para subir redis, rabbitmq e mongodb

### Frontend
- [x] Criar setup inicial
- [x] Criar componente de botão de submit
- [x] Criar componente de input de texto
- [x] Criar componente de linha da tabela com botão para deletar e atualizar
- [x] Unir componentes para criar tabela de listagem
- [x] Unir componentes para criar formulario de criação
- [x] Criar conexão com o backend
- [x] Adicionar requisições para rotas
- [x] Adicionar validador de input nos formulários
- [x] Adicionar error handler
- [x] Adicionar filtros e ordenação na tabela
- [x] Adicionar loading com skeleton

### Extras (caso sobre tempo)
- [ ] Adicionar requisição para API de CEPs
- [ ] Adicionar dark/light mode
- [ ] Adicionar tradução pt-BR / en-US
