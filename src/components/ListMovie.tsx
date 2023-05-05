import { Star1 } from "iconsax-react";
import { environment } from "../configs/environment";
import useElementHover from "../hooks/useElementHover";
import { IListMovieCategory } from "../interfaces/movies-interfaces";
import moment from "moment";

interface IListMovie {
  data: IListMovieCategory;
}
function ListMovie(props: IListMovie): JSX.Element {
  const { data } = props;
  const { imgUrl } = environment;
  const listHover = useElementHover();

  return (
    <div
      onClick={(): void => {
        window.location.href = `/movie/${data.id}`;
      }}
      {...listHover.triggerHover}
      className="w-1/4 pr-4 flex-slider mb-4 md:w-1/2"
      data-testid="movie"
    >
      <img
        src={
          data.backdrop_path
            ? `${imgUrl}/w1280${data.backdrop_path}`
            : "https://via.placeholder.com/250"
        }
        alt={data.title}
        height="200px"
        className="rounded-xl cursor-pointer w-full h-[200px] object-cover"
        width="100%"
      />
      {listHover.isHovered && (
        <div className="h-[200px] w-full rounded-xl flex flex-col justify-end -mt-[200px] backdrop-brightness-[0.25] p-4 relative z-[999]">
          <div>
            <p className="text-lg font-bold text-white">{data.title}</p>
            <p className="text-sm text-white mt-2">
              {moment(data.release_date).format("DD MMMM YYYY")}
            </p>
            <div className="flex items-center mt-2">
              <Star1 size="16" color="#FF8A65" variant="Bold" />
              <p className="text-sm text-white ml-2">{data.vote_average}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListMovie;
