# Parecer Individual — Unidade II: Programação Assistida por IA
**Disciplina:** Engenharia de Prompt e Aplicações em IA  
**Instituição:** UDF Centro Universitário  
**Professora:** Kadidja Valéria  
**Ferramenta de IA utilizada no apoio à escrita:** Claude Sonnet (Anthropic) — utilizado para apoiar a organização das ideias, melhorar a coesão textual, revisar a estrutura do parecer e aprimorar a clareza da escrita. As reflexões, os exemplos práticos e os posicionamentos críticos são de autoria própria; o Claude atuou como parceiro de revisão e refinamento.  
**Fontes de pesquisa:** Material didático da disciplina (aulas 06/04, 14/04 e 28/04), referências citadas nos slides (Carraro, 2023; Murta, 2023; Barcaui, 2025; Lee, Goldberg e Kohane, 2024; Córdova, 2025; Mello, 2024)

---

## Introdução

Quando comecei a Unidade II, eu tinha uma ideia vaga do que seria "programação assistida por IA". Imaginava que seria algo próximo de autocompletar código — algo útil, mas não transformador. O que a unidade mostrou, na prática, foi bem diferente disso. Ao longo das aulas e das atividades, fui entendendo que trabalhar com IA no desenvolvimento de software não é apertar um botão e esperar o resultado: é um processo de diálogo constante, onde eu preciso saber o que quero, comunicar isso com clareza e, principalmente, ser capaz de avaliar o que a máquina me entrega.

Este parecer é uma tentativa honesta de sistematizar o que aprendi, o que me surpreendeu e o que ainda me deixou com dúvidas.

---

## O que a Unidade trouxe de novo

A primeira grande virada de chave foi entender a diferença entre **assistentes reativos e agentes autônomos**, apresentada na aula de 14/04. Antes, eu tratava qualquer ferramenta de IA como um assistente reativo — algo que espera minha instrução para agir e entrega uma sugestão pontual. Mas a discussão sobre *agentic coding* mostrou que o campo está evoluindo para algo mais amplo: sistemas que planejam, executam, refatoram e depuram com contexto e coordenação.

Isso mudou a forma como passei a enxergar meu papel. Se a IA começa a assumir responsabilidades maiores, o que sobra para o desenvolvedor? A resposta que a disciplina deu foi precisa: o desenvolvedor deixa de ser quem "digita sintaxe" e passa a ser quem **arquiteta soluções lógicas e seguras** (Síntese da Unidade 2, aula 28/04). Essa distinção fez muito sentido na prática, quando fui trabalhar nas missões.

---

## A prática: o que funcionou e o que não funcionou

### Missão 01 — Automação de Arquivos

O script de organização de arquivos foi o mais tranquilo de construir. Usei prompts descritivos para guiar a IA na geração das funções com `os` e `shutil`, e o resultado foi rápido. O que me chamou atenção foi um detalhe que não estava no meu prompt original: o tratamento de arquivos sem extensão, com fallback para a pasta `'sem_extensao'`. Isso foi uma sugestão gerada automaticamente.

Na primeira vez que rodei o script, ele falhou — o caminho que eu digitei estava errado. Corrigi e funcionou. Esse erro foi meu, não da IA, e isso ilustra bem algo que Barcaui (2025) discute: "a responsabilidade é humana". O código pode estar certo; o contexto em que ele roda depende de quem o opera.

### Missão 02 — Consulta à API ViaCEP

Essa foi a missão que mais me ensinou sobre os limites da colaboração humano-IA. A lógica de consumo da API foi gerada corretamente, incluindo o `try/except` e a verificação do campo `{"erro": true}` retornado pela ViaCEP quando o CEP não existe. Mas o script original não pedia o CEP ao usuário — eu precisava digitar no código. 

Só percebi isso quando tentei usar o programa de verdade. A IA não tinha como saber que eu queria uma experiência interativa; eu não tinha especificado isso no prompt. Murta (2023) fala exatamente sobre isso: "a qualidade do código gerado é diretamente proporcional à qualidade da comunicação." Aprendi isso na prática.

Depois de corrigir o script para usar `input()`, o programa passou a funcionar como eu queria. E o tratamento de erros — CEP inválido, formato errado, conexão falhando — ficou robusto o suficiente para não "quebrar" em nenhum cenário que testei.

### Missão 03 — Sistema de Notificações

A terceira missão foi onde o conceito de **código modular** ficou mais evidente. Usando o GitHub Copilot como referência de estratégia, escrevi os nomes das funções com comentários descrevendo o que cada uma deveria fazer, e deixei a IA sugerir os corpos. O resultado foi uma estrutura com funções separadas por responsabilidade: uma para verificar temperatura, outra para CPU, outra para disco, e uma última para disparar o alerta.

O que eu precisei decidir foi **quais limites configuram uma condição crítica**. A IA não tem como saber se 80°C é crítico para o meu sistema ou não. Essa é exatamente a "lógica de negócio central" que a Matriz de Protagonismo no Código (aula 28/04) identifica como responsabilidade humana. Defini os valores com base no que faz sentido para um sistema genérico de monitoramento, e o script funcionou nos três cenários de teste.

---

## Reflexão sobre o Workflow e a Ética

O que mais ficou gravado da aula de 28/04 foi a frase de Lee, Goldberg e Kohane (2024): o desenvolvedor que aceita e implementa código gerado por IA assume total responsabilidade por esse código. Isso muda completamente a forma como eu devo revisar o que a IA produz. Não é mais opcional — é uma questão legal e ética.

Durante a Unidade II, aprendi que existem pelo menos três níveis de risco no uso de IA para código, como mostrado no gráfico de "Confiança Calibrada" (aula 28/04, Barcaui, 2025): tarefas de estrutura inicial têm alta delegação; funções isoladas com testes exigem atenção moderada; e tudo que envolve autenticação, segurança ou decisões arquiteturais exige supervisão total. Nas três missões práticas, operei no primeiro e segundo nível — o que foi adequado para o contexto da atividade.

Mas fiquei pensando no que aconteceria se eu simplesmente aceitasse o código sem testar. Na Missão 02, o script funcionava sem pedir o CEP ao usuário — e eu só descobri isso quando fui usar o programa de verdade. Se eu tivesse entregue sem testar, teria entregue um código tecnicamente correto, mas inutilizável para o propósito real.

---

## O Loop de Colaboração na Prática

O slide "O Loop de Colaboração Humano-IA" (aula 14/04) descreve quatro etapas: instrução, processamento, revisão e ajuste. Nas minhas atividades, esse ciclo aconteceu, mas de forma menos linear do que o diagrama sugere. Às vezes eu ajustava sem revisar com cuidado; outras vezes eu revisava e descobria que o ajuste anterior tinha introduzido um erro novo.

O que aprendi é que **revisão não é etapa final — é atitude contínua**. Cada mudança no código, por menor que seja, precisa ser testada. E a IA não faz isso por mim.

---

## Considerações Finais

A Unidade II me mostrou que a IA, quando usada bem, é genuinamente útil. Ela acelerou a escrita de código repetitivo, sugeriu tratamentos de erro que eu não teria pensado imediatamente, e me ajudou a estruturar funções de forma mais limpa. Mas ela também falhou quando eu não soube comunicar minha intenção com clareza, e produziu código que parecia certo mas não atendia ao uso real.

Como Carraro (2023) argumenta, a IA amplia as capacidades cognitivas do programador sem substituí-lo — e o que a Unidade II mostrou é que essa ampliação só acontece quando o desenvolvedor tem clareza do problema, domínio suficiente para avaliar a solução e responsabilidade para validar o resultado.

A ferramenta acelera. Mas é o desenvolvedor quem define a direção.

---

## Referências

BARCAUI, A. *Guia de Boas Práticas na Colaboração Humano-IA*. Aula 28/04, Unidade II — Engenharia de Prompt e Aplicações em IA. UDF, 2025.

CARRARO, G. *Programação Assistida por IA: A Nova Era*. Apud: Material didático da disciplina, aula 06/04. UDF, 2023.

CÓRDOVA, R. *Transparência em Sistemas Críticos*. Apud: Material didático da disciplina, aula 28/04. UDF, 2025.

LEE, P.; GOLDBERG, C.; KOHANE, I. *The AI Revolution in Medicine*. Pearson, 2024. Apud: Material didático da disciplina, aula 28/04.

MELLO, F. *Automação e Desenvolvimento de Software com IA*. Apud: Material didático da disciplina, aula 28/04. UDF, 2024.

MURTA, L. *O Diálogo Estruturado no Desenvolvimento Guiado por Comentários*. Apud: Material didático da disciplina, aula 28/04. UDF, 2023.

OLIVEIRA, K. V. *Sprint: Automação e Programação Assistida por IA*. Plano de aula — Aula 14/04, Unidade II. UDF, 2026.

OLIVEIRA, K. V. *Guia de Boas Práticas na Colaboração Humano-IA*. Plano de aula — Aula 28/04, Unidade II. UDF, 2026.
