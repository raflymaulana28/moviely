import React from "react";

function Footer(): JSX.Element {
  return (
    <div className="py-6 w-full flex justify-center bg-primary-background">
      <div className="flex items-center w-auto">
        <p className="font-semibold mr-4 text-sm">Powered By</p>
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          alt="tmdb-logo"
          width="100%"
          height="100%"
          className="w-[50px] cursor-pointer"
          onClick={(): void => {
            window.open("https://www.themoviedb.org/", "_blank");
          }}
        />
      </div>
    </div>
  );
}

export default Footer;
