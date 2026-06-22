# TRIBUS LABS — DESIGN.md
> Fonte única de verdade para o build. Claude Code deve consultar este arquivo antes de criar qualquer componente ou token.

---

## 1. Identidade de marca

### Posicionamento
"Funcionários digitais" — agentes de IA e sistemas de automação que o cliente possui, não aluga.
Modelo: venda de projeto completo. Sem mensalidade de agência. Sem dependência de fornecedor.
Nicho: PMEs brasileiras (pet shops, clínicas, escolas, restaurantes, excursões) e profissionais liberais.
Sede: Guarulhos/SP.

### Voz da marca
- Técnica, provocativa e humana. Nunca motivacional genérico.
- Sempre ancorada em número real ou decisão técnica concreta.
- Sem emojis em copy formal. Sem em-dashes. Sem linguagem de guru de IA.
- Tom direto: "Você não assina. Você não aluga. Você possui."

### O que entregamos (6 serviços)
1. Site que converte — não só que existe
2. Automação dos canais — WhatsApp, Instagram e mais
3. Agente de IA que atende, agenda e cobra pelo cliente
4. Banco de dados e CRM que é do cliente, pra sempre
5. Estrutura digital que antes só empresa grande tinha
6. Conteúdo visual pensado pra atrair e vender

### Processo de entrega (3 passos)
1. Diagnóstico — entendemos onde sua operação trava
2. Construção — desenvolvemos tudo sob medida
3. Entrega das chaves — o sistema é seu. Pra sempre.

---

## 2. Sistema de cores

### Primitivos

```
gray-950:  #09090B    // dark mode base
gray-900:  #111115    // surface 1
gray-800:  #1C1C22    // surface 2
gray-700:  #27272D    // surface 3 / divisores
gray-600:  #3F3F46    // bordas hover
gray-500:  #52525B    // texto muted / ícones
gray-400:  #71717A    // placeholder
gray-300:  #A1A1AA    // texto secundário dark
gray-200:  #E4E4E7    // surface light
gray-100:  #F4F4F5    // base light
gray-50:   #FAFAFA    // page bg light
white:     #FFFFFF    // cards light

blue-300:  #93C5FD    // accent hover dark
blue-400:  #60A5FA    // accent dark mode
blue-600:  #2563EB    // accent light mode
blue-700:  #1D4ED8    // accent hover light
```

### Tokens semânticos — Tailwind v4 `@theme`

```css
@theme {
  /* Dark mode (padrão) */
  --color-bg:                #09090B;
  --color-surface-1:         #111115;
  --color-surface-2:         #1C1C22;
  --color-surface-3:         #27272D;
  --color-border:            rgba(255, 255, 255, 0.07);
  --color-border-hover:      rgba(255, 255, 255, 0.13);
  --color-accent:            #60A5FA;
  --color-accent-hover:      #93C5FD;
  --color-accent-fg:         #09090B;
  --color-text-primary:      #F4F4F5;
  --color-text-secondary:    #A1A1AA;
  --color-text-muted:        #52525B;
}
```

### Override para light mode (`[data-theme="light"]`)

```css
[data-theme="light"] {
  --color-bg:                #FAFAFA;
  --color-surface-1:         #F4F4F5;
  --color-surface-2:         #FFFFFF;
  --color-surface-3:         #E4E4E7;
  --color-border:            rgba(0, 0, 0, 0.07);
  --color-border-hover:      rgba(0, 0, 0, 0.13);
  --color-accent:            #2563EB;
  --color-accent-hover:      #1D4ED8;
  --color-accent-fg:         #FFFFFF;
  --color-text-primary:      #09090B;
  --color-text-secondary:    #52525B;
  --color-text-muted:        #71717A;
}
```

### Regras de uso de cor
- Apenas UM accent cromático: azul. Sem segundo accent.
- CTAs primários: `--color-accent` como background, `--color-accent-fg` como texto.
- Profundidade no dark: via surface ladder (bg → surface-1 → surface-2), nunca por box-shadow.
- Glass cards: `rgba(255,255,255,0.04)` + `backdrop-filter: blur(20px)` + borda `--color-border`.
- Logo: SVG theme-aware via `currentColor`. Nunca usar a versão com fundo azul-claro em contexto dark.

---

## 3. Tipografia

### Fontes

| Papel       | Família          | Fonte            |
|-------------|------------------|------------------|
| Display     | Space Grotesk    | Google Fonts     |
| Corpo       | Inter            | Google Fonts     |
| Mono/Label  | JetBrains Mono   | Google Fonts     |

### Carregamento (Next.js `next/font/google`)
```typescript
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})
```

### Escala tipográfica

| Token              | Fonte         | Desktop | Mobile | Peso | Line Height | Letter Spacing | Uso |
|--------------------|---------------|---------|--------|------|-------------|----------------|-----|
| `text-display-xl`  | Space Grotesk | 72px    | 44px   | 700  | 1.0         | -3px           | Hero headline |
| `text-display-lg`  | Space Grotesk | 56px    | 36px   | 700  | 1.05        | -2.5px         | Titles de seção |
| `text-display-md`  | Space Grotesk | 40px    | 28px   | 700  | 1.1         | -2px           | Sub-seções |
| `text-display-sm`  | Space Grotesk | 30px    | 24px   | 600  | 1.15        | -1px           | Card titles |
| `text-heading`     | Space Grotesk | 20px    | 18px   | 600  | 1.3         | -0.5px         | Headings de componente |
| `text-body-lg`     | Inter         | 18px    | 17px   | 400  | 1.7         | 0              | Lead / intro |
| `text-body-md`     | Inter         | 16px    | 15px   | 400  | 1.65        | 0              | Corpo padrão |
| `text-body-sm`     | Inter         | 14px    | 14px   | 400  | 1.6         | 0              | Texto de suporte |
| `text-label`       | Inter         | 13px    | 13px   | 500  | 1.4         | 0.04em         | Labels, badges |
| `text-eyebrow`     | JetBrains Mono| 11px    | 11px   | 400  | 1           | 0.1em          | Eyebrows de seção (uppercase) |
| `text-caption`     | Inter         | 12px    | 12px   | 400  | 1.5         | 0              | Captions, rodapés |

---

## 4. Sistema de espaçamento (base 4pt / grid 8pt)

```css
--space-1:   4px
--space-2:   8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
--space-32: 128px
```

**Seções:** padding vertical de `96px` no desktop, `64px` no mobile.
**Max-width do conteúdo:** `1200px` centralizado.
**Padding horizontal:** `24px` (mobile) → `48px` (tablet) → `0` (desktop com max-width).

---

## 5. Border radius

```css
--radius-sm:   4px      /* tags, badges */
--radius-md:   8px      /* botões, inputs, pills de nav */
--radius-lg:  12px      /* cards padrão */
--radius-xl:  16px      /* cards destacados */
--radius-2xl: 24px      /* hero elements */
--radius-pill: 9999px   /* toggle dark/light, chips */
```

**Regra:** CTAs nunca em pill. Usar `--radius-md` (8px). Pill só para toggles e tags.

---

## 6. Elevação e profundidade

No dark mode: ZERO box-shadows decorativas. Profundidade por:

1. Degraus de cor: `--color-bg` → `--color-surface-1` → `--color-surface-2`
2. Borda hairline 0.5px: `border: 0.5px solid var(--color-border)`
3. Glass card (elementos flutuantes):
```css
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 0.5px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
}
```

No light mode: `box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` nos cards.

---

## 7. Tokens de motion

```css
--duration-instant:  0ms
--duration-fast:    120ms
--duration-normal:  200ms
--duration-slow:    350ms
--duration-enter:   400ms

--ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1)
--ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1)
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)

--stagger-base: 60ms
```

### Regras de animação
- Animar APENAS `transform` e `opacity`. Nunca `width`, `height`, `top`, `left`.
- Scroll-triggered reveals: `opacity: 0→1` + `translateY: 24px→0`, duração `400ms`, easing `--ease-out`.
- Stagger entre cards/itens: `60ms` por elemento.
- Micro-interações (hover, tap): `120ms→200ms`.
- `prefers-reduced-motion: reduce` → desativar todas as animações (fade simples max 200ms).
- `will-change: transform` apenas em elementos que vão animar logo.

---

## 8. Breakpoints

```css
--screen-sm:   640px
--screen-md:   768px
--screen-lg:  1024px
--screen-xl:  1280px
--screen-2xl: 1536px
```

Mobile-first: escrever base styles para mobile, depois `md:` e `lg:` para ampliar.

---

## 9. Especificações de componentes

### Navbar (Tubelight / Floating)
- Comportamento: sticky-on-scroll-up (IntersectionObserver, NUNCA scroll listener)
- Altura: `64px` desktop / `56px` mobile
- Background no scroll: `rgba(9,9,11,0.85)` + `backdrop-filter: blur(12px)` (dark) / `rgba(250,250,250,0.90)` (light)
- Borda inferior: `border-bottom: 0.5px solid var(--color-border)`
- Conteúdo: logo (esquerda) + nav items (centro) + theme toggle + CTA button (direita)
- Max itens de nav: 5
- Mobile: collapsible com label "Menu" ou bottom bar com ícones
- Transição de aparecimento: `transform: translateY(-4px)→0` + `opacity: 0→1`, `300ms`

### Botão primário (CTA)
```css
.btn-primary {
  background: var(--color-accent);
  color: var(--color-accent-fg);
  padding: 12px 24px;
  border-radius: var(--radius-md);   /* 8px → NUNCA pill */
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.3px;
  transition: all var(--duration-fast) var(--ease-out);
}
.btn-primary:hover {
  transform: translateY(-1px);
  filter: brightness(1.1);
}
.btn-primary:active {
  transform: translateY(0);
}
.btn-primary:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

### Botão secundário (ghost)
```css
.btn-secondary {
  background: transparent;
  color: var(--color-text-primary);
  border: 0.5px solid var(--color-border-hover);
  padding: 12px 24px;
  border-radius: var(--radius-md);
  transition: all var(--duration-fast) var(--ease-out);
}
.btn-secondary:hover {
  background: var(--color-surface-1);
  border-color: var(--color-accent);
}
```

### Card de serviço
- Background: `--color-surface-1`
- Borda: `0.5px solid var(--color-border)`
- Border radius: `--radius-lg` (12px)
- Padding: `24px`
- Hover: `border-color: var(--color-accent)` + `translateY(-2px)`, duração `200ms`

### Carousel (Cases reais)
- Scroll horizontal com `scroll-snap-type: x mandatory`
- Cada card: `width: 360px` (desktop) / `width: calc(100vw - 48px)` (mobile)
- Gap: `16px`
- Peek do próximo card: `20px` visíveis
- Controles: botões seta (desktop) + swipe nativo (mobile)
- Sem auto-play. Click ou swipe para avançar.
- Dots de paginação abaixo

### Toggle dark/light
- Posição: navbar (desktop, direita) + menu mobile
- Componente: `next-themes` com atributo `data-theme` no `<html>`
- Animação: `opacity` fade `150ms` na transição de tema
- Ícone: lua (dark) / sol (light) — Tabler icons ou Lucide

---

## 10. Background do Hero

```css
.hero-bg {
  background-color: var(--color-bg);
  background-image:
    radial-gradient(
      ellipse 60% 40% at 50% 0%,
      rgba(37, 99, 235, 0.08) 0%,
      transparent 70%
    );
}
```

Opcional: grain overlay sutil (3–5% opacidade) via SVG noise filter ou CSS `url(#noise)`.
SEM WebGL no hero. SEM Three.js no above the fold (performance budget LCP < 2.5s).

---

## 11. Estrutura de seções

### 01 — Hero
- Layout: centered, coluna única
- Eyebrow: `TRIBUS LABS · GUARULHOS/SP` (JetBrains Mono, uppercase, muted)
- Headline: display-xl, Space Grotesk 700, `--color-text-primary`
- Subheadline: body-lg, Inter 400, `--color-text-secondary`, max-width 580px
- CTAs: botão primário + botão secundário ghost (gap `12px`)
- Social proof (abaixo, acima da dobra): 2-3 micro-stats horizontais (ex: `R$15.000 ROI/2 passeios`, `3 projetos entregues`)
- Background: hero-bg com glow azul sutil no topo

### 02 — Resultados que entregamos
- Objetivo: mostrar o valor de negócio, não dor específica. Empresários querem saber o que ganham.
- Layout: grid 3 colunas (desktop) / 1 coluna (mobile)
- Cada item: número grande (display-md, accent color) + label (eyebrow) + contexto curto (body-sm)
- Exemplos de métricas:
  - "R$ 15.000 — recuperados em 2 passeios" (ROI de case real)
  - "8h/semana de atendimento manual eliminadas"
  - "0 leads perdidos por falta de resposta fora do horário"
  - "Entrega completa em 30 dias"
- SEM copy de dor/problema nesta seção. Apenas resultado.

### 03 — O que entregamos
- Eyebrow: "SERVIÇOS"
- Título de seção: display-lg
- Layout: grade 2×3 (desktop) / 1×6 (mobile)
- Cada card: ícone (Lucide/Tabler) + título (heading) + 1 linha de descrição (body-sm)
- Hover: borda accent
- Os 6 serviços:
  1. Site que converte — não só que existe
  2. Automação dos canais — WhatsApp, Instagram e mais
  3. Agente de IA — atende, agenda e cobra por você
  4. Banco de dados e CRM — seu, pra sempre
  5. Estrutura digital — o que antes só empresa grande tinha
  6. Conteúdo visual — pensado pra atrair e vender

### 04 — Posicionamento diferencial
- Layout: fullwidth com fundo `--color-surface-1`, padding vertical maior (120px)
- Eyebrow: "POR QUE A TRIBUS"
- Headline grande (display-lg): "Você não assina. Você não aluga. Você possui."
- 3 pontos de contraste em grid:
  - ✗ Mensalidade de agência → ✓ Projeto com preço fixo
  - ✗ Ferramenta avulsa → ✓ Sistema completo e integrado
  - ✗ Dependência de fornecedor → ✓ Código e dados são seus

### 05 — Como funciona
- Eyebrow: "PROCESSO"
- 3 steps horizontais (desktop) / verticais (mobile)
- Step counter: `01`, `02`, `03` em JetBrains Mono, `--color-accent`
- Título do step: heading, Space Grotesk 600
- Descrição: body-sm, Inter 400, muted
- Conectores entre steps: linha simples `1px` accent, opacity 30%
- Steps:
  1. Diagnóstico — entendemos onde sua operação trava
  2. Construção — desenvolvemos tudo sob medida
  3. Entrega das chaves — o sistema é seu. Pra sempre.

### 06 — Empresas que entenderam cedo
- Eyebrow: "O MERCADO JÁ DECIDIU"
- Título: "Quem não adotou cedo, correu atrás depois."
- Layout: bento grid ou logo cards com stat
- Conteúdo — exemplos de empresas globais com IA e resultado concreto:
  - **Amazon**: recomendações de IA respondem por 35% da receita total
  - **Netflix**: algoritmo de recomendação economiza US$ 1 bi/ano em retenção
  - **JPMorgan Chase**: sistema COIN analisa 360.000 horas de trabalho jurídico em segundos
  - **McDonald's**: IA em cardápios dinâmicos reduziu desperdício alimentar em 10%+
  - **Airbnb**: Smart Pricing com IA aumentou receita de anfitriões em média 20%
  - **Spotify**: Discover Weekly com IA — 40 milhões de ouvintes no primeiro mês
- Fechamento: "Seu concorrente já está se movendo. A pergunta é: e você?"

### 07 — Cases reais
- Eyebrow: "RESULTADOS"
- Título: display-lg
- Componente: carousel horizontal com scroll-snap
- Cada card (360px wide):
  - Nome do cliente + segmento (eyebrow)
  - Desafio em 1 linha (body-sm, muted)
  - Resultado específico (display-sm, accent color)
  - Contexto do resultado (body-sm)
- Controles: setas + dots

### 08 — CTA Final
- Layout: fullwidth dark (mesmo em light mode — seção permanece `--color-bg` dark)
- Eyebrow: "PRÓXIMO PASSO"
- Headline: display-lg — "Vamos modernizar sua empresa?"
- Subhead: body-lg — "Diagnóstico gratuito. Resposta em 24h. Sem compromisso."
- Formulário de qualificação (3-4 campos máx):
  - Nome completo
  - Segmento / tipo de empresa
  - Principal gargalo operacional (select com opções pré-definidas)
  - WhatsApp
- Botão: "Quero conhecer" (primário)
- Microcopy abaixo do botão: "Sem spam. Sem ligação sem aviso."

---

## 12. Logo

- Formato primário: SVG lockup (ícone de frasco + wordmark "TRIBUS LABS")
- Cores no SVG: `currentColor` para o wordmark (theme-aware), accent fixo para as estrelas (ouro no logo original — avaliar adaptação para accent azul no contexto dark)
- Tamanho mínimo: `120px` de largura
- Clear space: `logo-height × 0.5` em todos os lados
- Em dark mode: versão clara (branca/cinza-clara)
- Em light mode: versão escura (navy original)
- NUNCA usar o PNG com fundo azul-claro — usar o SVG sem background

---

## 13. Stack de implementação

| Camada | Tecnologia | Versão |
|--------|------------|--------|
| Framework | Next.js App Router | 15+ |
| Estilização | Tailwind CSS | v4 (CSS-first) |
| Componentes | shadcn/ui | latest |
| Animação | Framer Motion / motion | latest |
| Tema | next-themes | latest |
| Deploy | Vercel | - |
| Fontes | next/font/google | - |
| Ícones | Lucide React ou Tabler | latest |

### Performance (gates de release)
- LCP < 2.5s: `<Image>` do Next.js + `fetchpriority="high"` na imagem hero
- INP < 200ms: sem scroll listeners (IntersectionObserver)
- CLS < 0.1: width/height explícitos em todas as mídias
- SEM lazy-load na imagem LCP do hero
- SEM WebGL/Three.js acima da dobra

### SEO mínimo
- `metadata` com title, description e Open Graph em `app/layout.tsx`
- Schema `Organization` no JSON-LD
- Todas as seções com ID para âncora: `#servicos`, `#como-funciona`, `#cases`, `#contato`

---

## 14. Acessibilidade

- Contraste de texto: mínimo 4.5:1 (AA). `--color-text-primary` sobre `--color-bg` passa em ambos os modos.
- Focus: `outline: 2px solid var(--color-accent); outline-offset: 2px` em todos os elementos interativos.
- `scroll-margin-top: 80px` em todas as âncoras (compensar navbar sticky).
- Carousel: `aria-label`, botões de navegação com `aria-label`, suporte a teclado (setas).
- Toggle de tema: `aria-label="Alternar tema"`.
- `prefers-reduced-motion`: wrapper em todos os `motion.*` components.

---

*Versão 1.0 — Tribus Labs — Junho 2026*
*Atualizar este arquivo antes de qualquer mudança de token, componente ou seção.*
