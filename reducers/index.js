import { combineReducers } from 'redux';
import { ADD_DECK } from '../actions';

const decks = (state = {}, action) => {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        ...action.payload.deck,
      }
    default:
      return state;
  }
};

const decksIds = (state = [], action) => {
  switch (action.type) {
    case ADD_DECK:
      return [
        ...state,
        ...action.payload.deck.id,
      ];
    default:
      return state;
  }
}

const mainReducer = combineReducers({
  decks,
  decksIds,
});

export default mainReducer;
