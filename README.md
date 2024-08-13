# User Management

### Screenshots

| Login                                           | Cadastro                                        | Esqueci minha senha                             | Usuários                                        |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| ![Screenshot](https://i.imgur.com/wYVX9DG.jpeg) | ![Screenshot](https://imgur.com/nG3pjKO.jpeg)   | ![Screenshot](https://imgur.com/r4P1P7m.jpeg)   | ![Screenshot](https://i.imgur.com/79pDfZc.jpeg) |
| Usuários (Novo usuário)                         | Usuários (Ver usuário)                          | Usuários (Editar usuário)                       | Usuários (Excluir usuário)                      |
| ![Screenshot](https://imgur.com/RbWieDk.jpeg)   | ![Screenshot](https://i.imgur.com/BSgKHnO.jpeg) | ![Screenshot](https://i.imgur.com/z55p3T5.jpeg) | ![Screenshot](https://i.imgur.com/XObO6Ds.jpeg) |

---

### Demonstração

Visualize a aplicação:
[https://dirosaki-user-management.vercel.app/](https://dirosaki-user-management.vercel.app/)

---

### Acessando a aplicação

|        | Admin           | User          |
| ------ | --------------- | ------------- |
| E-mail | admin@admin.com | user@user.com |
| Senha  | 12345678        | 12345678      |

---

### Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/Dirosaki/user-management
```

Entre no diretório do projeto

```bash
  cd user-management
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

---

### Funcionalidades

- [x] Login
- [x] Cadastro
- [ ] Recuperar senha
- [x] Sair da conta
- [x] Code splitting
- [x] Role-Based Access Control (RBAC)
- [x] Tema dark
- [x] Pesquisar usuários
- [x] Criar usuários
- [x] Ver usuários
- [x] Editar usuários
- [x] Excluir usuários
- [x] Editar senha
- [x] Implementar testes
- [x] Animações

---

### Tecnologias utilizadas

**Princípais:** `ReactJS`, `Typescript`, `ViteJS`, `Zustand`, `Vitest`, `React-Testing-Library`, `React-Router-Dom`, `React-Hook-Form`, `Zod`, `TailwindCSS`, `TanStack-Table`, `Shadcn` e `Sonner`.

**Outras:** `Eslint`, `Prettier`, `Husky`, `Commitlint` e `Lint-Staged`.

<details>
<summary>Por que as escolhi?</summary>

- `typescript`: Hoje em dia eu quase não vejo código "javascript", quando vejo é legado, possuo bastante experiência com `typescript` o que me deixa bem confortável e ajuda bastante na codificação.

- `Shadcn`: Pensei em utilizar essa biblioteca para economizar um pouco de tempo, apesar que ainda faltou criatividade.

- `Zustand`: Além dessa biblioteca ser leve, rápida e escalável, tem uma sintaxe simples e confortável, como não possuía uma API, acabei utilizando ela para gerenciar meus estados e aproveitei dos middlewares para persistir-los.

- `react-hook-form`: Sintaxe simples, performático e o `formik` caiu no esquecimento.

- `tailwindCSS`: Quando se fala de produtividade acho que esta biblioteca se sobressai muito em relação ao `styled-components`, estou optando por tailwindCSS em todos os projetos novos e ficando cada vez melhor.

- `react-router-dom`: Além de me sentir totalmente confortável com ela, ela é definitivamente a biblioteca mais utilizada e com maior comunidade quando se fala de roteamento.

- `tanstack-table`: Essa é com certeza a melhor biblioteca para se trabalhar com tabelas, apesar de um pouco complexa, tem coisas na sintaxe que nunca nem cheguei a usar.

</details>

---

### Referências

- [ChatGPT](https://chatgpt.com/) - Utilizei o ChatGPT para criar a função `withDelay`, queria simular o tempo de resposta de uma API, já tinha criado algo e usei como exemplo, porque o que eu criei, era meio chatinho de aplicar.
- [Shadcn Docs - Dialog](https://ui.shadcn.com/docs/components/dialog) - Consultei a documentação do Shadcn e Radix UI para auxiliar com a criação de modais dentro de dropdowns.
- [TanStack Table Docs](https://tanstack.com/table/latest/docs/introduction) - Consultei a documentação do `TanStackTable` para auxiliar na criação da tabela.
