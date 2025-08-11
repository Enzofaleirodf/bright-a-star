# Guia Completo - Página Principal do Lailo (Leilões)

## 📋 Visão Geral
Esta é uma página de listagem de leilões com design minimalista, filtros avançados e interface responsiva mobile-first.

## 🎨 Design System
- **Fonte Principal**: Montserrat (400, 500, 600, 700)
- **Cores Primárias**: 
  - Amarelo: #FEDA03 
  - Preto: #040405
  - Branco: #FFFFFF
- **Layout**: Mobile-first, responsivo
- **Estilo**: Minimalista, clean, abundante white space

## 🏗️ Estrutura da Página Principal

### 1. Header Component
```jsx
// Componente fixo no topo
<Header activeTab="Imóveis" onTabChange={setActiveTab} />
```
**Funcionalidades:**
- Logo "L" amarelo + texto "Lailo"
- Navegação desktop: "Imóveis" / "Veículos" 
- Botão "Assinar Pro" (preto)
- Menu hamburger (desktop only)
- **Mobile**: Apenas logo e botão "Assinar Pro"

### 2. Controls Bar Component
```jsx
<ControlsBar
  viewMode="grid" // ou "list"
  onViewModeChange={setViewMode}
  sidebarVisible={true}
  onToggleSidebar={toggleSidebar}
  activeFiltersCount={3}
/>
```
**Funcionalidades:**
- **Desktop**: Botão filtros, resetar, busca, toggle "Em andamento", notificações, grid/list
- **Mobile**: Busca, dropdown ordenação, notificações, view mode

⚠️ **IMPORTANTE**:
- **NavigationTabs.tsx existe como arquivo** mas NÃO está sendo usado na página atual
- **A navegação Imóveis/Veículos está integrada diretamente no Header.tsx** (linhas 20-41)
- **FilterBar.tsx existe** mas também não está sendo usado na implementação atual

### 3. Stats Bar Component
```jsx
<StatsBar />
```
**Funcionalidades:**
- "Encontramos 42.000 leilões em 741 sites"
- "12 novos leilões adicionados hoje" (link vermelho)
- SortDropdown no desktop
- Borda sutil cinza

### 4. Layout Principal (ESTRUTURA REAL)

**Estrutura completa da página (baseada no DOM):**
```jsx
<div className="min-h-screen bg-white font-montserrat">
  <Header activeTab={activeTab} onTabChange={setActiveTab} />

  <div className="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-8 xl:px-16">
    <ControlsBar
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      sidebarVisible={sidebarVisible}
      onToggleSidebar={() => setSidebarVisible(!sidebarVisible)}
      activeFiltersCount={activeFiltersCount}
    />

    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 pb-8 md:pb-16">
      {/* Sidebar Desktop - condicional */}
      {sidebarVisible && (
        <div className="hidden lg:block">
          {activeTab === "Imóveis" ? <Sidebar /> : <VehicleSidebar />}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        <StatsBar />

        {/* Cards Grid/List */}
        <div className={viewMode === "grid" ? "grid gap-4" : "space-y-4"}>
          {/* Cards renderizados aqui */}
        </div>

        <PropertyPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  </div>

  {/* Mobile only */}
  <FloatingFilterButton onClick={() => setMobileFilterOpen(true)} />
  <FilterModal
    isOpen={mobileFilterOpen}
    onClose={() => setMobileFilterOpen(false)}
    type={activeTab === "Imóveis" ? "property" : "vehicle"}
  />
  <MobileBottomNavigation />

  {/* Espaçamento para mobile navbar */}
  <div className="h-60 md:hidden"></div>
</div>
```

#### Desktop: Sidebar + Content
```jsx
<div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
  {/* Sidebar (hidden on mobile) */}
  <div className="hidden lg:block">
    <Sidebar /> // Filtros fixos laterais
  </div>
  
  {/* Main Content */}
  <div className="flex-1">
    <ListingResults />
    <PropertyPagination />
  </div>
</div>
```

#### Mobile: Content + Modal Filters
```jsx
// Botão flutuante para abrir filtros
<FloatingFilterButton onClick={() => setMobileFilterOpen(true)} />

// Modal de filtros mobile
<FilterModal 
  isOpen={mobileFilterOpen}
  onClose={() => setMobileFilterOpen(false)}
  type="property" // ou "vehicle"
/>

// Navbar inferior mobile
<MobileBottomNavigation activeTab="home" />
```

## 🃏 Componentes de Cards

### Card Mobile Vertical
```jsx
<AuctionCard
  layout="vertical"
  auctionType="property" // ou "vehicle"
  title="Casa"
  subtitle="120m²"
  location="Rua das Flores, 456 - São Paulo, SP"
  evaluation="R$450.000"
  currentBid="R$520.000"
  auctioneer="Alfa Leilões"
  date="25/08/14h"
  isNew={true}
  isVerified={true}
  discount="-50%"
/>
```

### Card Mobile Horizontal  
```jsx
<AuctionCard
  layout="horizontal"
  // ... mesmas props
/>
```

**Características dos Cards:**
- **Placeholder de imagem**: Gradiente cinza com ícone central
- **Badges**: "Novo" (vermelho), Desconto (verde)
- **Badge verificado**: Estrela amarela pequena
- **Coração favorito**: Animado, funcional
- **Preços**: "Avaliado em" vs "2ª Praça" com cores semânticas

## 🔍 Sistema de Filtros

### Sidebar Desktop
```jsx
<Sidebar categories={propertyCategories} type="property">
  {/* Categoria do imóvel */}
  <CategoryFilter options={["Todas", "Comercial", "Residencial"...]} />
  
  {/* Tipo do imóvel */}
  <TypeFilter options={["Casa", "Apartamento", "Terreno"...]} />
  
  {/* Metragem */}
  <MetragemFilter min={0} max={1000} />
  
  {/* Valor */}
  <ValorFilter min={0} max={10000000} />
  
  {/* Leiloeiros */}
  <LeiloeirosFilter options={["Alfa Leilões", "Beta Leilões"...]} />
</Sidebar>
```

### Modal Mobile
```jsx
<FilterModal isOpen={open} onClose={close}>
  {/* Mesmos filtros da sidebar, mas em formato mobile */}
  {/* Drawer bottom sheet style */}
</FilterModal>
```

## 📱 Componentes Mobile Específicos

### Navbar Inferior
```jsx
<MobileBottomNavigation>
  {/* 5 ícones: Imóveis, Veículos, Favoritos, Leilões, Perfil */}
  {/* Glass effect, pill shape, flutuante */}
  {/* Posição: bottom-[6.5rem] */}
</MobileBottomNavigation>
```

### Botão Filtros Flutuante
```jsx
<FloatingFilterButton>
  {/* Botão cinza, circular, ícone slider */}
  {/* Posição: bottom-[13rem] right-6 */}
</FloatingFilterButton>
```

## 📊 Estados e Dados

### Interface dos Dados
```typescript
interface AuctionItem {
  id: string;
  title: string;
  subtitle?: string;
  location: string;
  evaluation: string; // "R$450.000"
  currentBid: string; // "R$520.000"
  auctioneer: string;
  date: string; // "25/08/14h"
  discount?: string; // "-50%"
  isNew?: boolean;
  isVerified?: boolean;
  auctionType: "property" | "vehicle";
  imageUrl?: string;
}
```

### Estados Principais
```typescript
const [activeTab, setActiveTab] = useState<"Imóveis" | "Veículos">("Imóveis");
const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
const [sidebarVisible, setSidebarVisible] = useState(true);
const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(10);
const [totalItems, setTotalItems] = useState(42000);
```

## 🎯 Funcionalidades Principais

### 1. Alternância Imóveis/Veículos
- Header desktop: botões com border-bottom ativo
- Mobile: navbar inferior
- Muda categorias de filtros e dados

### 2. Grid vs List View
- Desktop: toggle button no controls bar
- Mobile: ícone no controls bar
- Grid: cards verticais
- List: cards horizontais

### 3. Busca
- Input com ícone de lupa
- Placeholder: "Buscar cidade ou estado"
- Desktop: barra larga central
- Mobile: full width

### 4. Paginação
```jsx
<PropertyPagination 
  currentPage={1}
  totalPages={10}
  totalItems={42000}
  itemsPerPage={20}
  onPageChange={setCurrentPage}
/>
```

### 5. Toggle "Em andamento"
- Switch amarelo (#FEDA03)
- Desktop: controls bar
- Mobile: pode estar em outros locais

## 📐 Layout Responsivo

### Breakpoints
- Mobile: < 768px
- Desktop: >= 768px
- Large: >= 1024px

### Spacing Mobile
- Padding lateral: px-4
- Gap entre cards: gap-4
- Espaço inferior: h-60 (para navbar)

### Spacing Desktop
- Container: max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-8 xl:px-16
- Sidebar: w-[340px] flex-shrink-0 (sticky comportamento automático)
- Gap sidebar/content: gap-6 lg:gap-8
- Cards grid: grid-cols-2 lg:grid-cols-3

### Cores Específicas Essenciais
- Borders: border-[#04040533] (Header), border-[#04040514] (Sidebar)
- Texts secundários: text-[#16161A66], text-[#04040599], text-[#0404054D]
- Backgrounds: bg-[#16161A0A] (card footers), bg-[#0404050D] (controls)
- Success: #28B833 (verde lances)
- Error: #FF5757 (vermelho lances)
- Yellow primary: #FEDA03

## 🚀 Comandos para IA

### Para recriar esta página no Next.js, use:

```
Crie uma página de listagem de leilões com estas especificações:

LAYOUT:
- Design minimalista com Montserrat
- Cores: #FEDA03 (amarelo), #040405 (preto), branco
- Mobile-first, responsivo
- Header fixo + controls + content + navbar mobile

COMPONENTES PRINCIPAIS:
1. Header: Logo "L" + "Lailo", navegação, botão "Assinar Pro"
2. ControlsBar: Filtros, busca, ordenação, view modes
3. Sidebar (desktop): Filtros categorizados colapsáveis  
4. Cards: Vertical (mobile) e horizontal, com placeholders de imagem
5. MobileBottomNavigation: 5 ícones, glass effect, pill
6. FilterModal: Bottom sheet para mobile
7. FloatingFilterButton: Cinza, flutuante
8. PropertyPagination: Navegação entre páginas

FUNCIONALIDADES:
- Alternância Imóveis/Veículos
- Filtros: categoria, tipo, metragem, valor, leiloeiros
- Grid/List view toggle
- Busca por localização
- Toggle "Em andamento"
- Paginação
- Favoritos funcionais
- Modal de filtros mobile

DADOS:
- Cards com: título, subtítulo, localização, avaliação, lance atual, leiloeiro, data
- Badges: "Novo", descontos, verificação
- 42.000+ leilões em 741 sites
- Responsivo perfeito mobile/desktop

Use Next.js 13+ com App Router, TypeScript, Tailwind CSS e Shadcn/ui.
```

## 📝 Arquivos de Referência

### Componentes Principais:
- `/client/pages/Index.tsx` - Página principal
- `/client/components/Header.tsx` - Cabeçalho com navegação integrada
- `/client/components/StatsBar.tsx` - Estatísticas e ordenação
- `/client/components/ControlsBar.tsx` - Barra de controles
- `/client/components/Sidebar.tsx` - Filtros laterais desktop (Imóveis)
- `/client/components/VehicleSidebar.tsx` - Filtros veículos
- `/client/components/AuctionCard.tsx` - Cards de leilão
- `/client/components/PropertyCard.tsx` - Cards alternativos

### Componentes UI Customizados:
- `/client/components/ui/MobileBottomNavigation.tsx` - Navbar mobile
- `/client/components/ui/FilterModal.tsx` - Modal filtros mobile
- `/client/components/ui/FloatingFilterButton.tsx` - Botão flutuante
- `/client/components/ui/PropertyPagination.tsx` - Paginação
- `/client/components/ui/SortDropdown.tsx` - Dropdown ordenação
- `/client/components/ui/Logo.tsx` - Logo Lailo
- `/client/components/ui/SidebarFooter.tsx` - Footer dos filtros
- `/client/components/ui/MetragemFilter.tsx` - Filtro de metragem
- `/client/components/ui/ValorFilter.tsx` - Filtro de valor
- `/client/components/ui/LeiloeirosFilter.tsx` - Filtro de leiloeiros
- `/client/components/ui/MarcaModeloFilter.tsx` - Filtro marca/modelo
- `/client/components/ui/AnoFilter.tsx` - Filtro de ano
- `/client/components/ui/CondicaoFilter.tsx` - Filtro condição
- `/client/components/ui/MontaFilter.tsx` - Filtro montadora

### Componentes Shadcn/ui Base (instalar via CLI):
```bash
npx shadcn-ui@latest add button input label badge card switch
npx shadcn-ui@latest add radio-group checkbox collapsible toggle-group
npx shadcn-ui@latest add sheet popover select dialog toast command
```

### Hooks Necessários:
- `/client/hooks/use-mobile.tsx` - Detecção mobile
- `/client/hooks/use-toast.ts` - Sistema de toast

### Configurações Essenciais:

**1. CSS Global (`global.css`):**
```css
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

:root {
  --primary: 50 99% 50%; /* #FEDA03 */
  --secondary: 240 11% 2%; /* #040405 */
}

body {
  @apply bg-background text-foreground font-montserrat;
}

/* Safe area support for mobile */
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
```

**2. Utils necessários (`lib/utils.ts`):**
```typescript
// Função para parsing de preços
export const parsePrice = (priceString: string): number => {
  return parseFloat(priceString.replace(/[R$.,\s]/g, '').replace(',', '.'));
};

// Cores para valores dos lances
export const getBidColor = (evaluation: string, currentBid: string) => {
  const evalValue = parsePrice(evaluation);
  const bidValue = parsePrice(currentBid);

  if (bidValue > evalValue) {
    return 'text-[#FF5757]'; // Vermelho acima da avaliação
  } else {
    return 'text-[#28B833]'; // Verde abaixo da avaliação
  }
};
```

## 🎯 **Pontos Críticos de Implementação**

1. **Header Navigation**: Inclui tabs Imóveis/Veículos integradas, não separadas
2. **Mobile Navbar**: Posição `bottom-[6.5rem]` com glass effect
3. **Floating Button**: Posição `bottom-[13rem] right-6`
4. **Cards**: Placeholder com gradiente cinza, não imagens reais
5. **Sidebar**: Condicional baseada em `sidebarVisible` state
6. **Z-index**: Navbar z-40, FloatingButton z-50, Modais z-[10003]

Este guia te permite recriar exatamente a mesma interface e funcionalidades no seu projeto Next.js!
