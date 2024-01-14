const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");
console.log("Item ID:", itemId);
const API_KEY = api.key;
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
  console.log(movie);
  const chosenMoviePage = document.getElementById("chosen-movie-page");
  const IMG_URL = "https://image.tmdb.org/t/p/w500";

  chosenMoviePage.innerHTML = `
    <article id="movie-article">
      <section id="poster-section">
        <img src=${IMG_URL + movie.poster_path} />
      </section>
      <section id="info-section">
        <h1>${movie.title}</h1>
        <p class="releas-date">${movie.release_date}</p>
        <p class="vote-star">
          <img src="../assets/main/star.svg" />
          ${Math.ceil((movie.vote_average / 2) * 10) / 10}
        </p>
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
        <div id="review-box">

        </div>
      </section>
    </article>
  `;
};
