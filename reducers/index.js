import { combineReducers } from 'redux';
import {
  ADD_DECK,
  GET_DECKS,
  ADD_CARD,
  RESET_QUIZ,
  START_QUIZ,
  SUBMIT_ANSWER,
} from '../actions';

const decks = (state = {}, action) => {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.payload.decks,
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.payload.deck,
      }
    case ADD_CARD:
      const questions = state[action.payload.deckId].questions || [];

      return {
        ...state,
        [action.payload.deckId]: {
          ...state[action.payload.deckId],
          questions: [
            ...questions,
            action.payload.card,
          ],
        }
      }
    default:
      return state;
  }
};

const decksIds = (state = [], action) => {
  switch (action.type) {
    case GET_DECKS:
      const fetchedDecks = Object.keys(action.payload.decks);

      return [
        ...state,
        ...fetchedDecks,
      ]
    case ADD_DECK:
      return [
        ...state,
        Object.keys(action.payload.deck)[0],
      ];
    default:
      return state;
  }
};

const quiz = (state = {
  deckId: null,
  currentCard: 0,
  answers: [],
}, action) => {
  switch (action.type) {
    case RESET_QUIZ:
      return {
        deckId: action.payload.deckId,
        currentCard: 0,
        answers: [],
      }
    case START_QUIZ:
      return {
        ...state,
        deckId: action.payload.deckId,
      }
    case SUBMIT_ANSWER:
      return {
        ...state,
        currentCard: state.currentCard += 1,
        answers: [
          ...state.answers,
          action.payload.isCorrect,
        ],
      }
    default:
      return state;
  }
};

const mainReducer = combineReducers({
  decks,
  decksIds,
  quiz,
});

export default mainReducer;
