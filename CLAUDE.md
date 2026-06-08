# Target Personal Training Gym - Documentação do Projeto

## Overview

Website responsivo para o ginásio "Target Personal Training Gym". É uma aplicação React moderna com funcionalidades de marcação de aulas, painel administrativo e integração com serviços externos (Email, Google Calendar, WhatsApp, Google Analytics).

## Arquitetura

### Frontend (artifacts/target-gym)
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + Radix UI
- **Routing:** Wouter (cliente-side)
- **State Management:** React Query + Context API
- **Forms:** React Hook Form + Zod

### Backend (artifacts/api-server)
- Node.js API para suportar:
  - Sistema de marcações
  - Notificações por email
  - Sincronização com Google Calendar
  - Painel administrativo

### Deploy
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions
- **Custom Domain:** Pronto para aceitar (configuração necessária no GitHub)

## Funcionalidades Principais

### 1. Landing Page (`/`)
- **Navbar:** Logo, navegação, seletor de idioma (PT/EN), CTA de marcação
- **Footer:** Links rápidos, contactos, sociais (Instagram, Facebook, YouTube)
- **Seções:**
  - Hero com CTA
  - Sobre o ginásio
  - Serviços oferecidos
  - Planos/Preços
  - FAQ
  - Contact/Booking

### 2. Sistema de Marcação
- Modal com calendário interativo
- Seleção de data e hora
- Validação de disponibilidade
- Integração com Google Calendar
- Notificações por email

### 3. Painel Administrativo (`/admin`)
- **Autenticação:** Password-based (sessionStorage)
- **Funcionalidades:**
  - Visualizar todas as marcações
  - Adicionar/editar/deletar marcações
  - Exportar dados
  - Gestão de utilizadores

### 4. WhatsApp Button
- Botão flutuante no canto inferior direito
- Abre conversa WhatsApp com mensagem pré-preenchida
- Número: +351 910 000 000

### 5. Integração com Google Analytics
- Rastreamento de eventos:
  - Cliques no botão "Agendar"
  - Cliques no botão WhatsApp
  - Navegação entre seções
  - Mudanças de idioma

## Estrutura de Ficheiros

```
artifacts/target-gym/
├── src/
│   ├── components/
│   │   ├── gym/
│   │   │   ├── Navbar.tsx        # Header com navegação
│   │   │   ├── Footer.tsx        # Footer com contactos e links
│   │   │   └── BookingModal.tsx  # Modal de marcação
│   │   ├── WhatsAppButton.tsx    # Botão flutuante WhatsApp
│   │   └── ui/                   # Componentes Radix UI
│   ├── pages/
│   │   ├── Home.tsx              # Landing page
│   │   ├── Admin.tsx             # Painel administrativo
│   │   └── not-found.tsx         # 404 page
│   ├── context/
│   │   └── LanguageContext.tsx   # Gestão de idiomas
│   ├── lib/                      # Utilitários
│   ├── App.tsx                   # Root component
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Estilos globais
├── public/
│   ├── logo.png                  # Logo da marca
│   ├── favicon.svg               # Favicon
│   ├── opengraph.jpg             # Social preview
│   ├── robots.txt                # SEO
│   └── sitemap.xml               # SEO
├── vite.config.ts                # Config dev/build
├── vite.config.gh-pages.ts       # Config GitHub Pages
└── package.json
```

## Fluxos Principais

### 1. Marcação de Aula
1. Utilizador clica "Agendar" → Google Analytics event
2. Modal abre com calendário
3. Utilizador seleciona data/hora
4. Validação de disponibilidade (via API)
5. Confirmação envia email + sincroniza Google Calendar
6. Admin recebe notificação

### 2. Admin Login
1. Utilizador acede `/admin`
2. Se sem password → mostra formulário de login
3. Password armazenada em sessionStorage
4. Acesso a lista de marcações

### 3. Contacto via WhatsApp
1. Utilizador clica botão → Google Analytics event
2. Abre WhatsApp com mensagem pré-preenchida
3. Conversa direta com administração

## Variáveis de Ambiente

### Frontend
```bash
# Opcional - porta customizada (padrão: 5173)
PORT=3000

# Quando fazer build para GitHub Pages
GH_BASE_PATH=/Target-Gym-Site/
```

### Backend (ver artifacts/api-server/.env)
```
# Email
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

# Google Calendar API
GOOGLE_CALENDAR_ID=
GOOGLE_API_KEY=

# Database
DATABASE_URL=

# Analytics
GOOGLE_MEASUREMENT_ID=G_XXXXXXXX
```

## Idiomas Suportados

- 🇵🇹 Português
- 🇬🇧 Inglês

Textos geridos via Context (`LanguageContext.tsx`)

## Analytics Events

Google Analytics rastreia:
- `book_class` - Clique no botão "Agendar"
- `whatsapp_contact` - Clique no WhatsApp
- `language_change` - Mudança de idioma
- `navigation` - Navegação entre seções
- Page views automáticas

## Customizações Comuns

### Mudar número do WhatsApp
[artifacts/target-gym/src/components/WhatsAppButton.tsx](artifacts/target-gym/src/components/WhatsAppButton.tsx#L4)

### Mudar logo
Substituir [public/logo.png](artifacts/target-gym/public/logo.png)

### Mudar cores
[artifacts/target-gym/src/index.css](artifacts/target-gym/src/index.css) e variáveis em componentes (hex #e61f1f = vermelho principal, #141414 = preto)

### Mudar conteúdo/textos
[artifacts/target-gym/src/context/LanguageContext.tsx](artifacts/target-gym/src/context/LanguageContext.tsx)

### Adicionar Google Analytics
O ID está em [index.html](artifacts/target-gym/index.html) como `G_XXXXXXXX` - substituir pelo seu Measurement ID

## Performance & SEO

- ✅ Sitemap.xml para indexação
- ✅ Robots.txt configurado
- ✅ Open Graph metadata
- ✅ Lazy loading de imagens
- ✅ Code splitting com Vite
- ✅ Minificação automática

## Notas de Desenvolvimento

- O projeto usa monorepo com pnpm (não npm/yarn)
- Wouter é leve e adequado para SPA
- GitHub Pages requer base path: `/Target-Gym-Site/`
- O 404.html é copiado do index.html para SPA routing funcionar
- Admin password não é production-ready (usar authentication real em produção)

## Próximas Melhorias Sugeridas

- [ ] Autenticação real no painel admin (Clerk, Auth0, etc.)
- [ ] Database real (PostgreSQL, MongoDB)
- [ ] Testes E2E (Playwright, Cypress)
- [ ] Dark mode
- [ ] Integração com Stripe para pagamentos
- [ ] Sistema de reviews/testimonials
