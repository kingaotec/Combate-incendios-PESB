# 🔥 Monitoramento Tático de Incêndios — Parque Estadual Serra do Brigadeiro

Sistema web para monitoramento em tempo real das condições meteorológicas, risco de combate a incêndios florestais, Índice FMA (Monte Alegre) e focos de calor detectados por satélite na região do Parque Estadual Serra do Brigadeiro (PESB) e entorno.

## 📷 Visão Geral

A aplicação reúne dados meteorológicos e de satélite para auxiliar equipes de prevenção e combate a incêndios florestais, apresentando:

* 📍 **Ferramenta de GPS:** Orientação tática em campo com plotagem de raio de precisão.
* 🌡️ Temperatura, umidade relativa e vento
* 📅 **Dias de estiagem:** Contagem de dias sem chuva significativa (otimizado para 92 dias de histórico em uma única requisição).
* 🔥 Índice de Risco de Combate a Incêndios
* 📈 Índice FMA (Fórmula de Monte Alegre)
* 🛰️ Focos de calor da NASA FIRMS com múltiplos períodos
* 🌬️ Animação de vento em tempo real sobre o mapa
* 🔔 Alertas sonoros por camada geográfica
* 🗺️ Mapa interativo com polígonos do PESB e Zona de Amortecimento

Tudo integrado em um painel responsivo com funcionamento offline.

---

## 📍 Área Monitorada

### 20 Localidades Unificadas

Os 9 municípios e 11 distritos foram unificados em uma única lista dinâmica e são ordenados automaticamente em tempo real, **priorizando no topo as localidades com o maior risco de combate**.

* **Municípios:** Araponga, Divino, Ervália, Fervedouro, Miradouro, Muriaé, Pedra Bonita, Rosário da Limeira, Sericita.
* **Distritos:** Belisário, São Domingos, Santo Antônio da Ventania, Careço, Estevão de Araújo, São Vicente do Grama, Ribeirão de São Domingos, Bom Jesus do Divino, São Pedro do Glória, Bom Jesus do Madeira, Santa Cruz do Monte Alverne, Dom Viçoso.

### Camadas Geográficas

* **Parque Estadual Serra do Brigadeiro** — polígono real (14.984 ha)
* **Zona de Amortecimento do PESB** — buffer de 10 km ao redor do parque

---

## 🚀 Novidades da Versão Atual

> Comparação com a versão anterior — todas as melhorias implementadas:

| Recurso | Versão Anterior | **Versão Atual** |
| --- | --- | --- |
| **GPS** | Ausente | **Ativação de Geolocalização** com raio de precisão |
| **Lista de Locais** | Separada e Estática | **Unificada (20 localidades) e Ordenada** pelo maior Risco |
| **Acessibilidade** | Genérica (`<div>`) | **Botões semânticos e atributos WAI-ARIA** (`aria-expanded`) |
| **Focos FIRMS** | Apenas 24h | **24h / 48h / 72h** com cache independente |
| **Alertas Sonoros** | Único para toda a área | **Por camada tática**: PESB $\ge$ 0.1 MW / Zona $\ge$ 5 MW |
| **Mídia de Alerta** | Base64 embutido no JS | **Arquivo externo (`alert.mp3`)** para carregamento rápido |
| **Estiagem (FMA)** | 7 dias | **92 dias de histórico** otimizados na API Open-Meteo |
| **PWA / Estrutura** | Parcial / CSS Repetitivo | **Variáveis CSS nativas, tags semânticas (HTML5) e PWA Completo** |

---

## ⚡ Funcionalidades Detalhadas

### 📍 Posicionamento Tático (GPS)

* Botão dedicado para triangulação de geolocalização do dispositivo móvel do brigadista.
* Exibição do raio de precisão em metros (essencial para áreas de sombra de sinal na serra).

### 🌡️ Dados Meteorológicos em Tempo Real

* Temperatura, umidade relativa, velocidade e direção do vento
* Dados da API **Open-Meteo** (atualizados automaticamente a cada 10 minutos)
* **Cache offline** via `localStorage` para acesso sem internet

### 🎯 Índice de Risco de Combate a Incêndios

Calculado a partir de temperatura, umidade e vento:

| Faixa | Classificação | Cor |
| --- | --- | --- |
| 0–34% | 🟢 Baixo | Verde |
| 35–59% | 🟡 Médio | Amarelo |
| 60–84% | 🟠 Alto | Laranja |
| $\ge$85% | 🔴 Extremo | Vermelho |

* Medidor analógico (gauge) com agulha animada
* Legendas colapsáveis com explicações de cada nível

### 📈 Índice FMA (Fogo de Mato Alegre / Monte Alegre)

Calculado automaticamente a partir de:

* Umidade relativa do ar às 13h
* Precipitação nas últimas 24 horas
* Histórico do índice do dia anterior

| FMA | Classe | Cor |
| --- | --- | --- |
| $\le$ 1.0 | 🔵 Nulo | Azul |
| 1.1 – 3.0 | 🟢 Pequeno | Verde |
| 3.1 – 8.0 | 🟡 Médio | Amarelo |
| 8.1 – 24.0 | 🟠 Alto | Laranja |
| > 24.0 | 🔴 Muito Alto | Vermelho |

* Medidor gauge exclusivo para o FMA (escala azul $\rightarrow$ verde $\rightarrow$ amarelo $\rightarrow$ laranja $\rightarrow$ vermelho)

### 🛰️ Focos de Calor (NASA FIRMS)

Dados dos satélites **VIIRS NOAA-20** em tempo real.

**4 períodos selecionáveis** (com cache de requisição para economia de dados móveis):

* ⏱️ **Atual:** Últimas 24h
* 📅 **24h:** Últimas 24 horas
* 📅 **48h:** Últimas 48 horas
* 📅 **72h:** Últimas 72 horas

### 🔔 Alertas Sonoros por Camada (Ray-Casting)

O sistema verifica geometricamente (algoritmo *ray-casting*) se cada foco está dentro do PESB ou na Zona de Amortecimento, aplicando limiares distintos:

| Camada | Limiar FRP | Significado |
| --- | --- | --- |
| **Parque Estadual Serra do Brigadeiro** | $\ge$ **0.1 MW** | Qualquer foco dentro do parque dispara alerta imediato |
| **Zona de Amortecimento PESB** | $\ge$ **5 MW** | Apenas focos intensos na área de entorno |

### 🗺️ Mapa Interativo

Utilizando **Leaflet.js**, com três camadas de base:

* 🛣️ **Ruas** — OpenStreetMap
* 🛰️ **Satélite** — Esri World Imagery
* ⛰️ **Topográfico** — OpenTopoMap

---

## 📁 Estrutura do Projeto

O sistema foi otimizado para rodar de forma limpa a partir de um único arquivo de interface, acoplado a uma pasta de mídias para desempenho máximo do navegador.

```text
📁 Monitoramento-PESB
 ├── 📄 index.html      # Aplicação completa (interface, estilos e scripts lógicos)
 ├── 📄 README.md       # Documentação do projeto
 └── 📁 assets          # Pasta de arquivos estáticos
      └── 🎵 alert.mp3  # Arquivo de áudio para o gatilho de focos extremos

```

---

## 🚀 Como Executar / Deploy

### Localmente

1. Garanta que a estrutura de pastas acima foi mantida.
2. Basta abrir o arquivo `index.html` em qualquer navegador moderno.

---

## 🎯 Objetivo

Fornecer uma ferramenta de apoio de alta precisão tecnológica para:

* **Corpo de Bombeiros Militar de Minas Gerais (CBMMG)**
* **Brigadistas Florestais**
* Defesa Civil
* Gestores ambientais
* ICMBio e IEF-MG

Auxiliando na tomada de decisão durante operações de prevenção e combate a incêndios florestais na região da Serra do Brigadeiro — MG.

---

## 📄 Licença

Este projeto é disponibilizado para fins educacionais, de pesquisa e apoio ao monitoramento ambiental.

Verifique as políticas de uso das APIs utilizadas antes de redistribuir os dados.

**Desenvolvido para proteção do Parque Estadual Serra do Brigadeiro e comunidades do entorno.** 🌲🔥
