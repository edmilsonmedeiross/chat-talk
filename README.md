# Chat-Talk

Chat-Talk é uma aplicação de chat desenvolvida com as mais recentes tecnologias web, oferecendo uma experiência de mensagens em tempo real simulada. Este projeto foi criado com o objetivo de demonstrar a aplicação de conceitos modernos de desenvolvimento web e práticas de design de interface.

![image](https://github.com/edmilsonmedeiross/chat-talk/assets/110620775/b7c90a76-5c6d-4186-9bef-175d671b3501)

## Tecnologias Utilizadas

- React: Uma biblioteca JavaScript para criar interfaces de usuário.
- TypeScript: Superset de JavaScript que adiciona tipagem estática.
- Next.js: Framework React para produção que oferece diversas funcionalidades como SSR (Server Side Rendering) e SSG (Static Site Generation).
- Chakra UI: Uma biblioteca de componentes simples, modular e acessível para React que facilita a construção de interfaces de usuário atraentes e responsivas.
- Context API: Utilizada para gerenciar o estado global da aplicação.
- React Hook Form: Biblioteca para gerenciar formulários em React com validação.
- Zod: Biblioteca de validação de dados para TypeScript.
- LocalStorage: Utilizado como "database" simulado para armazenar dados da aplicação.
- Cookies: Utilizados para gerenciar sessões de usuário.

## Funcionalidades

- Tela de Login e Registro: Com validação de dados utilizando React Hook Form e Zod.
- Tela de Bem-Vindo: Após o login, o usuário é direcionado para uma tela de boas-vindas com uma sidebar que permite visualizar as salas de chat disponíveis, criar novas salas, editar salas existentes e navegar entre as salas.
- Gestão de Salas: Possibilidade de criar e editar as informações das salas de chat.
- Chat em Tempo Real Simulado: Ao clicar em uma sala na sidebar, o usuário é redirecionado para a tela da sala onde pode participar de uma conversa simulada em tempo real.

## Nota sobre LocalStorage

O LocalStorage é utilizado como um "database" simulado apenas para fins de demonstração. Isso significa que os dados armazenados são salvos no navegador do usuário e podem ser limpos ou perdidos sob certas condições.

## Rodando o Projeto Localmente

- Para rodar o projeto localmente, siga os passos abaixo:

## Pré-requisitos

- Node.js instalado na sua máquina.
- Gerenciador de pacotes NPM ou Yarn.

## Instruções

1. Clone o repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/chat-talk.git
```

2. Navegue até o diretório do projeto:

```bash
cd chat-talk
```

3. Instale as dependências do projeto:

- Com NPM:

```bash
npm install
```

- Com Yarn:

```bash
yarn
```

4. Inicie o servidor de desenvolvimento:

- Com NPM:

```bash
npm run dev
```

- Com Yarn:

```bash
yarn dev
```

5. Abra seu navegador e acesse http://localhost:3000 para ver a aplicação rodando.

### Sinta-se livre para contribuir com o projeto e sugerir melhorias!
