/* =========================================================
   CALCULADORA — script.js
   Lógica completa da calculadora, sem bibliotecas externas.
   ========================================================= */

// ── 1. REFERÊNCIAS AOS ELEMENTOS DO HTML ─────────────────
// Pegamos os elementos que precisamos manipular via JS.
const expressionEl = document.getElementById('expression'); // linha principal do display
const historyEl    = document.getElementById('history');    // linha de histórico (menor)

// ── 2. ESTADO INTERNO ────────────────────────────────────
// Estas variáveis guardam "o que está acontecendo agora".
let currentInput  = '0';    // o que aparece na linha principal
let storedValue   = null;   // o primeiro número de uma operação (ex: "8 +")
let storedOperator= null;   // o operador armazenado (+, −, ×, ÷)
let justCalculated = false; // flag: acabamos de pressionar "="?

// ── 3. ATUALIZAR O DISPLAY ────────────────────────────────
/**
 * Redesenha os dois textos do display.
 * Chamamos essa função sempre que algo muda.
 */
function updateDisplay() {
  // Formatamos o número para não ficar gigantesco
  expressionEl.textContent = formatDisplay(currentInput);

  // Se temos operador armazenado, mostramos acima como "8 +"
  if (storedValue !== null && storedOperator !== null) {
    historyEl.textContent = `${formatDisplay(storedValue)} ${storedOperator}`;
  } else {
    historyEl.textContent = '';
  }
}

/**
 * Formata o número exibido:
 * - Se tiver muitos dígitos, usa notação exponencial.
 * - Limita casas decimais para não transbordar o display.
 */
function formatDisplay(value) {
  if (value === null || value === undefined) return '0';

  const str = String(value);

  // Se ainda é um número em edição (termina em ponto ou tem zeros após ponto),
  // exibimos como string simples para não perder o ponto.
  if (str.endsWith('.') || /\.\d*0$/.test(str)) return str;

  const num = parseFloat(str);
  if (isNaN(num)) return 'Erro';

  // Números muito grandes ou pequenos → notação científica
  if (Math.abs(num) >= 1e12 || (Math.abs(num) < 1e-6 && num !== 0)) {
    return num.toExponential(4);
  }

  // Limita a 10 casas decimais (remove zeros à direita)
  const formatted = parseFloat(num.toFixed(10)).toString();
  return formatted;
}

// ── 4. LÓGICA DOS BOTÕES ──────────────────────────────────

/**
 * Adiciona um dígito (0–9) ou o ponto decimal ao input atual.
 */
function inputDigit(digit) {
  // Se acabamos de calcular e o usuário digita um número,
  // começamos uma nova expressão do zero.
  if (justCalculated) {
    currentInput = digit === '.' ? '0.' : digit;
    storedValue  = null;
    storedOperator = null;
    justCalculated = false;
    updateDisplay();
    return;
  }

  // Impede dois pontos no mesmo número
  if (digit === '.' && currentInput.includes('.')) return;

  // Substitui o zero inicial, mas mantém "0."
  if (currentInput === '0' && digit !== '.') {
    currentInput = digit;
  } else {
    // Limita a 12 caracteres para não transbordar o display
    if (currentInput.replace('.', '').replace('-', '').length >= 12) return;
    currentInput += digit;
  }

  updateDisplay();
}

/**
 * Armazena o operador escolhido e prepara para o próximo número.
 * Se já havia um operador pendente, calcula primeiro (encadeamento).
 */
function inputOperator(op) {
  justCalculated = false;

  const current = parseFloat(currentInput);

  // Se já temos um valor anterior E um operador,
  // calculamos antes de guardar o novo operador (ex: 2 + 3 × → calcula 2+3=5 primeiro)
  if (storedValue !== null && storedOperator !== null) {
    const result = calculate(storedValue, current, storedOperator);
    currentInput = String(result);
    storedValue  = result;
  } else {
    storedValue = current;
  }

  storedOperator = op;
  // Sinalizamos que o próximo dígito começa um novo número
  // (fazemos isso deixando currentInput como está mas marcando uma flag)
  // Na próxima digitação, o inputDigit vai sobrescrever currentInput.
  justCalculated = false; // vamos usar outra flag
  _waitingNextOperand = true;

  updateDisplay();
}

// Flag auxiliar: estamos esperando o próximo operando?
let _waitingNextOperand = false;

// Sobrescrevemos inputDigit para considerar _waitingNextOperand
const _originalInputDigit = inputDigit;
(function overrideInputDigit() {
  // Reescrevemos a função diretamente abaixo, mais limpo:
})();

/**
 * Versão final de inputDigit que integra a flag _waitingNextOperand.
 * (Substituímos a função do início por esta versão completa.)
 */
function handleDigit(digit) {
  if (_waitingNextOperand) {
    // Usuário escolheu operador; agora começa a digitar o 2º número
    currentInput = digit === '.' ? '0.' : digit;
    _waitingNextOperand = false;
    updateDisplay();
    return;
  }

  if (justCalculated) {
    currentInput   = digit === '.' ? '0.' : digit;
    storedValue    = null;
    storedOperator = null;
    justCalculated = false;
    updateDisplay();
    return;
  }

  if (digit === '.' && currentInput.includes('.')) return;

  if (currentInput === '0' && digit !== '.') {
    currentInput = digit;
  } else {
    if (currentInput.replace('.', '').replace('-', '').length >= 12) return;
    currentInput += digit;
  }

  updateDisplay();
}

/**
 * Realiza a conta matemática entre dois números.
 * @param {number} a  - primeiro número
 * @param {number} b  - segundo número
 * @param {string} op - operador
 * @returns {number}
 */
function calculate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (op) {
    case '+': return a + b;
    case '−': return a - b;
    case '×': return a * b;
    case '÷':
      if (b === 0) return 'Erro'; // divisão por zero
      return a / b;
    case '%': return a % b;
    default:  return b;
  }
}

/**
 * Pressionar "=" → calcula o resultado final.
 */
function handleEquals() {
  if (storedOperator === null || storedValue === null) return;

  const current = parseFloat(currentInput);
  const result  = calculate(storedValue, current, storedOperator);

  // Mostramos a conta completa no histórico
  historyEl.textContent =
    `${formatDisplay(storedValue)} ${storedOperator} ${formatDisplay(current)} =`;

  currentInput       = String(result);
  storedValue        = null;
  storedOperator     = null;
  justCalculated     = true;
  _waitingNextOperand = false;

  expressionEl.textContent = formatDisplay(currentInput);
}

/**
 * Botão C → limpa tudo.
 */
function handleClear() {
  currentInput       = '0';
  storedValue        = null;
  storedOperator     = null;
  justCalculated     = false;
  _waitingNextOperand = false;
  updateDisplay();
}

/**
 * Botão ← → apaga o último caractere digitado.
 */
function handleBackspace() {
  if (justCalculated) { handleClear(); return; }

  if (currentInput.length <= 1 || currentInput === '-0') {
    currentInput = '0';
  } else {
    currentInput = currentInput.slice(0, -1);
    // Se só sobrou o sinal negativo, limpa
    if (currentInput === '-') currentInput = '0';
  }

  updateDisplay();
}

/**
 * Botão +/− → inverte o sinal do número atual.
 */
function handleNegate() {
  if (currentInput === '0' || currentInput === 'Erro') return;
  currentInput = currentInput.startsWith('-')
    ? currentInput.slice(1)          // remove o '-'
    : '-' + currentInput;            // adiciona o '-'
  updateDisplay();
}

// ── 5. EFEITO RIPPLE (ondinha de clique) ─────────────────
/**
 * Cria um elemento ".ripple" que expande a partir do ponto de clique.
 * É removido automaticamente ao terminar a animação.
 */
function createRipple(button, event) {
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');

  const rect = button.getBoundingClientRect();
  // Posiciona a ondinha onde o dedo/cursor tocou
  ripple.style.top  = (event.clientY - rect.top)  + 'px';
  ripple.style.left = (event.clientX - rect.left) + 'px';

  button.appendChild(ripple);

  // Remove o elemento após a animação terminar
  ripple.addEventListener('animationend', () => ripple.remove());
}

// ── 6. CAPTURA DE CLIQUES ─────────────────────────────────
/**
 * Em vez de colocar um listener em cada botão,
 * usamos Event Delegation: um único listener no .keypad
 * que verifica qual botão foi clicado.
 * Isso é mais eficiente e limpo.
 */
document.querySelector('.keypad').addEventListener('click', function (e) {
  // Sobe na árvore DOM até encontrar um botão
  const btn = e.target.closest('.btn');
  if (!btn) return;

  // Feedback visual (ondinha)
  createRipple(btn, e);

  const action = btn.dataset.action; // ex: "clear", "backspace", "calculate", "negate"
  const value  = btn.dataset.value;  // ex: "7", "+", ".", "÷"

  // Roteia para a função correta
  if (action === 'clear')     { handleClear();          return; }
  if (action === 'backspace') { handleBackspace();      return; }
  if (action === 'calculate') { handleEquals();         return; }
  if (action === 'negate')    { handleNegate();         return; }

  // É um operador?
  if (['+', '−', '×', '÷', '%'].includes(value)) {
    inputOperator(value);
    return;
  }

  // É um dígito ou ponto decimal
  if (value !== undefined) {
    handleDigit(value);
  }
});

// ── 7. SUPORTE AO TECLADO ─────────────────────────────────
/**
 * Mapeia as teclas físicas do teclado para as ações da calculadora.
 * Permite usar a calculadora sem o mouse.
 */
document.addEventListener('keydown', function (e) {
  const key = e.key;

  if (key >= '0' && key <= '9')         { handleDigit(key);      return; }
  if (key === '.' || key === ',')        { handleDigit('.');      return; }
  if (key === '+')                       { inputOperator('+');    return; }
  if (key === '-')                       { inputOperator('−');    return; }
  if (key === '*')                       { inputOperator('×');    return; }
  if (key === '/')  { e.preventDefault(); inputOperator('÷');    return; }
  if (key === '%')                       { inputOperator('%');    return; }
  if (key === 'Enter' || key === '=')    { handleEquals();        return; }
  if (key === 'Backspace')               { handleBackspace();     return; }
  if (key === 'Escape')                  { handleClear();         return; }

  // Animação visual no botão correspondente ao pressionar uma tecla
  highlightKey(key);
});

/**
 * Destaca visualmente o botão quando uma tecla física é pressionada.
 */
function highlightKey(key) {
  // Mapa: tecla → valor/ação no data-attribute
  const map = {
    'Enter': '[data-action="calculate"]',
    '=':     '[data-action="calculate"]',
    'Escape':'[data-action="clear"]',
    'Backspace':'[data-action="backspace"]',
    '+': '[data-value="+"]',
    '-': '[data-value="−"]',
    '*': '[data-value="×"]',
    '/': '[data-value="÷"]',
  };

  const selector = map[key] || `[data-value="${key}"]`;
  const btn = document.querySelector(selector);
  if (!btn) return;

  btn.classList.add('btn--pressed');
  setTimeout(() => btn.classList.remove('btn--pressed'), 120);
}

// ── 8. INICIALIZAÇÃO ──────────────────────────────────────
// Garante que o display começa correto ao carregar a página.
updateDisplay();
