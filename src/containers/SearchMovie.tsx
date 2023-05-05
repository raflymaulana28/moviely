import { Fragment, useMemo } from "react";
import AppBar from "../components/AppBar";
import Footer from "../components/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getSearchMovie } from "../configs/axios";
import { environment } from "../configs/environment";
import Loading from "../components/Loading";
import ListMovie from "../components/ListMovie";
import { IListMovieCategory } from "../interfaces/movies-interfaces";
import Pagination from "../components/Pagination";
import { SearchNormal } from "iconsax-react";

function SearchMovie() {
  const { apiKey, primaryColor } = environment;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query") as string;
  const page = searchParams.get("page") as string;

  const params = {
    query: query ?? "avengers",
    page: page ? Number(page) : 1,
    include_adult: false,
    api_key: apiKey,
  };
  const { data, status, isLoading } = useQuery(
    ["search-movie", params],
    () => getSearchMovie(params),
    {
      retry: false,
      staleTime: Infinity,
      keepPreviousData: true,
    }
  );
  const searchResult = useMemo(
    () =>
      status === "success" && Array.isArray(data?.data?.results)
        ? data?.data?.results
        : [],
    [status, data]
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Fragment>
      <AppBar isSearch />
      <div className="pr-[84px] pl-[100px] py-4 pt-20 min-h-[580px] md:px-4 ">
        {searchResult.length > 0 ? (
          <Fragment>
            {query && <p className="font-bold">Search Results for "{query}"</p>}
            <div className="flex mt-4 flex-wrap   w-full">
              {searchResult.map((item: IListMovieCategory, index: number) => (
                <ListMovie key={index} data={item} />
              ))}
            </div>
            {query && (
              <div className="mt-4 flex justify-center">
                <Pagination
                  pageCount={data?.data?.total_pages}
                  currentPage={Number(page) ?? 1}
                  goToPage={(pg: number) => {
                    navigate(
                      `/search?query=${query ?? ""}&page=${pg + 1 ?? 1}`
                    );
                  }}
                />
              </div>
            )}
          </Fragment>
        ) : (
          <div className="h-screen flex flex-col items-center justify-center">
            <SearchNormal size="100" color={primaryColor} variant="Outline" />
            <p className="text-center font-semibold text-primary mt-4">
              Movie with keyword "{query}" is not found
            </p>
          </div>
        )}
      </div>
      <Footer />
    </Fragment>
  );
}

export default SearchMovie;
