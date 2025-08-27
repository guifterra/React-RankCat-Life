import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Menu() {
  return (
    <View style={styles.container}>
        <Text style={{color: 'white'}}>Btn</Text>
        <Text style={{color: 'white'}}>RankCat Life</Text>
        <Text style={{color: 'white'}}>Search</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    paddingTop: 30,
    paddingHorizontal: 30,
    backgroundColor: 'rgb(19, 18, 24)',
    position: 'absolute',
    top: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
