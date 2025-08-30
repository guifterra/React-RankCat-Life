import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { getMoviesByGenre } from "../services/moviesService";
import { MaterialIcons } from '@expo/vector-icons';
import { Movie } from "../types/Movie";

export default function CarrosselFilmesDeGenero() {
  const [filmes, setFilmes] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const genreId = 28;

  useEffect(() => {
    carregarFilmes(page);
  }, []);

  async function carregarFilmes(p: number) {
    const data = await getMoviesByGenre(genreId, p);
    setTotalPages(data.totalPages);

    setFilmes(prev => {
      const newItems = data.results.filter((r: Movie) => !prev.some(f => f.id === r.id));
      return [...prev, ...newItems];
    });
  }

  function handleLoadMore() {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      carregarFilmes(nextPage);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerCategory}>
        <Text style={styles.category}>NOME_DA_CATEGORIA_FILME</Text>
        <View style={styles.grennLine} />
      </View>
      <FlatList
        data={filmes}
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
              {item.title}
            </Text>
          </View>
        )}
        ListFooterComponent={() =>
          page < totalPages ? (
            <TouchableOpacity style={styles.loadMore} onPress={handleLoadMore}>
              <Text style={styles.loadMoreText}>
                <MaterialIcons name="arrow-forward" size={28} color="white" />
              </Text>
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
  loadMoreText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
});
