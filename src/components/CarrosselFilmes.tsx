import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { getPopularMovies } from "../services/moviesService";

export default function CarrosselFilmes() {
  const [filmes, setFilmes] = useState<any[]>([]);

  useEffect(() => {
    async function carregar() {
      const data = await getPopularMovies();
      setFilmes(data);
    }
    carregar();
  }, []);

  return (
    <View style={styles.container}>
        <View style={styles.containerCategory}>
            <Text style={styles.category}>Filmes Populares</Text>
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
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.poster}
            />
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
          </View>
        )}
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
});
