import * as api from '../utils/api';

export const ADD_DECK = 'ADD_DECK';

const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    deck,
  }
};

export const submitDeck = (deck) => (dispatch) => {
  return api.
    submitDeck(deck).
    then((deck) => dispatch(addDeck(deck)));
}
