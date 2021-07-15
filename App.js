import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootAppStack from './pages/app/RootAppStack';
const App = () => {
  return (
    <NavigationContainer>
      <RootAppStack />
    </NavigationContainer>
  );
};

export default App;
