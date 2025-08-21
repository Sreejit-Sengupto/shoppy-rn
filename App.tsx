import { StatusBar } from 'expo-status-bar';
import { createStaticNavigation, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { Raleway_400Regular } from '@expo-google-fonts/raleway';
import { Quicksand_400Regular } from '@expo-google-fonts/quicksand';
import './global.css';
import HomeScreen from 'screens/home';
import DetailScreen from 'screens/details';
import QueryContextProvider from 'context/query-store';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerStyle: { backgroundColor: 'black' },
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: '',
      },
    },
    Details: {
      screen: DetailScreen,
      options: {
        title: 'ShoppyAI',
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black',
    text: 'white',
  },
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Quicksand_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <QueryContextProvider>
        <Navigation theme={MyTheme} />
      </QueryContextProvider>
    </>
  );
}
