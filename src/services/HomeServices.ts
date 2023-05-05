import { useQueries, useQuery } from "react-query";
import { getDetailMovie, getMoviePerCategory } from "../configs/axios";
import { environment } from "../configs/environment";
import { IParamsMovieCategory } from "../interfaces/params-interfaces";
import { useMemo } from "react";

function HomeServices(params?: IParamsMovieCategory) {
  const { apiKey } = environment;
  const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const random = randomNumber(0, 30);
  const [popularQueries, nowPlayingQueries, topRatedQueries] = useQueries([
    {
      queryKey: ["popular"],
      queryFn: () =>
        getMoviePerCategory("popular", { ...params, api_key: apiKey }),
    },
    {
      queryKey: ["now-playing"],
      queryFn: () =>
        getMoviePerCategory("now_playing", { ...params, api_key: apiKey }),
    },
    {
      queryKey: ["top-rated"],
      queryFn: () =>
        getMoviePerCategory("top_rated", { ...params, api_key: apiKey }),
    },
  ]);

  const popularMovie = useMemo(
    () =>
      popularQueries.status === "success" &&
      Array.isArray(popularQueries.data?.data?.results)
        ? popularQueries.data?.data?.results
        : [],
    [popularQueries.status, popularQueries.data]
  );
  const topRatedMovie = useMemo(
    () =>
      topRatedQueries.status === "success" &&
      Array.isArray(topRatedQueries.data?.data?.results)
        ? topRatedQueries.data?.data?.results
        : [],
    [topRatedQueries.status, topRatedQueries.data]
  );
  const nowPlayingMovie = useMemo(
    () =>
      nowPlayingQueries.status === "success" &&
      Array.isArray(nowPlayingQueries.data?.data?.results)
        ? nowPlayingQueries.data?.data?.results
        : [],
    [nowPlayingQueries.status, nowPlayingQueries.data]
  );
  const featuredQueries = useQuery(
    ["featured-movie", params],
    () =>
      getDetailMovie(
        [...popularMovie, ...nowPlayingMovie, ...topRatedMovie][random].id,
        { ...params, api_key: apiKey }
      ),
    {
      retry: false,
      staleTime: Infinity,
      keepPreviousData: true,
      enabled: popularMovie.length > 0,
    }
  );
  const featuredMovie = useMemo(
    () => featuredQueries.data,
    [featuredQueries.data]
  );
  const isLoading = useMemo(
    () =>
      popularQueries.isLoading ||
      topRatedQueries.isLoading ||
      nowPlayingQueries.isLoading ||
      featuredQueries.isLoading,
    [
      popularQueries.isLoading,
      topRatedQueries.isLoading,
      nowPlayingQueries.isLoading,
      featuredQueries.isLoading,
    ]
  );

  const isError = useMemo(
    () =>
      popularQueries.isError ||
      topRatedQueries.isError ||
      nowPlayingQueries.isError ||
      featuredQueries.isError,
    [
      popularQueries.isError,
      topRatedQueries.isError,
      nowPlayingQueries.isError,
      featuredQueries.isError,
    ]
  );
  return {
    popularMovie,
    topRatedMovie,
    nowPlayingMovie,
    isLoading,
    featuredMovie,
    isError,
  };
}
export default HomeServices;
