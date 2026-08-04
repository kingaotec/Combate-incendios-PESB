# 🔥 Riscos no Combate a Incêndios — Parque Estadual Serra do Brigadeiro

Sistema web para monitoramento em tempo real das condições meteorológicas, risco de combate a incêndios florestais, Índice FMA (Monte Alegre) e focos de calor detectados por satélite na região do Parque Estadual Serra do Brigadeiro (PESB) e entorno.

![Status](https://img.shields.io/badge/status-ativo-success)
![PWA](https://img.shields.io/badge/PWA-Sim-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green)
![Offline](https://img.shields.io/badge/Offline-suporte-orange)

---

## 📷 Visão Geral

A aplicação reúne dados meteorológicos e de satélite para auxiliar equipes de prevenção e combate a incêndios florestais, apresentando:

- 🌡️ Temperatura, umidade relativa e vento
- 📅 Dias sem chuva significativa (até 110 dias de histórico)
- 🔥 Índice de Risco de Combate a Incêndios
- 📈 Índice FMA (Fogo de Mato Alegre / Monte Alegre)
- 🛰️ Focos de calor da NASA FIRMS com múltiplos períodos
- 🌬️ Animação de vento em tempo real sobre o mapa
- 🔔 Alertas sonoros por camada geográfica
- 🗺️ Mapa interativo com polígonos do PESB e Zona de Amortecimento

Tudo integrado em um painel responsivo com funcionamento offline.

---

## 📍 Área Monitorada

### 9 Municípios
- Araponga
- Divino
- Ervália
- Fervedouro
- Miradouro
- Muriaé
- Pedra Bonita
- Rosário da Limeira
- Sericita

### 11 Distritos
- Belisário (Muriaé)
- São Domingos (Araponga)
- Santo Antônio da Ventania (Ervália)
- Careço (Ervália)
- Estevão de Araújo (Araponga)
- São Vicente do Grama (Jequeri)
- Ribeirão de São Domingos (Santa Margarida)
- Bom Jesus do Divino (Divino)
- São Pedro do Glória (Fervedouro)
- Bom Jesus do Madeira (Fervedouro)
- Santa Cruz do Monte Alverne (Miradouro)

### Camadas Geográficas
- **Parque Estadual Serra do Brigadeiro** — polígono real (14.984 ha)
- **Zona de Amortecimento do PESB** — buffer de 10 km ao redor do parque

---

## 🚀 Novidades da Versão Atual

> Comparação com a versão anterior — todas as melhorias implementadas:

| Recurso | Versão Anterior | **Versão Atual** |
|---------|----------------|------------------|
| Municípios | 8 | **9** (+ Rosário da Limeira) |
| Distritos | — | **11 distritos monitorados** |
| Área geográfica | Marcador simples | **Polígonos reais do PESB e Zona de Amortecimento** |
| Focos FIRMS | Apenas 24h | **Atual / 24h / 48h / 72h** com cache independente |
| Alertas sonoros | Único para toda a área | **Por camada**: PESB ≥ 0.1 MW / Zona ≥ 5 MW |
| Animação de vento | — | **Partículas dinâmicas** com direção e velocidade |
| FMA histórico | 7 dias | **110 dias** de histórico de precipitação |
| Legendas | Estáticas | **Colapsáveis** com explicações detalhadas |
| Cache | Básico | **Cache por período FIRMS** + meteorologia v3 |
| PWA | Parcial | **Completo** com service worker, ícone e splash |

---

## ⚡ Funcionalidades Detalhadas

### 🌡️ Dados Meteorológicos em Tempo Real
- Temperatura, umidade relativa, velocidade e direção do vento
- Dados da API **Open-Meteo** (atualizados automaticamente a cada 10 minutos)
- **Cache offline** via `localStorage` para acesso sem internet

### 🎯 Índice de Risco de Combate a Incêndios
Calculado a partir de temperatura, umidade e vento:

| Faixa | Classificação | Cor |
|-------|---------------|-----|
| 0–34% | 🟢 Baixo | Verde |
| 35–59% | 🟡 Médio | Amarelo |
| 60–84% | 🟠 Alto | Laranja |
| ≥85% | 🔴 Extremo | Vermelho |

- Medidor analógico (gauge) com agulha animada
- Legendas colapsáveis com explicações de cada nível

### 📈 Índice FMA (Fogo de Mato Alegre / Monte Alegre)
Calculado automaticamente a partir de:
- Umidade relativa do ar às 13h
- Precipitação nas últimas 24 horas
- Histórico do índice do dia anterior

| FMA | Classe | Cor |
|-----|--------|-----|
| ≤ 1.0 | 🔵 Nulo | Azul |
| 1.1 – 3.0 | 🟢 Pequeno | Verde |
| 3.1 – 8.0 | 🟡 Médio | Amarelo |
| 8.1 – 24.0 | 🟠 Alto | Laranja |
| > 24.0 | 🔴 Muito Alto | Vermelho |

- **110 dias de histórico** para cálculo de dias sem chuva significativa
- Medidor gauge exclusivo para o FMA (escala azul → verde → amarelo → laranja → vermelho)
- Legendas colapsáveis explicando o que é FRP e FMA

### 🛰️ Focos de Calor (NASA FIRMS)
Dados dos satélites **VIIRS NOAA-20** em tempo real.

**4 períodos selecionáveis** (cada um com cache independente):

| Botão | Período | Descrição |
|-------|---------|-----------|
| ⏱️ **Atual** | Últimas 24h | Dados mais recentes disponíveis na API |
| 📅 **24h** | Últimas 24 horas | Padrão para monitoramento diário |
| 📅 **48h** | Últimas 48 horas | Visão ampliada do fim de semana |
| 📅 **72h** | Últimas 72 horas | Análise de tendência de 3 dias |

> **Nota sobre o "Atual":** A API NASA FIRMS trabalha em janelas de 24 horas. Os satélites VIIRS passam sobre a região a cada ~12h e o processamento leva 3–6h. O botão "Atual" busca o período `/1` (últimas 24h), que já representa os dados mais recentes disponíveis na API gratuita.

**FRP** (Fire Radiative Power) em MW:
- Mede a intensidade energética do foco de calor
- Cores dos marcadores proporcionais ao valor
- Popup detalhado com lat/lon, FRP e confiança

### 🔔 Alertas Sonoros por Camada
O sistema verifica geometricamente (algoritmo *ray-casting*) se cada foco está dentro do PESB ou na Zona de Amortecimento, aplicando limiares distintos:

| Camada | Limiar FRP | Significado |
|--------|-----------|-------------|
| **Parque Estadual Serra do Brigadeiro** | ≥ **0.1 MW** | Qualquer foco dentro do parque dispara alerta imediato |
| **Zona de Amortecimento PESB** | ≥ **5 MW** | Apenas focos intensos na área de entorno |

- Cooldown de **5 minutos** entre alertas consecutivos
- Banner visual pulsante com contagem de focos e localização
- Áudio base64 embutido (funciona offline)

### 🌬️ Animação de Vento
- Partículas animadas sobre o mapa representando direção e velocidade do vento
- Interpolação entre os pontos de monitoramento (municípios + distritos)
- Cores gradativas: ciano (fraco) → azul → violeta → roxo (forte)
- Legenda de velocidade no canto inferior esquerdo
- Ativável/desativável pelo painel de controles

### 🗺️ Mapa Interativo
Utilizando **Leaflet.js**, com três camadas de base:

- 🛣️ **Ruas** — OpenStreetMap
- 🛰️ **Satélite** — Esri World Imagery
- ⛰️ **Topográfico** — OpenTopoMap

**Elementos no mapa:**
- Polígono do PESB (verde escuro, 14.984 ha)
- Polígono da Zona de Amortecimento (verde claro, com buraco do PESB)
- Marcadores de focos de calor com raio proporcional ao FRP
- Popups informativos em todos os elementos

### 📱 PWA — Progressive Web App
A aplicação pode ser instalada em celulares e computadores:

- ✅ Ícone na tela inicial (Android/iOS)
- ✅ **Service Worker** com cache de assets e tiles do mapa
- ✅ Funcionamento **100% offline** com dados em cache
- ✅ Badge "Sem conexão" quando offline
- ✅ Splash screen e tema escuro nativo

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|-----------|-----|
| **HTML5 + CSS3** | Estrutura e estilização responsiva |
| **Vanilla JavaScript** | Toda a lógica da aplicação (sem frameworks) |
| **Leaflet.js** | Mapa interativo, polígonos e camadas |
| **OpenStreetMap / Esri / OpenTopoMap** | Camadas de base do mapa |
| **Open-Meteo API** | Dados meteorológicos gratuitos |
| **NASA FIRMS API** | Focos de calor via satélite VIIRS |
| **Service Worker** | Cache e funcionamento offline |
| **localStorage** | Persistência de dados entre sessões |

---

## 📁 Estrutura do Projeto

```
.
├── index.html          # Aplicação completa (single-file)
└── README.md           # Este arquivo
```

> A aplicação é intencionalmente um **arquivo único** para facilitar deploy, compartilhamento e funcionamento offline.

---

## 🚀 Como Executar / Deploy

### Localmente
Basta abrir o arquivo `index.html` em qualquer navegador moderno.

### Netlify (Recomendado — Gratuito)
1. Renomeie o arquivo para `index.html`
2. Acesse [netlify.com](https://www.netlify.com) e crie uma conta
3. No Dashboard, arraste o arquivo para a área de deploy
4. Pronto! URL gerada automaticamente (ex: `https://seu-site.netlify.app`)

> **Dica:** Para atualizações automáticas, conecte um repositório GitHub ao Netlify.

### Outras opções
- GitHub Pages
- Vercel
- Apache / NGINX

---

## ⚠️ Limitações Conhecidas

| Limitação | Detalhe |
|-----------|---------|
| **FIRMS "Atual"** | A API NASA FIRMS trabalha em janelas de 24h. O botão "Atual" busca o período `/1` (últimas 24h), que já é o dado mais recente disponível na API gratuita. Satélites passam a cada ~12h com processamento de 3–6h. |
| **FMA histórico** | Máximo de 110 dias (`past_days=93` + `forecast_days=16`), limite da API Open-Meteo gratuita. |
| **Alerta sonoro** | Pode ser bloqueado pelo navegador se o usuário não interagir com a página primeiro (política de autoplay). |
| **Banda do Netlify** | Plano gratuito: 100 GB/mês. Como a aplicação faz requisições diretamente do navegador para as APIs externas, o consumo de banda do Netlify é praticamente zero (só serve o HTML estático de ~250 KB). |

---

## 🔄 Atualizações Recentes (Changelog)

### v2024.08 — Principais Melhorias
- ✅ **9 municípios** (+ Rosário da Limeira)
- ✅ **11 distritos monitorados** com dados individuais
- ✅ **Polígonos reais** do PESB (14.984 ha) e Zona de Amortecimento (10 km)
- ✅ **Alertas por camada**: PESB ≥ 0.1 MW / Zona de Amortecimento ≥ 5 MW
- ✅ **Períodos FIRMS**: Atual / 24h / 48h / 72h com cache independente
- ✅ **Animação de vento** com partículas dinâmicas e interpolação
- ✅ **FMA com 110 dias** de histórico de precipitação
- ✅ **Legendas colapsáveis** para FRP, FMA e Risco de Combate
- ✅ **Interface responsiva** otimizada para desktop, tablet e mobile
- ✅ **PWA completo** com service worker, ícone, splash screen e cache de tiles

---

## 🎯 Objetivo

Fornecer uma ferramenta de apoio para:

- Brigadas de incêndio
- Gestores ambientais
- Defesa Civil
- Corpo de Bombeiros
- ICMBio
- IEF-MG
- Equipes de monitoramento ambiental

Auxiliando na tomada de decisão durante operações de prevenção e combate a incêndios florestais na região da Serra do Brigadeiro — MG.

---

## 📄 Licença

Este projeto é disponibilizado para fins educacionais, de pesquisa e apoio ao monitoramento ambiental.

Verifique as políticas de uso das APIs utilizadas antes de redistribuir os dados.

---

**Desenvolvido para proteção do Parque Estadual Serra do Brigadeiro e comunidades do entorno.** 🌲🔥
