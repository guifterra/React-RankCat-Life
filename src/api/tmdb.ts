import axios from "axios";

const API_KEY = "API_KEY_COLOCAR_AQUI";
const BASE_URL = "https://api.themoviedb.org/3";

export const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "pt-BR",
  },
});
