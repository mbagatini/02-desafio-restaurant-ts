# 💻 Sobre o desafio

Essa será uma aplicação já funcional onde o seu principal objetivo é realizar dois processos de migração: de Javascript para Typescript e de Class Components para Function Components.

O projeto atual está em com Typescript e Function Components.

### Fake API com JSON Server

Assim como utilizamos o MirageJS no módulo 2 para simular uma API com os dados das transações da aplicação dt.money, vamos utilizar o JSON Server para simular uma API que possui as informações das comidas. 

Navegue até a pasta criada, abra no Visual Studio Code e execute os seguintes comandos no terminal:

```bash
yarn
yarn server
```

Perceba que ele iniciou uma fake API com o recurso `/foods` em `localhost` na porta `3333` a partir das informações do arquivo [server.json](https://github.com/rocketseat-education/ignite-template-reactjs-refactoring-classes-ts/blob/master/server.json) localizado na raiz do seu projeto. Acessando essa rota no seu navegador, você consegue ver o retorno das informações já em JSON.

Dessa forma, basta consumir essas rotas da API normalmente com o Axios. Caso queira estudar mais sobre o **JSON Server**, dê uma olhada aqui:

[typicode/json-server](https://github.com/typicode/json-server)

## Como deve ficar a aplicação ao final?

[![restaurant](https://user-images.githubusercontent.com/17517028/141106954-f91e59e8-b7ee-43ec-9c39-2427abdd9668.png)](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d7d94fcf-b6af-40eb-a215-731ac274e475/Peek_2021-03-10_10-43.mp4)
