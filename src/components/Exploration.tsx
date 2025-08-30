import { ScrollView, StyleSheet, Text } from 'react-native';
import CarrosselFilmes from './CarrosselFilmes';
import CarrosselSeries from './CarrosselSeries';
import CarrosselFilmesDeGenero from './CarrosselFilmesDeGenero';
import CarrosselSeriesDeGenero from './CarrosselSeriesDeGenero';

export default function Exploration() {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <CarrosselFilmes />
      <CarrosselSeries />
      <CarrosselFilmesDeGenero />
      <CarrosselSeriesDeGenero />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'rgb(13, 20, 36)',
    position: 'absolute',
    top: 120,
    bottom: 50,
    padding: 20,
  },
  content: {
    paddingBottom: 40,
  }
});
