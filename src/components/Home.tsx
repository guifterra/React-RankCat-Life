import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Menu from './Menu';
import Footer from './Footer';
import Exploration from './Exploration';

export default function Home() {
  return (
    <View style={styles.container}>
        <Menu />
        <Exploration />
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
