API do projeto final do Bootcamp Cataline
Docker
Vue.js, Nuxt.js
Node.js, Adonis.js, socket.io

Instale o Docker Desktop ou apenas o Docker Compose.

# Instalar dependências:
$ npm install

# Criar o container com MySQL:
$ docker-compose up -d

# Criar as tabelas/estruturas na dB:
$ node ace migration:run

# Criar arquivo ".env" na pasta raiz com base no ".env.example"

# Rodar o servidor local:
node ace serve --watch