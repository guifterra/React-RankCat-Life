import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import Home from './src/components/Home';

export default function App() {

  useEffect(() => {
    // Aplica ao montar
    NavigationBar.setBackgroundColorAsync('#000000');
    NavigationBar.setButtonStyleAsync('light');
  }, []);

  useEffect(() => {
    // Aplica novamente após 100ms (forçando a barra inferior)
    const timer = setTimeout(() => {
      NavigationBar.setBackgroundColorAsync('#000000');
      NavigationBar.setButtonStyleAsync('light');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <StatusBar style="light" />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
