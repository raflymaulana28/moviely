import { Fragment } from "react";
import Footer from "../components/Footer";
import DetailShowCase from "../components/DetailShowCase";
import AppBar from "../components/AppBar";
import DetailServices from "../services/DetailServices";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import ListMovie from "../components/ListMovie";
import { IListMovieCategory } from "../interfaces/movies-interfaces";

function DetailMovie(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = DetailServices(id);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Fragment>
      <AppBar />
      <div className="pt-18 px-[100px] md:px-0">
        <DetailShowCase data={data?.data} />
      </div>
      <div className="pr-[84px] pl-[100px]  py-4 md:p-4">
        <p className="font-bold">Recommendations</p>
        <div className="flex mt-4 flex-wrap   w-full">
          {data.data.recommedations.map(
            (item: IListMovieCategory, index: number) => (
              <ListMovie key={index} data={item} />
            )
          )}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default DetailMovie;
