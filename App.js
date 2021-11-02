import React from 'react';
import { useFonts } from 'expo-font';
import Navigation from './app/navigations/navigation'

export default function App() {

  const [ loaded ] = useFonts({
    poppins: require('./assets/fonts/Poppins-Regular.ttf'),
    poppins_semibold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    poppins_bold: require('./assets/fonts/Poppins-Bold.ttf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <Navigation />
  );
}