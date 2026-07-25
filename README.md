Ferramenta de monitoramento das condições meteorológicas e do risco de incêndio dos municípios do entorno do Parque Estadual da Serra do Brigadeiro - MG.
# 🔥 Riscos no Combate a Incêndios - Parque Estadual Serra do Brigadeiro

Sistema web para monitoramento em tempo real das condições meteorológicas, risco de combate a incêndios florestais, Índice FMA (Monte Alegre) e focos de calor detectados por satélite na região do Parque Estadual Serra do Brigadeiro (PESB).

![Status](https://img.shields.io/badge/status-ativo-success)
![PWA](https://img.shields.io/badge/PWA-Sim-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green)

---

## 📷 Visão Geral

A aplicação reúne dados meteorológicos e de satélite para auxiliar equipes de prevenção e combate a incêndios florestais, apresentando:

- 🌡️ Temperatura
- 💧 Umidade relativa do ar
- 🌬️ Velocidade e direção do vento
- ☔ Precipitação nas últimas 24 horas
- 📅 Dias sem chuva significativa
- 🔥 Índice de Risco de Combate
- 📈 Índice FMA (Monte Alegre)
- 🛰️ Focos de calor da NASA FIRMS

Tudo isso integrado em um painel interativo com mapa e indicadores visuais.

---

# Funcionalidades

## 📍 Monitoramento de 8 municípios

- Araponga
- Divino
- Ervália
- Fervedouro
- Miradouro
- Muriaé
- Pedra Bonita
- Sericita

---

## 🗺️ Mapa Interativo

Utilizando **Leaflet**, o sistema oferece três camadas de visualização:

- 🛣️ OpenStreetMap
- 🛰️ Imagem de Satélite (Esri)
- ⛰️ Topográfico (OpenTopoMap)

Cada município apresenta um marcador indicando:

- Direção do vento
- Intensidade do risco
- Informações meteorológicas
- Índice FMA

Também são exibidos:

- Limite aproximado da área monitorada
- Localização do Parque Estadual Serra do Brigadeiro
- Focos de calor detectados

---

## 🔥 Cálculo do Risco de Combate

O índice de risco é calculado considerando:

- Temperatura
- Umidade
- Velocidade do vento

Os níveis são classificados como:

| Faixa | Classificação |
|-------|---------------|
| 0–34% | 🟢 Baixo |
| 35–59% | 🟡 Médio |
| 60–84% | 🟠 Alto |
| ≥85% | 🔴 Extremo |

---

## 📈 Índice FMA (Monte Alegre)

O sistema implementa automaticamente o cálculo do índice FMA utilizando:

- Umidade relativa às 13h
- Chuva acumulada nas últimas 24 horas
- Histórico do índice do dia anterior

Classificação:

| FMA | Classe |
|-----|---------|
| ≤ 1 | Nulo |
| 1.1 – 3 | Pequeno |
| 3.1 – 8 | Médio |
| 8.1 – 24 | Alto |
| > 24 | Muito Alto |

---

## 🛰️ Integração com APIs

### Open-Meteo

Utilizada para obtenção de:

- Temperatura
- Umidade
- Vento
- Direção do vento
- Histórico de precipitação

https://open-meteo.com

---

### NASA FIRMS

Utilizada para consulta dos focos de calor detectados por satélite (VIIRS/MODIS).

https://firms.modaps.eosdis.nasa.gov

---

# Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- Leaflet.js
- OpenStreetMap
- OpenTopoMap
- Esri World Imagery
- Open-Meteo API
- NASA FIRMS API

---

# Recursos

## Progressive Web App (PWA)

A aplicação pode ser instalada em celulares e computadores.

Possui:

- Cache offline
- Service Worker
- Instalação na tela inicial
- Funcionamento parcial sem internet

---

## Atualização automática

Os dados são atualizados automaticamente a cada:

**10 minutos**

Também é possível atualizar manualmente pelo botão **Atualizar**.

---

## Interface Responsiva

Compatível com:

- Desktop
- Tablets
- Smartphones

---

# Estrutura

```
.
├── combatePESB.html
└── README.md
```

Todo o projeto está concentrado em um único arquivo HTML contendo:

- HTML
- CSS
- JavaScript

---

# Como executar

Basta abrir o arquivo:

```
combatePESB.html
```

ou hospedá-lo em qualquer servidor web.

Exemplos:

```
GitHub Pages
Netlify
Vercel
Apache
NGINX
```

---

# Dados Utilizados

Os dados meteorológicos são obtidos em tempo real.

As informações incluem:

- Temperatura
- Umidade
- Vento
- Chuva
- Índice FMA
- Focos de calor

Os dados podem variar conforme disponibilidade das APIs utilizadas.

---

# Objetivo

Fornecer uma ferramenta de apoio para:

- Brigadas de incêndio
- Gestores ambientais
- Defesa Civil
- Corpo de Bombeiros
- ICMBio
- IEF-MG
- Equipes de monitoramento ambiental

auxiliando na tomada de decisão durante operações de prevenção e combate a incêndios florestais.

---

# Licença

Este projeto é disponibilizado para fins educacionais, de pesquisa e apoio ao monitoramento ambiental.

Verifique as políticas de uso das APIs utilizadas antes de redistribuir os dados.

---

## Autor
