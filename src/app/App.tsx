import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import AppManager from './AppManager';
import { store } from '../store';
import '../config/i18n';
import SplashScreen from 'react-native-splash-screen';

function App(): JSX.Element {
  
  return (
    <Provider store={store}>
      <AppManager />
    </Provider>
  );
}

export default App;
