import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState(
    []
  ); /**responsible for whatever random movie selected at the top */

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      /* gets us a random movie from the  fetchNetflixOriginals list of movies*/
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []); /**Run once when the Banner component loads */

  console.log(movie);

  /**function to create ellipses when description text in header is truncated */
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        {/*we will give it a Background image */}
        {/*title */}
        <h1 className="banner__title">
          {/*so this is same as saying if movie.title does not exist, or if movie.name or if movie.original_name does not exist. Hence tthis helps to get rid of a long list of if statements */}
          {/* the question mark is something new in react called "optional chaining" */}
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/*div > 2 buttons */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        {/*description */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadebottom" />
    </header>
  );
}

export default Banner;
