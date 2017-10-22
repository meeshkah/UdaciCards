import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList } from 'react-native';
import Deck from './Deck';

class Decks extends Component {
  _keyExtractor = (item) => item;

  _renderDeck = ({ item }) => {
    const { decks } = this.props;

    return (
      <Deck title={decks[item].title} questions={decks[item].questions} />
    );
  }

  render() {
    const { decksIds, decks } = this.props;

    return (
      <View style={{flex: 1}}>
        <FlatList 
          data={decksIds}
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

export default connect(mapStateToProps)(Decks);
