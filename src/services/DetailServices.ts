import { useQueries } from "react-query";
import { IParamsDetailMovie } from "../interfaces/params-interfaces";
import {
  getDetailMovie,
  getMovieCredits,
  getMovieRecommendations,
} from "../configs/axios";
import { environment } from "../configs/environment";
import { useMemo } from "react";

function DetailServices(id: any, params?: IParamsDetailMovie) {
  const { apiKey } = environment;
  const [detailQuery, creditQuery, recommedationQuery] = useQueries([
    {
      queryKey: ["detail-movie"],
      queryFn: () => getDetailMovie(id, { ...params, api_key: apiKey }),
    },
    {
      queryKey: ["credits-movie"],
      queryFn: () => getMovieCredits(id, { ...params, api_key: apiKey }),
    },
    {
      queryKey: ["recommedations-movie"],
      queryFn: () =>
        getMovieRecommendations(id, { ...params, api_key: apiKey }),
    },
  ]);
  const detailMovie = useMemo(
    () => detailQuery.status === "success" && detailQuery.data.data,
    [detailQuery.status, detailQuery.data]
  );
  const creditsMovie = useMemo(
    () => creditQuery.status === "success" && creditQuery.data.data,
    [creditQuery.status, creditQuery.data]
  );
  const recommedations = useMemo(
    () =>
      recommedationQuery.status === "success" &&
      Array.isArray(recommedationQuery.data.data.results) &&
      recommedationQuery.data.data.results,
    [recommedationQuery.status, recommedationQuery.data]
  );
  const isLoading = useMemo(
    () =>
      detailQuery.isLoading ||
      creditQuery.isLoading ||
      recommedationQuery.isLoading,
    [detailQuery.isLoading, creditQuery.isLoading, recommedationQuery.isLoading]
  );

  return {
    data: {
      data: {
        ...detailMovie,
        credits: creditsMovie,
        recommedations,
      },
      isLoading,
    },
    isLoading,
  };
}

export default DetailServices;
