# Fusion Starter

Um template React + Express moderno com componentes UI prontos para desenvolvimento ágil.

## 🚀 Tecnologias

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: Express server integrado
- **UI**: Radix UI + Lucide React icons
- **Roteamento**: React Router 6 (SPA mode)
- **Testes**: Vitest

## 🎯 Características

- ✅ Sistema de componentes UI completo
- ✅ Design system com TailwindCSS
- ✅ Integração client/server em porta única
- ✅ Hot reload para client e server
- ✅ TypeScript em todo o projeto
- ✅ Pronto para produção

## 🛠️ Como usar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:8080

### Build para produção

```bash
npm run build
npm start
```

### Testes

```bash
npm test
```

## 📁 Estrutura do projeto

```
client/                   # React SPA frontend
├── pages/                # Páginas (Index.tsx = home)
├── components/ui/        # Biblioteca de componentes UI
├── App.tsx              # Configuração de rotas
└── global.css           # Estilos globais TailwindCSS

server/                   # Express API backend
├── routes/              # Handlers das APIs
└── index.ts             # Configuração do servidor

shared/                   # Tipos compartilhados
└── api.ts               # Interfaces da API
```

## 🌟 Componentes incluídos

- Buttons, Inputs, Cards
- Modals, Tooltips, Dropdowns
- Forms com validação
- Layout components
- Navigation components
- E muito mais...

## 🚀 Deploy

Recomendado usar Netlify ou Vercel para deploy automático.

## 📝 Licença

MIT
