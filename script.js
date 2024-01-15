// script.js

async function fetchExpenses() {
    const response = await fetch('/expenses');
    const expenses = await response.json();
  
    const expensesList = document.getElementById('expenses-list');
    expensesList.innerHTML = '';
  
    expenses.forEach((expense) => {
      const div = document.createElement('div');
      div.innerHTML = `<p>${expense.description}: $${expense.amount.toFixed(2)}</p>`;
      expensesList.appendChild(div);
    });
  }
  
  async function addExpense() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
  
    if (!description || isNaN(amount)) {
      alert('Please enter valid description and amount.');
      return;
    }
  
    const response = await fetch('/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description, amount }),
    });
  
    if (response.ok) {
      fetchExpenses();
    } else {
      alert('Failed to add expense.');
    }
  }
  
  document.addEventListener('DOMContentLoaded', fetchExpenses);
  