const API_KEY = "api_key=2f7ff395e001967bcd029e4d663de74c";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const id = document.getElementById("id");

getMovies(API_URL);

async function getMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);
    showMovies(data.results);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
  }
}

const showMovies = (data) => {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview, backdrop_path, release_date } = movie;
    const movierating = vote_average.toFixed(1);
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    const posterUrl = `${IMG_URL}${poster_path}`;
    const backPosterUrl = `${IMG_URL}${backdrop_path}`;

    movieEl.addEventListener("click", () => {
      let movieData = [];
      movieData.push({
        title: title,
        poster: posterUrl,
        backPoster: backPosterUrl,
        overview: overview,
        voteAvaerage: vote_average,
        releasDate: release_date
      });
      localStorage.setItem("movie", JSON.stringify(movieData));
      window.location.href = "sub.html";
    });

    movieEl.innerHTML = `
		<img src="${IMG_URL + poster_path}" alt="${title}" />
		<div class="movieinfo">
			<h3>${title}</h3>
			<span class="green">${movierating}</span>
		</div>
		<div class="overview">
			<h3>Overview</h3>
			${overview}
		</div>`;

    main.appendChild(movieEl);
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  }
});
