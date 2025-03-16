// App.js
import React from 'react';
import { View } from 'react-native';
import MainNavigator from '../nav/MainNavigator';
import {
  useFonts,
  GFSDidot_400Regular
} from "@expo-google-fonts/gfs-didot";

export default function App() {
  let [fontsLoaded] = useFonts({
    GFSDidot_400Regular,
  });
  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return <MainNavigator />;
  }
}
