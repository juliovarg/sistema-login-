# Sistema de Login Seguro — Backend + Frontend

Projeto full-stack com backend em Go (Gin) e frontend em React + Material UI, com autenticação via JWT, controle de acesso por papéis (roles) e banco de dados PostgreSQL (Supabase ou local).

---

## 🏗 Arquitetura

- **Backend:** Go (Golang) + Gin, JWT, bcrypt para hash de senha, middleware para autorização.
- **Frontend:** React + Material UI, React Router, Context API para estado de autenticação.
- **Banco:** PostgreSQL (pode usar Supabase ou instância local).
- **Objetivo:** permitir registro, login, proteção de rotas conforme papéis (por ex. “admin” e “cliente”).

---

## 📋 Requisitos

- Go ≥ 1.21  
- Node.js ≥ 18 + npm / yarn / pnpm  
- PostgreSQL (local) ou conta no Supabase  
- Git  

---

## 🗄 Configuração do Banco (Supabase / Postgres local)

### Usando Supabase

1. Crie um projeto no Supabase.  
2. Copie a connection string (PostgreSQL) do Supabase.  
3. Use essa string nas variáveis de ambiente do backend.  
4. Rode as migrações para criar as tabelas necessárias.

### Usando Postgres local

1. Suba um servidor PostgreSQL local (por exemplo via Docker ou serviço local).  
2. Crie um banco, usuário e senha.  
3. Aponte a string de conexão nas variáveis de ambiente.  
4. Execute as migrações para criar as tabelas.

---

## ⚙ Variáveis de Ambiente

### Backend (arquivo `.env` no diretório backend)

```env
DATABASE_URL=postgres://usuario:senha@host:5432/nome_db?sslmode=disable

JWT_SECRET=seu_seguro_segredo
JWT_EXPIRES_IN=24h

CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
CORS_ALLOWED_METHODS=GET,POST,PUT,DELETE,OPTIONS
CORS_ALLOWED_HEADERS=Authorization,Content-Type

PORT=8080
