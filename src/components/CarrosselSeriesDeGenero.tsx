import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { getSeriesByGenre } from "../services/moviesService";
import { MaterialIcons } from '@expo/vector-icons';
import { Serie } from "../types/Serie";
import { Category } from "../types/Category";

export default function CarrosselSeriesDeGenero( { nomeDaCategoria, numeroDaCategoria } : Category ) {
  const [series, setSeries] = useState<Serie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const genderName = nomeDaCategoria;
  const genreId = numeroDaCategoria;

  useEffect(() => {
    carregarSeries(page);
  }, []);

  async function carregarSeries(p: number) {
    const data = await getSeriesByGenre(genreId, p);
    setTotalPages(data.totalPages);

    setSeries(prev => {
      const newItems = data.results.filter((r: Serie) => !prev.some(f => f.id === r.id));
      return [...prev, ...newItems];
    });
  }

  function handleLoadMore() {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      carregarSeries(nextPage);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerCategory}>
        <Text style={styles.category}>{genderName} - SERIES</Text>
        <View style={styles.grennLine} />
      </View>
      <FlatList
        data={series}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.poster}
            />
            <Text style={styles.title} numberOfLines={1}>
              {item.name}
            </Text>
          </View>
        )}
        ListFooterComponent={() =>
          page < totalPages ? (
            <TouchableOpacity style={styles.loadMore} onPress={handleLoadMore}>
              <MaterialIcons name="arrow-forward" size={28} color="white" />
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginBottom: 25,
  },
  containerCategory:{
    marginBottom: 10,
  },
  category:{
    color: "rgb(255, 255, 255)",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 20,
  },
  grennLine:{
    height: 3,
    width: 120,
    backgroundColor: "rgb(99, 203, 106)",
    marginTop: 4,
    borderRadius: 2,
  },
  item: {
    width: 120,
    marginRight: 10,
  },
  poster: {
    width: "100%",
    height: 180,
    borderRadius: 8,
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "rgb(255, 255, 255)",
    textAlign: "center",
    backgroundColor: "rgb(0, 0, 0)",
    padding: 2,
    borderRadius: 5,
  },
  loadMore: {
    width: 120,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "rgb(99, 203, 106)",
    borderRadius: 8,
  },
});
