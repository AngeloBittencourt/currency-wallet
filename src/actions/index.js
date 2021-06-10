// Coloque aqui suas actions
export const login = (email) => ({ type: 'LOGIN', email });
export const addExpense = (expense) => ({ type: 'ADD', expense });
export const updateCurrencies = (currency) => ({ type: 'UPDATE', currency });
export const deleteExpense = (expense) => ({ type: 'DELETE', expense });
export const editExpense = (expense, isEdit) => ({ type: 'EDIT', expense, isEdit });
