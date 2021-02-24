# Challenge Encurtador URL

Projeto para o challenge **encurtador de URL**, onde usei a stack:

1. `Typescript`
2. `Node.js`, `Express` e `TypeORM`
3. `PostgreSQL` para persistência, rodando em um `docker` container
4. `Jest` para testes
5. `Swagger` para documentação

# Funcionamento
A aplicação gera urls reduzidas e expiraveis seguindo a regra:
* entre 5 e 10 caracteres
* apenas letras e números

Para isso, utilizei como `seed` para reduzir a URL os 8 primeiros caracteres de um uuid encoded em base62, que tem alcance de [0-9a-zA-Z]. Isso garante que a regra será seguida e, como existem 62^8 (~218 trilhões) de id's diferentes, muito raramente seria gerado um igual, mas caso ocorra, muito provavelmente uma só nova geração nos daria um id único.

Para expiração da URL, decidi não ter esse dado no banco e sim na configuração da aplicação, assim é possível mudá-lo sem precisar alterar todas as entradas no banco de dados. Idealmente seria interessante ter um bot rodando o banco de dados de tempos em tempos e deletando as URL já expiradas. Para facilitar essa consulta, poderia ser criado um indice na coluna de data de criação. Atualmente essa validação é feita nas requisições.

Acessando o endpoint de uma URL reduzida existente, a aplicação irá redirecionar o usuário para a URL original.

# Requisitos

1. `npm`
2. `docker`

# Uso
## Ambiente de Desenvolvimento
1. Rode o comando `npm i`
2. Rode o comando `docker-compose up -d` para subir a imagem do postgresSQL para desenvolvimento
3. Rode o comando `npm run dev`

A aplicação iniciará na porta 8081. Esse valor pode ser mudado através  de uma variável  de ambiente ou pelo arquivo de configuração em um `.env`

Com a aplicação rodando, é possível acessar sua documentação em: `http://localhost:8081/api-docs/` (apenas em ambiente de desenvolvimento)

Para rodar os testes, use o comando `npx jest`

## Ambiente Live
A versão `live` da aplicação está disponível em: `https://hferr-url-shortner-api.herokuapp.com/`. A estratégia de deploy foi dockerizar apenas a aplicação e subir o contêiner para o `heroku`, acessando uma instância do `Heroku Postgres` como banco de dados de produção.

# Endpoints

### Encurtar url
#### POST /encurtador

##### Request body

```
{
    "url": "http://www.google.com"
}
```
|Chave|Valor|Exemplo|
|---|---|---|
|`url`|url válido com protocolo |`"http://www.google.com"`|


##### Response

##### Success
```
{
    "newUrl": "http://localhost.com:8081/3UC6bbIT"
}
```

##### Error
```
{
    "message": "Error, invalid url format"
}
```

### Acessar url encurtada
#### GET /:id

O parametro id recebe o valor de uma url encurtada, e.g:

`GET /3UC6bbIT`

##### Response
##### Success
Caso a url encurtada exista no banco de dados, o usuário será redirecionado para a url original

##### Error
Caso a url encurtada nao exista no banco de dados, o endpoint retornará o código HTTP `404`

# Melhorias
Acredito que algumas melhorias poderiam ser:

* implementar caching
* Rotas e acesso a banco de dados poderiam ser testados com mocks ou com teste de integração
* Controle de usuários para limitar o acesso e evitar abusos da api
* Tempo de expiração da url personalizável pelo usuário
* Melhorar a documentação no swagger e deixar sua geração automatizada