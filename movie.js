const API_KEY = "";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const id = document.getElementById("id");

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}

const showMovies = (data) => {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movierating = vote_average.toFixed(1);
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.addEventListener("click", () => {
      alert("Movie ID :" + movie.id);
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
