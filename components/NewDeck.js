import React, { Component } from 'react';
import { 
  Text, 
  TextInput, 
  KeyboardAvoidingView, 
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import Button from './Button';
import { blue, white, grey } from '../utils/colors';

class NewDeck extends Component {
  state = {
    title: 'New Deck',
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.center}>
        <View>
          <Text style={styles.heading}>What is the title of your new deck?</Text>
          <TextInput
            style={styles.input}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
          />
          <Button onPress={() => console.log('Pressed')}>Submit</Button>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 36,
    color: blue,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: grey,
    padding: 5,
    height: 50,
    fontSize: 28,
    backgroundColor: white,
    color: blue,
    marginTop: 18,
  }
});

export default NewDeck;