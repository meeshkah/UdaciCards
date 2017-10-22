import React from 'react';
import { Text, View, Platform, StyleSheet } from 'react-native';
import { blue, white, grey, shadow } from '../utils/colors';

const Deck = (props) => {
  const { title, questions } = props;
  const cardsNumber = questions.length;

  return (
    <View style={styles.deck}>
      <Text style={styles.deckTitle}>{title}</Text>
      <Text style={styles.deckCardsNumber}>{`${cardsNumber} card${cardsNumber !== 1 ? 's' : ''}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  deck: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    minHeight: 100,
    justifyContent: 'center',
    shadowRadius: 6,
    shadowOpacity: 0.8,
    shadowColor: shadow,
    shadowOffset: {
      width: 0,
      height: 6
    },
  },
  deckTitle: {
    fontSize: 36,
    color: blue,
  },
  deckCardsNumber: {
    fontSize: 24,
    color: grey,
  },
})

export default Deck;
