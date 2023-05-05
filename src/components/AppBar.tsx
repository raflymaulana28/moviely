import { HeartSearch, Play, SearchNormal } from "iconsax-react";
import { environment } from "../configs/environment";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
interface IAppBar {
  isSearch?: boolean;
}
function AppBar(props: IAppBar): JSX.Element {
  const { isSearch } = props;
  const { primaryColor } = environment;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query") as string;
  const page = searchParams.get("page") as string;

  const isFilter = Boolean(query);
  const [openSearch, setOpenSearch] = useState<boolean>(isFilter ?? false);
  const [search, setSearch] = useState(query ?? "");
  const handleChangeSearch = (e: { target: { value: string } }): void => {
    if (e.target.value?.length > 0) {
      navigate(`/search?query=${e.target.value}&page=${page ?? 1}`);
      setSearch(e.target.value);
      setOpenSearch(true);
    } else {
      navigate("/");
      setSearch("");
      setOpenSearch(false);
    }
  };
  return (
    <div className="flex fixed w-full z-[10000] shadow-xs items-center justify-between py-4 px-[100px] bg-primary-background border-b border-[#eaeaea] border-b-solid md:px-4">
      <div className="flex items-center">
        <div
          onClick={(): void => {
            navigate("/");
          }}
          className="flex items-center cursor-pointer"
        >
          <Play size="32" color={primaryColor} variant="Bold" />
          <p className="text-primary ml-2 font-bold text-base">MovieLy</p>
        </div>
      </div>
      <div className="flex items-center">
        {openSearch ? (
          <div className="flex items-center border border-primary border-solid rounded px-2 py-1">
            <SearchNormal
              size="20"
              color={primaryColor}
              variant="Outline"
              className="cursor-pointer"
            />
            <input
              onChange={handleChangeSearch}
              className="text-xs outline-none w-full ml-4"
              placeholder="Search movie titles..."
              value={search}
            />
          </div>
        ) : (
          <SearchNormal
            size="20"
            color={primaryColor}
            variant="Outline"
            className="cursor-pointer"
            onClick={(): void => {
              if (isSearch) {
                setOpenSearch(!openSearch);
              } else {
                navigate("/search");
              }
            }}
          />
        )}
        <HeartSearch
          size="20"
          color={primaryColor}
          variant="Bold"
          className="hidden md:block ml-2 cursor-pointer"
          onClick={(): void => {
            navigate("/favorite");
          }}
        />
        <p
          onClick={(): void => {
            navigate("/favorite");
          }}
          className="ml-4 text-sm text-primary font-semibold cursor-pointer md:hidden"
        >
          My Favorite
        </p>
      </div>
    </div>
  );
}

export default AppBar;
