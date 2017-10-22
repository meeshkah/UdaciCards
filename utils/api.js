import { AsyncStorage } from 'react-native';
import uuidv4 from 'uuid/v4';

const DECKS_STORAGE_KEY = 'UdaciCards:decks';

export const submitDeck = ({ deck }) => {
  const key = uuidv4();

  return AsyncStorage
    .mergeItem(
      DECKS_STORAGE_KEY, 
      JSON.stringify({
        [key]: deck,
      })
    )
    .then((data) => console.log(data));
}
