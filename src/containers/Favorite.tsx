import { Fragment } from "react";
import AppBar from "../components/AppBar";
import { useFavorite } from "../hooks/useFavorite";
import { IListMovieCategory } from "../interfaces/movies-interfaces";
import ListMovie from "../components/ListMovie";
import Footer from "../components/Footer";
import { HeartRemove } from "iconsax-react";
import { environment } from "../configs/environment";

function Favorite(): JSX.Element {
  const { favoriteMovies } = useFavorite();
  const { primaryColor } = environment;
  return (
    <Fragment>
      <AppBar />
      <div className="pr-[84px] pl-[100px] py-4 pt-20 min-h-[580px] md:px-4 ">
        {favoriteMovies && favoriteMovies?.length > 0 ? (
          <Fragment>
            <p className="font-bold">My Favorite Movies</p>
            <div className="flex mt-4 flex-wrap   w-full">
              {favoriteMovies?.map(
                (item: IListMovieCategory, index: number) => (
                  <ListMovie key={index} data={item} />
                )
              )}
            </div>
          </Fragment>
        ) : (
          <div className="h-screen flex flex-col items-center justify-center">
            <HeartRemove size="100" color={primaryColor} variant="Outline" />
            <p className="text-center font-semibold text-primary mt-4">
              You Don't have any favorite, add on detail
            </p>
          </div>
        )}
      </div>
      <Footer />
    </Fragment>
  );
}

export default Favorite;
