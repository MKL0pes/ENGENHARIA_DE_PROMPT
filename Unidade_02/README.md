# Sprint: Automação e Programação Assistida por IA

**Disciplina:** Engenharia de Prompt e Aplicações em IA  
**Unidade:** II — Programação Assistida  
**Data:** 14/04/2026  

---

## 📁 Estrutura do Repositório

```
/
├── organizar_arquivos.py   # Missão 01 — Organização de arquivos por extensão
├── consulta_cep.py         # Missão 02 — Consulta à API pública ViaCEP
├── notificacoes.py         # Missão 03 — Sistema de alertas condicionais
└── README.md               # Este arquivo
```

---

## 🚩 Missão 01 — Automação de Arquivos

**O que faz:** Organiza automaticamente todos os arquivos de uma pasta em subpastas nomeadas pela extensão (`.pdf`, `.jpg`, `.txt`, etc.).

**Como executar:**
```bash
python organizar_arquivos.py
```
> Altere a variável `pasta_alvo` dentro do script para apontar para a pasta desejada.

**Como os prompts ajudaram:**  
Usei o prompt: *"Crie uma função Python que percorra todos os arquivos de uma pasta e os mova para subpastas nomeadas pela extensão. Use os e shutil. Adicione comentários explicando cada etapa."*  
A IA gerou a estrutura base com `os.listdir`, `os.path.splitext` e `shutil.move`. O Ghostwriter sugeriu tratar arquivos sem extensão com um fallback para `'sem_extensao'`, o que eu não teria pensado de imediato.

---

## 🚩 Missão 02 — Consulta Simples a APIs

**O que faz:** Consulta a API pública ViaCEP e exibe o endereço formatado. Trata erros de conexão, CEP inválido e formato incorreto sem quebrar o script.

**Como executar:**
```bash
python consulta_cep.py
```
> Altere o valor de `cep_teste` para qualquer CEP brasileiro.

**Como os prompts ajudaram:**  
Prompt utilizado: *"Faça um script Python que consulte a API ViaCEP com urllib. Valide o CEP antes de chamar a API. Use try/except para tratar erros de conexão e o caso em que a API retorna {'erro': true}."*  
A IA sugeriu usar `dados.get("erro")` para detectar o CEP inexistente — um detalhe importante da documentação da ViaCEP que exige atenção. Também propôs o uso de `timeout=5` para evitar que o script fique travado em conexões lentas.

---

## 🚩 Missão 03 — Sistema de Notificações

**O que faz:** Monitora condições críticas de um sistema (temperatura, CPU e espaço em disco) e dispara alertas no console quando os limites são ultrapassados. O código é modular, com funções separadas para cada responsabilidade.

**Como executar:**
```bash
python notificacoes.py
```

**Como os prompts ajudaram:**  
Prompt utilizado: *"Crie um sistema de monitoramento modular em Python com funções separadas: uma para verificar cada condição (temperatura, CPU, disco) e uma para disparar o alerta. Use datetime para registrar o horário do alerta."*  
A IA gerou a estrutura modular de imediato, separando as funções de verificação da função de alerta. Em seguida, pedi refatoração: *"Refatore para que a função principal chame cada verificação em sequência e registre se houve ou não algum alerta ao final."* O resultado ficou mais limpo e legível que a primeira versão.

---

## 🔍 Reflexão Crítica — Onde a IA brilhou e onde foi preciso intervir

### Onde a IA foi mais útil:
- **Estruturas repetitivas (boilerplate):** a IA gerou rapidamente o esqueleto de cada script, economizando tempo com sintaxe básica.
- **Sugestões de casos extremos:** o tratamento de arquivos sem extensão (Missão 01) e o campo `{"erro": true}` da API (Missão 02) foram sugestões da IA que agregariam valor.
- **Formatação de dados:** a exibição formatada do JSON da ViaCEP foi gerada automaticamente com boa legibilidade.

### Onde a intervenção humana foi crítica:
- **Lógica de negócio:** definir *quais* limites configuram uma condição crítica (ex: 80°C para temperatura, 90% para CPU) exigiu decisão humana — a IA não sabe o contexto do sistema.
- **Tratamento de edge cases:** foi preciso revisar e testar manualmente cada cenário de erro para garantir que o script não quebrava.
- **Decisões arquiteturais:** a escolha de usar `urllib` (nativa) em vez de `requests` (biblioteca externa) foi uma decisão consciente para não exigir instalação de dependências no ambiente de teste.

> **Conclusão:** A IA acelerou a escrita do código, mas o entendimento da lógica, a validação dos resultados e as decisões de arquitetura permaneceram com o desenvolvedor. A ferramenta agiliza a digitação; você define a direção.
