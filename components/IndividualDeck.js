import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  StyleSheet,
  View
} from 'react-native';
import Button from './Button';
import { blue, white, grey } from '../utils/colors';

class IndividualDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title,
    }
  }

  render () {
    const { deckId, decks } = this.props;
    const deck = decks[deckId];
    const cardsNumber = deck.questions ? deck.questions.length : 0;

    return (
      <View style={{flex: 1}}>
        <View style={[styles.center, {flex: 2}]}>
          <Text style={styles.deckTitle}>{deck.title}</Text>
          <Text style={styles.deckCardsNumber}>{`${cardsNumber} card${cardsNumber !== 1 ? 's' : ''}`}</Text>
        </View>
        <View style={[styles.center, {flex: 3}]}>
          <Button
            onPress={() => this.props.navigation.navigate(
              'AddCard',
              { deckId: deckId }
            )}
            style={{backgroundColor: white, borderColor: blue, borderWidth: 1, color: blue}}
          >Add card</Button>
          <Button
            onPress={() => this.props.navigation.navigate(
              'Quiz',
              { deckId: deckId, title: decks[deckId].title }
            )}
          >Start quiz</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  deckTitle: {
    fontSize: 36,
    color: blue,
    textAlign: 'center',
  },
  deckCardsNumber: {
    fontSize: 24,
    color: grey,
    textAlign: 'center',
  },
});

const mapStateToProps = ({ decks }, { navigation }) => {
  const { deckId } = navigation.state.params;

  return {
    deckId,
    decks,
  }
};

export default connect(mapStateToProps)(IndividualDeck);
