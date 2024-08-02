import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigations/app-navigator';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
