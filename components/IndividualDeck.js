import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  StyleSheet,
  View
} from 'react-native';
import Button from './Button';
import { center, deckCardsNumber, title } from '../styles';
import { blue, white, grey } from '../utils/colors';

class IndividualDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title,
    }
  }

  render () {
    const { deckId, decks, quiz } = this.props;
    const deck = decks[deckId];
    const cardsNumber = deck.questions ? deck.questions.length : 0;

    return (
      <View style={{flex: 1}}>
        <View style={[styles.center, {flex: 2}]}>
          <Text style={styles.title}>{deck.title}</Text>
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
          {decks[deckId].questions && decks[deckId].questions.length > 0 && (
            <Button
              onPress={() => this.props.navigation.navigate(
                'Quiz',
                { deckId: deckId, title: decks[deckId].title }
              )}
            >{`${quiz.deckId === deckId ? 'Carry on with the' : 'Start the'} quiz`}</Button>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center,
  deckCardsNumber,
  title,
});

const mapStateToProps = ({ decks, quiz }, { navigation }) => {
  const { deckId } = navigation.state.params;

  return {
    deckId,
    decks,
    quiz,
  }
};

export default connect(mapStateToProps)(IndividualDeck);
