import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Text, View, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import Decks from './components/Decks';
import NewDeck from './components/NewDeck';
import IndividualDeck from './components/IndividualDeck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { blue, white, shadow } from './styles/colors';
import { reducer } from './reducers';
import configureStore from './store';
import { setLocalNotification } from './utils/notifications';

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

const initialState = {
  // decksIds: [
  //   'React',
  //   'JavaScript',
  // ],
  // decks: {
  //   React: {
  //     title: 'React',
  //     questions: [
  //       {
  //         question: 'What is React?',
  //         answer: 'A library for managing user interfaces'
  //       },
  //       {
  //         question: 'Where do you make Ajax requests in React?',
  //         answer: 'The componentDidMount lifecycle event'
  //       }
  //     ]
  //   },
  //   JavaScript: {
  //     title: 'JavaScript',
  //     questions: [
  //       {
  //         question: 'What is a closure?',
  //         answer: 'The combination of a function and the lexical environment within which that function was declared.'
  //       }
  //     ]
  //   },
  // },
};

const store = configureStore(initialState);

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <DecksStatusBar backgroundColor={blue} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
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
