import { Fragment } from "react";
import HomeFeatured from "../components/HomeFeatured";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
// import Loading from "../components/Loading";
import HomeServices from "../services/HomeServices";
import AppBar from "../components/AppBar";
import Loading from "../components/Loading";

function Home(): JSX.Element {
  const {
    isLoading,
    popularMovie,
    topRatedMovie,
    nowPlayingMovie,
    featuredMovie,
  } = HomeServices({ page: 1 });
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <AppBar />
      {featuredMovie && <HomeFeatured data={featuredMovie.data} />}
      <Slider data={popularMovie} title="Popular" id="popular" />
      <Slider data={nowPlayingMovie} title="Now Playing" id="now-playing" />
      <Slider data={topRatedMovie} title="Top Rated" id="top-rated" />
      <Footer />
    </Fragment>
  );
}

export default Home;
