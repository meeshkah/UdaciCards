import { AsyncStorage } from 'react-native';
import uuidv4 from 'uuid/v4';

const DECKS_STORAGE_KEY = 'UdaciCards:decks';

export const getDecks = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((data) => JSON.parse(data));
}

export const getDeck = () => {}

export const saveDeckTitle = (title) => {
  const key = uuidv4();
  const deck = {
    [key]: {
      title,
    },
  };

  return AsyncStorage
    .mergeItem(
      DECKS_STORAGE_KEY, 
      JSON.stringify(deck)
    )
    .then(() => deck);
}

export const addCardToDeck = () => {}
