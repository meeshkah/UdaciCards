import React from 'react';
import { Text, View, Platform, StyleSheet } from 'react-native';
import { deck, deckCardsNumber, title } from '../styles';

const Deck = (props) => {
  const { title, questions } = props;
  const cardsNumber = questions ? questions.length : 0;

  return (
    <View style={styles.deck}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.deckCardsNumber}>{`${cardsNumber} card${cardsNumber !== 1 ? 's' : ''}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  deck,
  deckCardsNumber,
  title,
})

export default Deck;
