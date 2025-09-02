import React, { useEffect, useState, memo } from 'react';
import { Text, StyleSheet, View, FlatList, Image, ActivityIndicator } from 'react-native';
import { searchMulti } from '../services/moviesService';
import { PesquisaObras } from '../types/PesquisaObras';
import { DadosDaObra } from '../types/DadosDaObra';

interface RenderItemProps {
  item: DadosDaObra;
  onLoadEnd: (id: number) => void;
}

const RenderItem = memo(({ item, onLoadEnd }: RenderItemProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.card}>
      <View style={styles.posterWrapper}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
          style={styles.poster}
          onLoadEnd={() => { setLoading(false); onLoadEnd(item.id); }}
        />
        {loading && (
          <ActivityIndicator size="small" color="#fff" style={StyleSheet.absoluteFill} />
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{item.title || item.name}</Text>
        {item.media_type && <Text style={styles.subtitle}>{item.media_type.toUpperCase()}</Text>}
        {item.release_date && <Text style={styles.subtitle}>{item.release_date}</Text>}
      </View>
    </View>
  );
});

export default function ItensPesquisados({ query }: PesquisaObras) {
  const [results, setResults] = useState<DadosDaObra[]>([]);
  const [loadingMap, setLoadingMap] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      if (!query || query.trim() === '') {
        setResults([]);
        setLoadingMap({});
        return;
      }

      const data = await searchMulti(query);
      setResults(data);
      setLoadingMap({});
    };

    fetchData();
  }, [query]);

  const handleLoadEnd = (id: number) => {
    setLoadingMap(prev => ({ ...prev, [id]: false }));
  };

  return (
    <FlatList
      style={styles.container}
      data={results}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
      ListHeaderComponent={<Text style={styles.header}>Resultados da busca para: {query}</Text>}
      renderItem={({ item }) => <RenderItem item={item} onLoadEnd={handleLoadEnd} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={10}
      removeClippedSubviews={true}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'rgb(13, 20, 36)',
    position: 'absolute',
    top: 120,
    bottom: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 12,
    color: 'white',
    marginBottom: 15,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 0,
    alignItems: 'flex-start',
  },
  posterWrapper: {
    width: 100,
    height: 150,
    marginRight: 15,
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'gray',
    fontSize: 14,
    marginTop: 2,
  },
  separator: {
    height: 2,
    backgroundColor: 'rgb(99, 203, 106)',
    marginVertical: 8,
  },
});
