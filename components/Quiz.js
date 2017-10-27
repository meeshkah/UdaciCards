import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  StyleSheet,
  View
} from 'react-native';
import QuizCard from './QuizCard';
import Button from './Button';
import { blue, white, grey } from '../utils/colors';
import { startQuiz, submitAnswer, resetQuiz } from '../actions';
import { clearLocalNotification, setLocalNotification } from '../utils/notifications';

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

  finishQuiz = async () => {
    this.props.resetQuiz();
    await clearLocalNotification();
    await setLocalNotification();
    this.props.navigation.navigate(
      'Home',
      {}
    );
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
    const { quiz, deckId, decks, startQuiz, navigation } = this.props;

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
              <Button onPress={() => {
                startQuiz(quiz.deckId);
                navigation.navigate(
                  'Quiz',
                  {
                    deckId: quiz.deckId,
                    title: decks[quiz.deckId].title
                  }
                );
              }}>Carry on</Button>
            </View>
          </View>
        ) : (
          quiz.answers.length < decks[deckId].questions.length ? (
            <QuizCard
              decks={decks}
              deckId={deckId}
              quiz={quiz}
              onCorrect={() => this.submitAnswer(true)}
              onIncorrect={() => this.submitAnswer(false)}
            />
          ) : (
            <View style={{flex: 1}}>
              <View style={[styles.center, {flex: 2}]}>
                <Text style={[styles.deckTitle]}>Your result is {this.calculateResult()}</Text>
              </View>
              <View style={[styles.center, {flex: 3}]}>
                <Button onPress={() => this.finishQuiz()}>Finish quiz</Button>
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
