import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import Button from './Button';
import { blue, white, grey } from '../utils/colors';
import { saveCard } from '../actions';

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title,
    }
  }

  state = {
    question: 'Enter question',
    answer: 'Enter answer',
  }

  submitCard() {
    const { deckId, saveCard } = this.props;
    const { question, answer } = this.state;

    if (question === 'Enter question' || answer === 'Enter answer') {
      this.refs.cardQuestion.blur();
      this.refs.cardAnswer.blur();
      return;
    }

    if (answer === '') {
      this.setState((prevState) => ({
        answer: 'Enter answer',
      }));
      this.refs.cardAnswer.blur();
      return;
    }

    saveCard({
      deckId,
      question,
      answer,
    });
    this.setState({question: 'Enter question', answer: 'Enter answer'});
    this.refs.cardQuestion.blur();
    this.refs.cardAnswer.blur();
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.center}>
        <View style={styles.center}>
          <Text style={styles.deckTitle}>Add card</Text>
          <TextInput
            ref='cardQuestion'
            style={styles.input}
            onBlur={() => {
              if (this.state.question === '') {
                this.setState({question: 'Enter question'});
              }
            }}
            onChangeText={(question) => this.setState({question})}
            onFocus={() => this.setState((prevState) => ({question: prevState.question !== 'Enter question' ? prevState.question : '' }))}
            value={this.state.question}
            onSubmitEditing={() => {
              if (this.state.question === '') this.setState({question: 'Enter question'});
              this.refs.cardAnswer.focus();
            }}
          />
          <TextInput
            ref='cardAnswer'
            style={styles.input}
            onBlur={() => {
              if (this.state.answer === '') {
                this.setState({answer: 'Enter answer'});
              }
            }}
            onChangeText={(answer) => this.setState({answer})}
            onFocus={() => this.setState((prevState) => ({answer: prevState.answer !== 'Enter answer' ? prevState.answer : '' }))}
            value={this.state.answer}
            onSubmitEditing={() => this.submitCard()}
          />
          <Button onPress={() => this.submitCard()}>Submit</Button>
        </View>
      </KeyboardAvoidingView>
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
  input: {
    borderWidth: Platform.OS === 'ios' ? 1 : 0,
    borderRadius: Platform.OS === 'ios' ? 8 : 1,
    borderColor: grey,
    padding: 5,
    height: 50,
    fontSize: 28,
    backgroundColor: Platform.OS === 'ios' ? white : 'transparent',
    color: blue,
    marginTop: 18,
  }
});

const mapStateToProps = ({ decksIds, decks }, { navigation }) => {
  const { deckId } = navigation.state.params;

  return {
    deckId,
    decksIds,
    decks,
  }
};

export default connect(mapStateToProps, {
  saveCard,
})(AddCard);
