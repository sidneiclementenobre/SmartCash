/**
 * SmartCash - Core Application Logic
 * Desenvolvido seguindo princípios de Clean Code, DRY e responsabilidade única.
 */

// --- Estado Global do Aplicativo ---
// Recupera do LocalStorage ou inicializa um array vazio se não houver dados
let transactions = JSON.parse(localStorage.getItem('smartcash:transactions')) || [];

// --- Elementos do DOM Mapeados ---
const transactionForm = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const transactionList = document.getElementById('transaction-list');
const emptyState = document.getElementById('empty-state');

const incomeDisplay = document.getElementById('income-display');
const expenseDisplay = document.getElementById('expense-display');
const balanceDisplay = document.getElementById('balance-display');
const totalCard = document.getElementById('total-card');
const totalIcon = document.getElementById('total-icon');

// --- Funções de Negócio / Lógica Financeira ---

/**
 * Calcula e atualiza os cards de resumo de entradas, saídas e saldo líquido.
 * Previne bugs de ponto flutuante matemáticos arredondando em duas casas decimais.
 */
function updateSummaryValues() {
    // Calcula o total de entradas utilizando o método .reduce()
    const incomeTotal = transactions
        .filter(transaction => transaction.amount > 0)
        .reduce((accumulator, transaction) => accumulator + transaction.amount, 0);

    // Calcula o total de saídas (multiplicado por -1 para isolar o valor absoluto gasto)
    const expenseTotal = transactions
        .filter(transaction => transaction.amount < 0)
        .reduce((accumulator, transaction) => accumulator + transaction.amount, 0);

    // Saldo líquido final
    const balanceTotal = incomeTotal + expenseTotal;

    // Formatação monetária BRL independente
    incomeDisplay.textContent = formatToCurrency(incomeTotal);
    expenseDisplay.textContent = formatToCurrency(Math.abs(expenseTotal));
    balanceDisplay.textContent = formatToCurrency(balanceTotal);

    // Atualização dinâmica de feedbacks visuais baseada no estado do saldo
    updateBalanceCardUI(balanceTotal);
}

/**
 * Atualiza classes CSS e ícones de acordo com o saldo final.
 * @param {number} total 
 */
function updateBalanceCardUI(total) {
    totalCard.classList.remove('balance-positive', 'balance-negative');
    
    if (total > 0) {
        totalCard.classList.add('balance-positive');
        totalIcon.textContent = '▲';
    } else if (total < 0) {
        totalCard.classList.add('balance-negative');
        totalIcon.textContent = '▼';
    } else {
        totalIcon.textContent = '💰';
    }
}

/**
 * Formata valores numéricos para strings de moeda corrente brasileira (BRL).
 * @param {number} value 
 * @returns {string}
 */
function formatToCurrency(value) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// --- Funções de Manipulação do DOM (Interface) ---

/**
 * Renderiza todas as transações na lista do extrato.
 */
function renderTransactions() {
    // Limpa a renderização anterior para evitar renderizações redundantes ou duplicadas
    transactionList.innerHTML = '';

    if (transactions.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    // Cria elementos HTML de forma isolada cronologicamente
    transactions.forEach(transaction => {
        const isIncome = transaction.amount > 0;
        const listItem = document.createElement('li');
        
        listItem.classList.add('transaction-item', isIncome ? 'income' : 'expense');
        
        listItem.innerHTML = `
            <div class="info">
                <span class="description">${transaction.description}</span>
                <span class="amount">${isIncome ? '' : '- '}${formatToCurrency(Math.abs(transaction.amount))}</span>
            </div>
            <button class="btn-delete" title="Excluir Transação" onclick="deleteTransaction('${transaction.id}')">
                &times;
            </button>
        `;
        
        transactionList.appendChild(listItem);
    });
}

// --- Fluxo de Operações CRUD & Persistência ---

/**
 * Salva a matriz de dados atualizada no LocalStorage convertendo em string JSON.
 */
function updateLocalStorage() {
    localStorage.setItem('smartcash:transactions', JSON.stringify(transactions));
}

/**
 * Adiciona uma nova transação a partir dos dados limpos do formulário.
 * @param {Event} event 
 */
function handleFormSubmit(event) {
    event.preventDefault();

    const descriptionText = descriptionInput.value.trim();
    // Conversão explícita de string para tipo Number nativo
    const amountValue = parseFloat(amountInput.value);

    // Validação rígida de campos nulos, vazios ou não numéricos
    if (!descriptionText || isNaN(amountValue) || amountValue === 0) {
        alert('Por favor, preencha todos os campos com valores válidos e diferentes de zero.');
        return;
    }

    // Criação do objeto estruturado com ID único em String
    const newTransaction = {
        id: String(Date.now()),
        description: descriptionText,
        amount: amountValue
    };

    // Atualização de estados
    transactions.push(newTransaction);
    
    // Sincronização geral
    updateAppView();
    
    // Limpeza amigável do formulário
    transactionForm.reset();
    descriptionInput.focus();
}

/**
 * Remove uma transação específica mapeada por ID único.
 * @param {string} id 
 */
function deleteTransaction(id) {
    // Filtra o array removendo o item correspondente ao ID visualizado
    transactions = transactions.filter(transaction => transaction.id !== id);
    
    // Sincronização geral
    updateAppView();
}

/**
 * Orquestrador central que executa todas as atualizações de interface e memória.
 */
function updateAppView() {
    updateLocalStorage();
    renderTransactions();
    updateSummaryValues();
}

// --- Inicialização do Aplicativo ---
transactionForm.addEventListener('submit', handleFormSubmit);

// Executa a carga inicial de dados recuperados do LocalStorage
updateSummaryValues();
renderTransactions();
