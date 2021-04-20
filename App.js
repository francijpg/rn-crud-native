import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import Home from './views/Home';
import NewClient from './views/NewClient';
import ClientDetail from './views/ClientDetail';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF',
  },
};

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.surface,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="NewClient"
            component={NewClient}
            options={{
              title: 'New Client',
            }}
          />
          <Stack.Screen
            name="ClientDetail"
            component={ClientDetail}
            options={{
              title: 'Client Details',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
