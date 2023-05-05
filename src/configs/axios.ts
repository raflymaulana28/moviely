import axios from "axios";
import { environment } from "./environment";
import {
  IParamsDetailMovie,
  IParamsMovieCategory,
  IParamsSearchMovie,
} from "../interfaces/params-interfaces";

const { baseUrl } = environment;

export const api = axios.create({
  baseURL: baseUrl,
});

export const getMoviePerCategory = (
  category: string,
  params?: IParamsMovieCategory
) => api.get(`/movie/${category}`, { params });
export const getSearchMovie = (params: IParamsSearchMovie) =>
  api.get("/search/movie", { params });
export const getDetailMovie = (id: string, params?: IParamsDetailMovie) =>
  api.get(`/movie/${id}`, { params });
export const getMovieCredits = (id: string, params?: IParamsDetailMovie) =>
  api.get(`/movie/${id}/credits`, { params });
export const getMovieRecommendations = (
  id: string,
  params?: IParamsDetailMovie
) => api.get(`/movie/${id}/recommendations`, { params });
