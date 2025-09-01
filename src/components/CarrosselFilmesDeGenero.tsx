import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { getMoviesByGenre } from "../services/moviesService";
import { MaterialIcons } from "@expo/vector-icons";
import { Movie } from "../types/Movie";
import { Category } from "../types/Category";

// 🔹 Item memoizado
const FilmeItem = React.memo(({ item }: { item: Movie }) => (
  <View style={styles.item}>
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
      style={styles.poster}
    />
    <Text style={styles.title} numberOfLines={1}>
      {item.title}
    </Text>
  </View>
));

export default function CarrosselFilmesDeGenero({ nomeDaCategoria, numeroDaCategoria }: Category) {
  const [filmes, setFilmes] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const genreName = nomeDaCategoria;
  const genreId = numeroDaCategoria;

  useEffect(() => {
    carregarFilmes(1);
  }, []);

  async function carregarFilmes(p: number) {
    const data = await getMoviesByGenre(genreId, p);
    setTotalPages(data.totalPages);

    setFilmes(prev => {
      const newItems = data.results.filter(
        (r: Movie) => !prev.some(f => f.id === r.id)
      );
      return [...prev, ...newItems];
    });
  }

  const handleLoadMore = useCallback(() => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      carregarFilmes(nextPage);
    }
  }, [page, totalPages]);

  const renderItem = useCallback(
    ({ item }: { item: Movie }) => <FilmeItem item={item} />,
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerCategory}>
        <Text style={styles.category}>{genreName} - FILMES</Text>
        <View style={styles.grennLine} />
      </View>
      <FlatList
        data={filmes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListFooterComponent={() =>
          page < totalPages ? (
            <TouchableOpacity style={styles.loadMore} onPress={handleLoadMore}>
              <MaterialIcons name="arrow-forward" size={28} color="white" />
            </TouchableOpacity>
          ) : null
        }
        // 🔹 Otimizações
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews
        getItemLayout={(_, index) => ({
          length: 130, // largura item + marginRight
          offset: 130 * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  containerCategory: {
    marginBottom: 10,
  },
  category: {
    color: "rgb(255, 255, 255)",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 20,
  },
  grennLine: {
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
