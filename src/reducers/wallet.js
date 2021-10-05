// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = { currencies: [], expenses: [], isEdit: false };

export default function wallet(state = initialState, action) {
  switch (action.type) {
  case 'ADD':
    return { ...state, expenses: [...state.expenses, action.expense] };
  case 'DELETE':
    return { ...state, expenses: action.expense };
  case 'UPDATE':
    return { ...state, currencies: action.currency };
  case 'EDIT':
    return { ...state, isEdit: action.isEdit, expense: action.expense };
  case 'SET_EXPENSES':
    return { ...state, expenses: action.expenses };
  default:
    return state;
  }
}
