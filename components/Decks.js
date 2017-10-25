import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Deck from './Deck';
import { fetchDecks } from '../actions';

class Decks extends Component {
  _keyExtractor = (item) => item;

  _renderDeck = ({ item }) => {
    const { decks } = this.props;

    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(
          'IndividualDeck',
          { deckId: item, title: decks[item].title }
        )}
      >
        <Deck title={decks[item].title} questions={decks[item].questions} />
      </TouchableOpacity>
    );
  }

  componentDidMount() {
    this.props.fetchDecks();
  }

  render() {
    const { decksIds, decks } = this.props;

    return (
      <View style={{flex: 1}}>
        <FlatList
          data={decksIds}
          extraData={decks}
          renderItem={this._renderDeck}
          keyExtractor={this._keyExtractor}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ decksIds, decks }) => {
  return {
    decksIds,
    decks,
  }
};

export default connect(mapStateToProps, {
  fetchDecks,
})(Decks);
