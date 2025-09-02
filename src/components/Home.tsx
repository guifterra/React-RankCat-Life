import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Menu from './Menu';
import Footer from './Footer';
import Exploration from './Exploration';
import Teste from './ItensPesquisados';

export default function Home() {
  const [showTeste, setShowTeste] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [inputActive, setInputActive] = useState(false); 

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Menu
        setShowTeste={setShowTeste}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        inputActive={inputActive}
        setInputActive={setInputActive}
      />
      {showTeste ? <Teste query={searchQuery} /> : <Exploration />}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
