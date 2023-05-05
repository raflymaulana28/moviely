import { HeartAdd, InfoCircle } from "iconsax-react";
import { IDetailMovie } from "../interfaces/movies-interfaces";
import { environment } from "../configs/environment";
import { useFavorite } from "../hooks/useFavorite";
interface IFeatured {
  data: IDetailMovie;
}
function HomeFeatured(props: IFeatured) {
  const { data } = props;
  const { imgUrl } = environment;
  const { isFavorite, addFavorite } = useFavorite();

  return (
    <div className="h-screen bg-primary-background">
      <img
        src={
          data.backdrop_path
            ? `${imgUrl}/w1280${data.backdrop_path}`
            : "https://via.placeholder.com/250"
        }
        alt={data.title}
        height="100%"
        className="h-screen w-full object-cover"
        width="100%"
      />
      <div className="h-screen backdrop-brightness-[0.25]  top-0 z-[999] w-full absolute px-[100px] flex flex-col justify-center md:p-4">
        <div className="w-2/6 md:w-full">
          <p className="text-white font-extrabold text-4xl">{data.title}</p>
          <p className="mt-4 text-white text-base">{data.overview}</p>
          <div className="flex items-center mt-4">
            {!isFavorite(data.id) && (
              <button
                onClick={(): void => {
                  addFavorite(data);
                }}
                className="bg-primary rounded-xl mr-4  px-4 text-white my-4 text-xs font-semibold py-2 flex items-center"
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
            <button
              onClick={(): void => {
                window.location.href = `/movie/${data.id}`;
              }}
              className="bg-white rounded-xl px-4 text-black text-xs font-semibold py-2 flex items-center"
            >
              <InfoCircle
                size="20"
                color="#000"
                variant="Outline"
                className="mr-2"
              />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeFeatured;
