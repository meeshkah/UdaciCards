import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import Deck from './Deck';

const decksIds = [
  'React',
  'JavaScript',
  'JavaScript2',
  'JavaScript3',
];

const decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  JavaScript2: {
    title: 'JavaScripts',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  JavaScript3: {
    title: 'JavaScripters',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};

const keyExtractor = (item) => item;

const renderDeck = ({ item }) => (
  <Deck title={decks[item].title} questions={decks[item].questions} />
);

class Decks extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList 
          data={decksIds}
          renderItem={renderDeck}
          keyExtractor={keyExtractor}
        />
      </View>
    )
  }
}

export default Decks;
