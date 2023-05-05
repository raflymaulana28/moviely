/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { act } from "react-dom/test-utils";
import App from "./App";
import { IListMovieCategory } from "./interfaces/movies-interfaces";

const mockAxios = new MockAdapter(axios);

const mockData: IListMovieCategory[] = [
  {
    id: 1,
    title: "Movie 1",
    poster_path: "/poster1.jpg",
    release_date: "2022-01-01",
    vote_average: 7.5,
  },
  {
    id: 2,
    title: "Movie 2",
    poster_path: "/poster2.jpg",
    release_date: "2022-02-01",
    vote_average: 8.0,
  },
];

describe("MovieList", () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it("should render the movie list", async () => {
    mockAxios.onGet("https://api.themoviedb.org/3/movie/popular").reply(200, {
      results: mockData,
    });

    await act(async () => {
      render(<App />);
    });

    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(2);
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("should render the error message if API request fails", async () => {
    mockAxios.onGet("https://api.themoviedb.org/3/movie/popular").reply(500);

    await act(async () => {
      render(<App />);
    });

    expect(screen.getByText("Error loading movies.")).toBeInTheDocument();
  });
});
