# 💰 SmartCash: Seu Dashboard Financeiro Inteligente

O **SmartCash** é uma aplicação web interativa de controle financeiro pessoal, desenvolvida como uma Single Page Application (SPA) leve e responsiva. O projeto simula uma necessidade real de mercado para uma startup de educação financeira, permitindo o registro de entradas e saídas, cálculo automático de saldos em tempo real e persistência local de dados, garantindo total privacidade ao usuário.

Este projeto foi construído utilizando estritamente **JavaScript Vanilla**, manipulação dinâmica do DOM e recursos nativos do navegador, sem o uso de frameworks ou bibliotecas externas.

---

## 🚀 Funcionalidades Principais

- **Registro Dinâmico de Transações:** Formulário inteligente para inserção de descrição e valor (valores positivos tratam-se como receitas e negativos como despesas).
- **Painel de Resumo (Cards):** Exibição em tempo real do total de Entradas, Saídas e Saldo Líquido, atualizados instantaneamente a cada interação.
- **Feedback Visual de Status:** Alteração dinâmica de cores e ícones nos cards e no extrato para diferenciar registros positivos e negativos.
- **Extrato Cronológico (CRUD Local):** Listagem organizada das movimentações financeiras com opção de exclusão individual.
- **Persistência com LocalStorage:** Preservação integral dos dados salvos, permitindo que as informações continuem disponíveis mesmo após fechar ou atualizar o navegador.
- **Validação Rígida de Formulário:** Bloqueio de envios com campos vazios, valores zerados ou caracteres não numéricos.
- **Layout 100% Responsivo:** Interface otimizada e testada para dispositivos móveis e desktops, garantindo excelente legibilidade do extrato.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura semântica preparada para acessibilidade e manipulação dinâmica.
- **CSS3:** Estilização moderna baseada em variáveis CSS (Custom Properties), Flexbox e CSS Grid para responsividade nativa, além de microinterações táteis e animações de entrada (`fadeIn`).
- **JavaScript Vanilla (ES6+):** Lógica pura de programação, gerenciamento de eventos (`addEventListener`) e persistência via Web Storage API (`JSON.stringify` / `JSON.parse`).

---

## ⚙️ Engenharia de Código e Boas Práticas

Para atender aos critérios de aceite de nível intermediário/avançado, o desenvolvimento seguiu as seguintes premissas de engenharia:

- **Princípio DRY (Don't Repeat Yourself):** Centralização de renderização e persistência em um orquestrador único (`updateAppView`).
- **Responsabilidade Única:** Cada função executa exclusivamente uma tarefa lógica clara (ex: formatação, cálculo ou manipulação visual).
- **Tipagem Restrita:** Conversão explícita de inputs via `parseFloat()` para mitigar falhas de concatenação involuntária de strings.
- **Prevenção de Bugs de Ponto Flutuante:** Tratamento preciso de arredondamentos monetários nativos do JavaScript na renderização.
- **Métodos de Alta Ordem (Higher-Order Functions):** Uso intensivo de `.filter()` e `.reduce()` para processamento performático dos fluxos de dados agregados.

---

## 📁 Estrutura do Projeto

```text
├── index.html     # Estrutura e marcação semântica da aplicação
├── style.css      # Design, variáveis, responsividade e feedbacks visuais
└── script.js      # Lógica de negócio, manipulação do DOM e LocalStorage
```

---

## 🔧 Como Executar o Projeto

1. Clone este repositório ou faça o download dos arquivos.
2. Certifique-se de que os arquivos `index.html`, `style.css` e `script.js` estejam na mesma pasta.
3. Abra o arquivo `index.html` diretamente em qualquer navegador moderno ou utilize a extensão **Live Server** no VS Code.

---

## 📈 Possibilidades de Expansão (Próximos Passos)

- [ ] Integração com Chart.js para visualização gráfica de despesas por categoria.
- [ ] Filtros avançados de busca por data, mês ou tipo de transação.
- [ ] Sistema de metas de economia mensal com barra de progresso.
- [ ] Exportação do extrato financeiro em formatos CSV ou PDF.
- [ ] Refatoração da persistência local para consumo de API REST externa (`async/await` e `fetch`).
