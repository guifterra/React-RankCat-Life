import { ScrollView, StyleSheet, Text } from 'react-native';

import CarrosselFilmes from './CarrosselFilmes';
import CarrosselSeries from './CarrosselSeries';

import CarrosselFilmesAcao from './CarrosselFilmesAcao';
import CarrosselFilmeAnimacao from './CarrosselFilmesAnimacao';
import CarrosselFilmesComedia from './CarrosselFilmesComedia';
import CarrosselFilmesTerror from './CarrosselFilmesTerror';

import CarrosselSeriesAcao from './CarrosselSeriesAcao';
import CarrosselSeriesDocumentario from './CarrosselSeriesDocumentario';
import CarrosselSeriesKids from './CarrosselSeriesKids';
import CarrosselSeriesMisterio from './CarrosselSeriesMisterio';

export default function Exploration() {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <CarrosselFilmes />
      <CarrosselSeries />

      <CarrosselFilmesAcao />
      <CarrosselFilmeAnimacao />
      <CarrosselFilmesComedia />
      <CarrosselFilmesTerror />

      <CarrosselSeriesAcao />
      <CarrosselSeriesDocumentario />
      <CarrosselSeriesKids />
      <CarrosselSeriesMisterio />
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
