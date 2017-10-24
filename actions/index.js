import * as api from '../utils/api';
// import { normalize } from 'normalizr';
// import { deckSchema } from '../schema';

export const ADD_DECK = 'ADD_DECK';

const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    payload: {
      deck,
    },
  }
};

export const saveDeckTitle = (title) => (dispatch) => {
  return api
    .saveDeckTitle(title)
    .then((deck) => {
      // console.log(normalize(deck, deckSchema));
      dispatch(addDeck(deck));
    });
};

export const GET_DECKS = 'GET_DECKS';

const getDecks = (decks) => {
  return {
    type: GET_DECKS,
    payload: {
      decks,
    },
  }
}

export const fetchDecks = () => (dispatch) => {
  return api
    .getDecks()
    .then((data) => dispatch(getDecks(data)));
};