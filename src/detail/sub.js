import updateReviewList from "../review/statelist.js";

const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");
console.log("Item ID:", itemId);
const API_KEY = "api_key=2f7ff395e001967bcd029e4d663de74c";
const BASE_URL = "https://api.themoviedb.org/3/movie/";
const FULL_URL = `${BASE_URL + itemId}?language=en-US&${API_KEY}`;

const fetchMovieDetails = () => {
  fetch(FULL_URL)
    .then((response) => response.json())
    .then((movie) => showMovieDetails(movie))
    .catch((err) => console.error(err));
};

fetchMovieDetails();

const showMovieDetails = (movie) => {
  const IMG_URL = "https://image.tmdb.org/t/p/w500";
  const POSTER_SECTION = document.getElementById("poster-section");
  const INFO_SECTION = document.getElementById("info-section");
  const REVIEW_SECTION = document.getElementById("review-section");

  POSTER_SECTION.innerHTML = `
        <img src=${IMG_URL + movie.poster_path} />
  `;

  INFO_SECTION.innerHTML = `
        <div class="title-box">
          <h1>${movie.title}
            <p class="releas-date">${movie.release_date}</p>
          </h1>
          <p class="vote-star">
            <img src="../assets/main/star.svg" />
            ${Math.ceil(movie.vote_average * 10) / 10}
          </p>
        </div>
        <div class="details-box">
          <div class="film-box">
            <img class="film-bar" src="../assets/main/film_bar_gray.png">
            <img class="back-porster" src=${IMG_URL + movie.backdrop_path} />
            <img class="film-bar" src="../assets/main/film_bar_gray.png">
          </div>
          <div class="info-box">
            <p class="tag-line">"${movie.tagline}"</p>
            <p class="plot">${movie.overview}</p>
            <a class="homepage-btn" href="${movie.homepage}" target="_blank">
              <img src="../assets/main/logo_arrow.png"/>
            </a>
          </div>
        </div>
        `;

  // REVIEW_SECTION.innerHTML = `
  //       <div id="review-box">
  //       </div>
  // `;

  updateReviewList(movie.id);
};
