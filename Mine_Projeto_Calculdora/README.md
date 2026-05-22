<div align="center">

# 🧮 Calculadora Minimalista

**Uma calculadora web elegante, responsiva e acessível — feita do zero com HTML, CSS e JavaScript puro.**

[![Acesse o projeto](https://img.shields.io/badge/🌐%20Acesse%20o%20Projeto-Live%20Demo-e8e0d0?style=for-the-badge)](https://mkl0pes.github.io/Mine_Projeto_Calculdora/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

<br/>

![Preview da Calculadora](https://img.shields.io/badge/Dark%20Theme-Minimalista-1a1a1a?style=flat-square&color=1a1a1a&labelColor=e8e0d0)

</div>

---

## ✨ Sobre o Projeto

Este projeto é uma calculadora web desenvolvida com foco em **design minimalista**, **experiência do usuário** e **boas práticas de desenvolvimento front-end**. Toda a lógica foi construída sem o uso de nenhuma biblioteca ou framework externo — apenas HTML, CSS e JavaScript puro.

O visual foi cuidadosamente pensado com uma paleta de cores escuras e tons bege quentes, tipografia monospace elegante (`DM Mono`) e micro-interações que tornam o uso agradável tanto no desktop quanto no mobile.

---

## 🚀 Funcionalidades

- ✅ **Operações básicas** — Adição, subtração, multiplicação e divisão
- ✅ **Porcentagem** — Cálculo com o operador `%`
- ✅ **Encadeamento de operações** — `2 + 3 × 4` calcula em sequência sem precisar de parênteses
- ✅ **Inversão de sinal** — Botão `+/−` para alternar entre positivo e negativo
- ✅ **Backspace inteligente** — Apaga o último dígito digitado
- ✅ **Histórico no display** — Mostra a expressão anterior enquanto você digita o próximo número
- ✅ **Suporte ao teclado físico** — Use os números, operadores, `Enter`, `Backspace` e `Esc` do seu teclado
- ✅ **Efeito ripple** — Feedback visual animado ao clicar em qualquer botão
- ✅ **Responsivo** — Adapta-se perfeitamente a telas pequenas (mobile-first)
- ✅ **Acessibilidade** — Atributos `aria-label`, `role` e `aria-live` para leitores de tela
- ✅ **Proteção contra erros** — Divisão por zero exibe `Erro` sem quebrar a aplicação

---

## 🗂️ Estrutura do Projeto

```
Mine_Projeto_Calculdora/
│
├── index.html     # Estrutura semântica da calculadora
├── style.css      # Estilização completa com CSS Custom Properties
└── script.js      # Lógica da calculadora sem dependências externas
```

---

## 🧠 Como Funciona

### 🖥️ Interface (`index.html`)

O HTML é estruturado em dois blocos principais:

- **Display** — Dividido em duas linhas: a linha principal (`#expression`) exibe o número atual, e a linha de histórico (`#history`) mostra a operação anterior enquanto o usuário digita o próximo valor.
- **Teclado (`keypad`)** — Grade 4×5 com botões que utilizam `data-action` e `data-value` para comunicação com o JavaScript, sem precisar de IDs individuais.

### 🎨 Estilização (`style.css`)

Todo o sistema visual é controlado por **CSS Custom Properties** definidas no `:root`, o que permite alterar o tema inteiro mudando apenas um arquivo:

```css
:root {
  --bg:         #0f0f0f;   /* fundo da página */
  --surface:    #1a1a1a;   /* corpo da calculadora */
  --accent:     #e8e0d0;   /* destaque bege quente */
  --equal-bg:   #e8e0d0;   /* botão igual */
  --action-fg:  #e05c5c;   /* vermelho suave para C e ← */
}
```

A calculadora possui animação de entrada (`slideUp`), efeito `ripple` nos botões, e usa `clamp()` para que o tamanho da fonte do display seja fluido e nunca transborde.

### ⚙️ Lógica (`script.js`)

A lógica foi construída em torno de um **estado interno simples** com quatro variáveis:

| Variável | Função |
|---|---|
| `currentInput` | O número sendo digitado no momento |
| `storedValue` | O primeiro operando de uma operação |
| `storedOperator` | O operador escolhido (`+`, `−`, `×`, `÷`) |
| `justCalculated` | Flag que indica se `=` foi pressionado |

O dispatcher de eventos usa **Event Delegation** — um único `addEventListener` no `.keypad` captura todos os cliques e redireciona para a função correta (`handleDigit`, `inputOperator`, `handleEquals`, etc.). Isso é mais eficiente do que adicionar listeners individuais em cada botão.

O suporte ao teclado é tratado separadamente por um `keydown` global no `document`, com um mapa de teclas físicas para ações da calculadora.

---

## ⌨️ Atalhos de Teclado

| Tecla | Ação |
|---|---|
| `0` – `9` | Inserir dígito |
| `.` ou `,` | Inserir decimal |
| `+` `-` `*` `/` | Operadores |
| `%` | Porcentagem |
| `Enter` ou `=` | Calcular resultado |
| `Backspace` | Apagar último dígito |
| `Esc` | Limpar tudo (C) |

---

## 🛠️ Como Rodar Localmente

Não há instalação necessária. Basta clonar e abrir:

```bash
git clone https://github.com/mkl0pes/Mine_Projeto_Calculdora.git
cd Mine_Projeto_Calculdora
```

Depois, abra o arquivo `index.html` diretamente no seu navegador — ou use a extensão **Live Server** do VS Code para uma experiência melhor durante o desenvolvimento.

---

## 🌐 Deploy

O projeto está publicado via **GitHub Pages** e pode ser acessado diretamente pelo link:

🔗 **[https://mkl0pes.github.io/Mine_Projeto_Calculdora/](https://mkl0pes.github.io/Mine_Projeto_Calculdora/)**

---

## 👨‍💻 Autor

<div align="center">

**Mayck Gabriel Lopes dos Santos**
Fundador & Desenvolvedor

[![GitHub](https://img.shields.io/badge/GitHub-mkl0pes-181717?style=for-the-badge&logo=github)](https://github.com/mkl0pes)

</div>

---

<div align="center">

Feito com 🖤 e muito CSS por **Mayck Gabriel Lopes dos Santos**

</div>
