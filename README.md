
# Hi 👋, I'm Marcos Custodio
#### Sou canditato a vaga de Desenvolvedor Full Stak

Abaixo estão as intruções para executar o projeto

# Backend

## Rotas

### Lista de filmes.
```http
  GET localhost:3000/movies
```

| Parametros| Tipo    | Descrição                       |
| :-------- | :------- | :-------------------------------- |
| `page`    | `number` | (opcional): número da página a ser retornada (padrão: 1) |
| `limit`   | `number` | (opcional): número de itens por página (padrão: 10) |


Resposta
A resposta contém os seguintes campos:

movies: lista de filmes

totalPages: número total de páginas

currentPage: número da página atual

totalItems: número total de filmes

### Retorna um filme com base no ID.

```http
  GET /movies/:id
```

| Parametros| Tipo    | Descrição                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | (obrigatório): filme a ser retornado  |

### Atualiza o banco de dados com uma lista de filmes.
```http
  GET /movies/fetch
```

Resposta

A resposta contém o campo success, que indica se a atualização foi bem-sucedida.



## Tecnologias utilizadas
- Node.js
- Express.js
- MySQL
- Axios

## Como executar
Clone este repositório.
Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:
- DB_HOST: host do banco de dados
- DB_USER: usuário do banco de dados
- DB_PASSWORD: senha do banco de dados
- DB_NAME: nome do banco de dados
- API_KEY: chave da API do The Movie DB
Instale as dependências com o comando
```bash
npm install.
```
Execute a aplicação com o comando 
```bash
npm start.
```
## front end

Execute a aplicação com o comando:
```bash
npm install.
```

Insira os dados do seu banco MySql no arquivo .env

- DB_HOST = 'localhost'
- DB_USER = 'root'
- DB_PASSWORD = ''
- DB_NAME = 'movies'

Crie um banco de dados com o nome do seu DB_NAME e nao se preocupe pois a aplicação vai criar as tabelas pra você.

Depois execute o comando:

```bash
npm run dev.
```

e certifique-se de que o banco de dados esteja rodando na porta 3000