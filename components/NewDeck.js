import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import Button from './Button';
import { center, input, title } from '../styles';
import { saveDeckTitle } from '../actions/decksActions';

class NewDeck extends Component {
  state = {
    title: 'New Deck',
  }

  submitDeckTitle = async () => {
    const { saveDeckTitle } = this.props;

    if (this.state.title === '') {
      this.setState({title: 'New Deck'});
      this.refs.decksInput.blur();
      return;
    }

    const newDeckId = await saveDeckTitle(this.state.title);
    this.setState({title: 'New Deck'});
    this.props.navigation.navigate('IndividualDeck', {
      deckId: newDeckId,
    });
  }

  render() {

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.center}>
        <View>
          <Text style={styles.title}>What is the title of your new deck?</Text>
          <TextInput
            ref='decksInput'
            style={styles.input}
            onFocus={() => this.setState((prevState) => ({title: prevState.title !== 'New Deck' ? prevState.title : '' }))}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
            onSubmitEditing={() => this.submitDeckTitle()}
          />
          <Button onPress={() => this.submitDeckTitle()}>Submit</Button>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  center,
  input,
  title,
});

const mapStateToProps = ({ decksIds, decks }) => {
  return {
    decksIds,
    decks,
  }
};

export default connect(mapStateToProps, {
  saveDeckTitle,
})(NewDeck);
