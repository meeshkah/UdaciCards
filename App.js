import React, { Component } from 'react';
import { Text, View, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import Decks from './components/Decks';
import NewDeck from './components/NewDeck';
import { blue, white, shadow } from './utils/colors';

function DecksStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-albums' size={20} color={tintColor} />,
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-circle' size={20} color={tintColor} />,
      }
    },
  }, 
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? blue : white,
      style: {
        height: 64,
        backgroundColor: Platform.OS === 'ios' ? white : blue,
        shadowColor: shadow,
        shadowOffset: {
          width: 0,
          height: 6
        },
        shadowRadius: 10,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
});

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <DecksStatusBar backgroundColor={blue} barStyle="light-content" />
        <MainNavigator />
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
