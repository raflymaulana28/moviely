export interface IParamsDetailMovie {
  api_key?: string;
  language?: string;
}
export interface IParamsMovieCategory extends IParamsDetailMovie {
  page?: number;
}
export interface IParamsSearchMovie extends IParamsMovieCategory {
  include_adult?: boolean;
  query?: string;
}
