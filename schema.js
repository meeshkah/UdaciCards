import { normalize, schema } from 'normalizr';

const question = new schema.Entity('question');

const deck = new schema.Entity('decks', { 
  questions: [question],
});

export const decksSchema = {
  decks: [ deck ],
};
