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
    .then((data) => {
      const decks = data || {};
      dispatch(getDecks(decks))
    });
};

export const ADD_CARD = 'ADD_CARD';

const addCard = (deckId, card) => {
  return {
    type: ADD_CARD,
    payload: {
      deckId,
      card,
    },
  }
}

export const saveCard = ({deckId, question, answer}) => (dispatch) => {
  return api
    .addCardToDeck({deckId, question, answer})
    .then((deck) => dispatch(addCard(deckId, {question, answer})));
}

export const RESET_QUIZ = 'RESET_QUIZ';

export const resetQuiz = (deckId = null) => {
  return {
    type: RESET_QUIZ,
    payload: {
      deckId,
    },
  }
}

export const START_QUIZ = 'START_QUIZ';

export const startQuiz = (deckId) => {
  return {
    type: START_QUIZ,
    payload: {
      deckId,
    },
  }
}

export const SUBMIT_ANSWER = 'SUBMIT_ANSWER';

export const submitAnswer = ({deckId, isCorrect}) => {
  return {
    type: SUBMIT_ANSWER,
    payload: {
      deckId,
      isCorrect,
    },
  }
}
