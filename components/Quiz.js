import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  StyleSheet,
  View
} from 'react-native';
import Button from './Button';
import { blue, white, grey } from '../utils/colors';
import { startQuiz, submitAnswer, resetQuiz } from '../actions';

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title: `Quiz on ${title}`,
    }
  }

  state = {
    show: 'question',
  }

  submitAnswer(isCorrect) {
    const { deckId, quiz, submitAnswer } = this.props;

    submitAnswer({deckId, isCorrect});
  }

  calculateResult() {
    const { deckId, decks, quiz } = this.props;
    const correctAnswers = quiz.answers.reduce((acc, val) => val ? acc + 1 : acc);


    return `${correctAnswers > 0 ? Math.floor(correctAnswers / decks[deckId].questions.length * 100) : 0}%`;
  }

  componentDidMount() {
    const { deckId, quiz, startQuiz } = this.props;

    if (!quiz.deckId) {
      startQuiz(deckId);
    }
  }

  render() {
    const { quiz, deckId, decks, startQuiz, resetQuiz } = this.props;

    return (
      <View style={{flex: 1}}>
        {quiz.deckId && quiz.deckId !== deckId ? (
          <View style={{flex: 1}}>
            <View style={[styles.center, {flex: 2}]}>
              <Text style={[styles.deckTitle]}>There is already an ongoing test. Would you like to carry on with it?</Text>
            </View>
            <View style={[styles.center, {flex: 3}]}>
              <Button
                onPress={() => startQuiz(deckId)}
                style={{backgroundColor: white, borderColor: blue, borderWidth: 1, color: blue}}
              >Start new</Button>
              <Button onPress={() => startQuiz(quiz.deckId)}>Carry on</Button>
            </View>
          </View>
        ) : (
          quiz.answers.length < decks[deckId].questions.length ? (
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
                <Button onPress={() => this.submitAnswer(true)}>Correct</Button>
                <Button
                  onPress={() => this.submitAnswer(false)}
                  style={{backgroundColor: white, borderColor: blue, borderWidth: 1, color: blue}}
                >Incorrect</Button>
              </View>
            </View>
          ) : (
            <View style={{flex: 1}}>
              <View style={[styles.center, {flex: 2}]}>
                <Text style={[styles.deckTitle]}>Your result is {this.calculateResult()}</Text>
              </View>
              <View style={[styles.center, {flex: 3}]}>
                <Button onPress={() => {
                  resetQuiz();
                  this.props.navigation.navigate(
                    'Home',
                    {}
                  );
                }}>Reset</Button>
              </View>
            </View>
          )
        )}
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

const mapStateToProps = ({ decks, quiz }, { navigation }) => {
  const { deckId } = navigation.state.params;

  return {
    deckId,
    decks,
    quiz,
  }
};

export default connect(mapStateToProps, {
  startQuiz,
  submitAnswer,
  resetQuiz,
})(Quiz);
