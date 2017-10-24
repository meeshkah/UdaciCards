import { combineReducers } from 'redux';
import { 
  ADD_DECK,
  GET_DECKS,
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
}

const mainReducer = combineReducers({
  decks,
  decksIds,
});

export default mainReducer;
