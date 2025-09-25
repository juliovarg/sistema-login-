# Sistema de Login Seguro — Entrega Atividade Prática

Este repositório é destinado à entrega da Atividade Prática "Sistema de Login Seguro". O projeto é um **clone da versão atual do PFC [Aroma Sense](https://github.com/leoferamos/aroma-sense)**, com ajustes para evidenciar os requisitos de autenticação, autorização e segurança.

## Visão Geral

O sistema implementa um backend seguro em **Go (Golang)** utilizando o framework **Gin**, JWT para autenticação, bcrypt para hash de senhas, e controle de acesso por papéis (roles). O frontend é desenvolvido em **React** com Material UI, apresentando telas separadas para cada perfil de usuário (admin e cliente).

---

## Funcionalidades Atendidas

- **Cadastro, login e logout de usuários** com senha criptografada (bcrypt)
- **Autenticação JWT**: geração e validação de tokens seguros
- **Controle de acesso por roles**: rotas protegidas para admin e cliente
- **Validação de dados** no backend
- **Frontend desacoplado**: React com telas distintas para cada papel
- **Integração com banco de dados** Supabase/PostgreSQL

---

## Tecnologias Utilizadas

### Backend
- **Go (Golang)**
- **Gin** (framework web)
- **JWT** (github.com/golang-jwt/jwt/v4)
- **bcrypt** (golang.org/x/crypto/bcrypt)
- **Supabase/PostgreSQL**
- **CORS Middleware**
- **Arquitetura modular**: separation of concerns (handlers, services, repository, dto, model, middleware)

### Frontend
- **React**
- **Material UI** 
- **React Router**
- **Context API** para autenticação
- **Telas separadas** para admin e cliente

---

## Estrutura do Projeto

```
├── backend/
│   ├── cmd/api/main.go         # Entry point do servidor
│   ├── internal/
│   │   ├── auth/               # JWT, middleware, hash de senha
│   │   ├── handler/            # Handlers HTTP
│   │   ├── service/            # Lógica de negócio
│   │   ├── repository/         # Acesso ao banco
│   │   ├── dto/                # Data Transfer Objects
│   │   └── ...
│   ├── migrations/             # Scripts SQL
│   └── ...
├── frontend/
│   ├── src/pages/              # Telas React (Login, Register, Admin, Cliente, Home)
│   └── ...
└── ...
```
