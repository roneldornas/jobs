import Expo, { Constants } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Settings, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreens';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen},
      auth: { screen: AuthScreen },
      main: { 
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: StackNavigator({
            review: { screen: ReviewScreen },
            settings: { screen: SettingsScreen }
          })
        }, { tabBarPosition: 'bottom' })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      tabBarPosition: 'bottom',
      lazy: true,

    });

    return (
      <Provider store={ store } >
        <View style={ styles.container } >
          <View style={ Platform.OS === 'android' ? styles.statusBar : {} } />
            <MainNavigator
              tabBarPosition={ 'bottom' }
            />
         </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  statusBar: {
    backgroundColor: "#c2185b",
    height: Constants.statusBarHeight
  }
});
