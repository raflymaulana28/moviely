import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IListMovieCategory } from "../interfaces/movies-interfaces";

export const FavoriteContext = createContext({}) as any;

interface IFavoriteContext {
  children?: React.ReactNode;
  favoriteMovies?: IListMovieCategory[];
  addFavorite?: any;
  removeFavorite?: any;
  isFavorite?: any;
}
const FavoriteContextProvider = (props: IFavoriteContext) => {
  const { children } = props;
  const [favoriteMovies, setFavoriteMovies] = useState<IListMovieCategory[]>(
    []
  );

  useEffect(() => {
    const favorite = JSON.parse(localStorage.getItem("favorite") as string);
    if (favorite?.length > 0) {
      setFavoriteMovies(favorite);
    }
  }, []);
  const addFavorite = (movie: IListMovieCategory) => {
    const newFavorite = [...favoriteMovies, movie];
    localStorage.setItem("favorite", JSON.stringify(newFavorite));
    setFavoriteMovies(newFavorite);
  };

  const removeFavorite = (id: number) => {
    const newFavorite = favoriteMovies.filter((b) => b.id !== id);
    localStorage.setItem("favorite", JSON.stringify(newFavorite));
    setFavoriteMovies(newFavorite);
  };
  const isFavorite = useMemo(
    () => (id: number) => favoriteMovies.filter((b) => b.id === id).length > 0,
    [favoriteMovies]
  );

  return (
    <FavoriteContext.Provider
      value={{ favoriteMovies, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContextProvider;

export const useFavorite = (): IFavoriteContext => useContext(FavoriteContext);
