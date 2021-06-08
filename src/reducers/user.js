// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = { email: '' };

export default function user(state = initialState, action) {
  switch (action.type) {
  case '':
    return state;
  default:
    return state;
  }
}
