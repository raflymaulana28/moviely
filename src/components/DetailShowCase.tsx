import { Calendar, Clock, HeartAdd, HeartRemove, Star1 } from "iconsax-react";
import { IDetailMovie } from "../interfaces/movies-interfaces";
import { environment } from "../configs/environment";
import moment from "moment";
import { useFavorite } from "../hooks/useFavorite";

interface IShowCase {
  data: IDetailMovie;
}
function DetailShowCase(props: IShowCase): JSX.Element {
  const { data } = props;
  const { imgUrl, primaryColor } = environment;
  const { isFavorite, addFavorite, removeFavorite } = useFavorite();
  const director =
    data?.credits?.crew?.length > 0
      ? data.credits.crew.filter((i) => i.job === "Director")
      : [];
  const directorName = director?.length > 0 ? director[0].name : null;
  return (
    <div>
      <img
        src={
          data.backdrop_path
            ? `${imgUrl}/w1280${data.backdrop_path}`
            : "https://via.placeholder.com/250"
        }
        alt={data.title}
        height="100%"
        width="100%"
        className="h-[500px] object-cover"
      />
      <div className="h-[100px] bg-gradient-to-t  from-white -mt-[100px] relative z-1" />

      <div className="flex w-full p-6 md:p-4 md:block">
        <div className="w-4/6 pr-6 md:w-full md:p-0">
          <p className="text-4xl font-extrabold">{data.title}</p>
          {isFavorite(data.id) ? (
            <button
              onClick={(): void => {
                removeFavorite(data.id);
              }}
              className="bg-white border border-primary border-solid rounded-xl px-4 text-primary my-4 text-xs font-semibold py-2 flex items-center"
            >
              <HeartRemove
                size="20"
                color={primaryColor}
                variant="Outline"
                className="mr-2"
              />
              Remove from Favorite
            </button>
          ) : (
            <button
              onClick={(): void => {
                addFavorite(data);
              }}
              className="bg-primary rounded-xl px-4 text-white my-4 text-xs font-semibold py-2 flex items-center"
            >
              <HeartAdd
                size="20"
                color="#fff"
                variant="Outline"
                className="mr-2"
              />
              Add To Favorite
            </button>
          )}

          <div className="flex items-center mt-4">
            <div className="flex items-center">
              <Calendar size="16" color="#FF8A65" variant="Bold" />
              <p className="ml-2">
                {moment(data.release_date).format("DD MMMM YYYY")}
              </p>
            </div>
            <div className="flex items-center ml-4">
              <Star1 size="16" color="#FF8A65" variant="Bold" />
              <p className="ml-2">{data.vote_average}</p>
            </div>
            <div className="flex items-center ml-4">
              <Clock size="16" color="#FF8A65" variant="Bold" />
              <p className="ml-2">
                {Math.floor(data.runtime / 60)}h {data.runtime % 60}m
              </p>
            </div>
          </div>
          <p className="mt-4">{data.overview}</p>
          <div className="flex flex-wrap my-2">
            <p className="font-bold mr-2">Original Title:</p>
            <p className="mr-2">{data.original_title}</p>
          </div>
          <div className="flex flex-wrap mb-2">
            <p className="font-bold mr-2">Status:</p>
            <p className="mr-2">{data.status}</p>
          </div>
          <div className="flex flex-wrap mb-2">
            <p className="font-bold mr-2">Budget:</p>
            <p className="mr-2">$ {data.budget.toLocaleString()}</p>
          </div>
          <div className="flex flex-wrap mb-2">
            <p className="font-bold mr-2">Revenue:</p>
            <p className="mr-2">$ {data.revenue.toLocaleString()}</p>
          </div>
        </div>
        <div className="w-2/6 md:w-full">
          <p className="mb-2">
            <b>Cast: </b>
            {data?.credits?.cast?.map((cast) => cast.name).join(", ")}
          </p>
          <p className="mb-2">
            <b>Genres: </b>
            {data.genres.map((genre) => genre.name).join(", ")}
          </p>
          <div className="flex flex-wrap mb-2">
            <p className="font-bold mr-2">Director:</p>
            <p className="mr-2">{directorName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailShowCase;
