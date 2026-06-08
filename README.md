# Target Personal Training Gym

Website responsivo para o ginásio Target Personal Training, com sistema de marcação de aulas, painel de administração e integração com Google Calendar e WhatsApp.

## Funcionalidades

- 🎯 Landing page moderna e responsiva
- 📅 Sistema de marcação de aulas com calendário
- 📧 Notificações por email
- 🤖 Painel administrativo para gestão de marcações
- 💬 Integração com WhatsApp
- 📊 Google Analytics integrado
- 🌐 Suporte multilíngue (PT/EN)
- 📱 Design mobile-first

## Pré-requisitos

- Node.js 24+
- pnpm 10+

## Instalação

1. **Clonar o repositório:**
```bash
git clone https://github.com/afcapitao/Target-Gym-Site.git
cd Target-Gym-Site
```

2. **Instalar dependências:**
```bash
pnpm install
```

## Desenvolvimento

**Correr o servidor de desenvolvimento:**
```bash
pnpm --filter @workspace/target-gym run dev
```

A aplicação estará disponível em `http://localhost:5173`

**Compilar TypeScript:**
```bash
pnpm run typecheck
```

## Build

**Para produção (normal):**
```bash
pnpm --filter @workspace/target-gym run build
```

**Para GitHub Pages:**
```bash
pnpm --filter @workspace/target-gym run build:gh-pages
```

## Estrutura do Projeto

```
Target-Gym-Site/
├── artifacts/
│   ├── target-gym/          # Aplicação React principal
│   │   ├── src/
│   │   │   ├── components/  # Componentes reutilizáveis
│   │   │   ├── pages/       # Páginas da aplicação
│   │   │   ├── context/     # Context providers
│   │   │   └── App.tsx      # Componente raiz
│   │   ├── public/          # Ficheiros estáticos
│   │   └── package.json
│   ├── api-server/          # Backend da API (Node.js)
│   └── mockup-sandbox/      # Sandbox para desenvolvimento
├── attached_assets/         # Imagens e assets
├── .github/workflows/       # GitHub Actions para deploy
└── package.json            # Configuração do workspace
```

## Variáveis de Ambiente

### Frontend (artifacts/target-gym)

O servidor de desenvolvimento pode correr na porta padrão ou numa porta customizada:

```bash
PORT=3000 pnpm --filter @workspace/target-gym run dev
```

### Backend

Configure as variáveis de ambiente necessárias no ficheiro `.env` (verifique no backend):
- Email configuration
- Database credentials
- Google Calendar API keys
- etc.

## Deploy

### GitHub Pages

O projeto está configurado para fazer deploy automático para GitHub Pages:

1. Cada push para `main` ativa o workflow
2. O código é compilado
3. A aplicação é publicada em `https://afcapitao.github.io/Target-Gym-Site/`

## Tecnologias

- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Estado:** React Query, Context API
- **Formulários:** React Hook Form, Zod
- **UI:** Radix UI, Lucide Icons
- **Build:** Vite
- **Analytics:** Google Analytics 4
- **Integração:** WhatsApp Web API, Google Calendar

## Licença

MIT
