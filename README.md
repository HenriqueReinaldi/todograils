### Sobre:
Esta é uma TODO-list simples feita em groovy com o framework GRAILS e typescript com o framework ANGULAR.

O programa apresenta backend+banco e frontend com comunicação por meio de uma API.

### Tecnologias usadas:

- Java Temurin 17.0.20
- Groovy 5.1.0
- Grails Framework 6.2.3
- PostgreSQL
- Angular framework 16.2.16
- TypeScript 7.0.2

### Para rodar:

- Crie um banco 'todolist' no postgres. É necessário também um usuário 'postgres' com senha 'postgres' com acesso completo ao banco.
- Se o grails falhar em criar a tabela item, use o schema em `recursos/schema.sql`.
- Rode ./gradlew bootRun
    - ou ./gradlew bR
- Com o banckend rodando, entre em `frontend/`.
- Rode `ng s` para executar o frontend. O app está servido em `http://localhost:4200`
    - ou `ng s --o` para abrir o navegador na página principal.

### Informações:

- Um arquivo simples de requisições pode ser encontrado em `recursos/requests.http`. Serve como uma documentação básica
