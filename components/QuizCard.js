import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View
} from 'react-native';
import Button from './Button';
import { blue, white, grey } from '../utils/colors';

class QuizCard extends Component {
  state = {
    show: 'question',
  }

  render() {
    const { deckId, decks, quiz, onCorrect, onIncorrect } = this.props;

    return (
      <View style={{flex: 1}}>
        <View style={[styles.center, {flex: 2}]}>
          <Text style={styles.deckCardsNumber}>{`${quiz.currentCard + 1} / ${decks[deckId].questions.length}`}</Text>
          <Text style={[styles.deckTitle]}>
            {this.state.show === 'question' ?
              decks[deckId].questions[quiz.currentCard].question :
              decks[deckId].questions[quiz.currentCard].answer
            }
          </Text>
          <Button
            onPress={() => this.setState((prevState) => ({show: prevState.show === 'question' ? 'answer' : 'question'}))}
            style={{backgroundColor: white, borderColor: blue, borderWidth: 1, color: blue}}
          >Show {this.state === 'question' ? 'answer' : 'question'}</Button>
        </View>
        <View style={[styles.center, {flex: 3}]}>
          <Button onPress={() => onCorrect()}>Correct</Button>
          <Button
            onPress={() => onIncorrect()}
            style={{backgroundColor: white, borderColor: blue, borderWidth: 1, color: blue}}
          >Incorrect</Button>
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

export default QuizCard;
