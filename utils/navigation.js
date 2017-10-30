import React from 'react';
import { Text, View, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { blue, white, shadow } from '../styles/colors';
import Decks from '../components/Decks';
import NewDeck from '../components/NewDeck';
import IndividualDeck from '../components/IndividualDeck';
import AddCard from '../components/AddCard';
import Quiz from '../components/Quiz';

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
  IndividualDeck: {
    screen: IndividualDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }
  }
});

export default MainNavigator;

