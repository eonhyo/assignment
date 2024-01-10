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

// 이미지 슬라이드
const sliderContainer = document.querySelector(".slider-container");
let slideItems;
let currentSlide = 0;

const showMovies = (data) => {
  const clonedMovies = [...data, ...data, ...data];

  clonedMovies.slice(0, 6).forEach((movie) => {
    const { poster_path, title, vote_average } = movie;
    const slideItem = document.createElement("div");
    slideItem.classList.add("slide-item");

    const image = new Image();
    image.src = `${IMG_URL + poster_path}`;
    slideItem.appendChild(image);

    const movieInfo = document.createElement("div");
    movieInfo.classList.add("movie-info");
    movieInfo.innerHTML = `<h3>${title}</h3><span class="green">${vote_average}</span>`;
    slideItem.appendChild(movieInfo);

    sliderContainer.appendChild(slideItem);
  });

  slideItems = document.querySelectorAll(".slide-item");
  showSlide();
};

const showSlide = () => {
  const transformValue = -currentSlide * 100 + "%";
  sliderContainer.style.transform = `translateX(${transformValue})`;
};

const prevSlide = () => {
  currentSlide = currentSlide > 0 ? currentSlide - 1 : slideItems.length - 1;
  showSlide();
};

const nextSlide = () => {
  currentSlide = currentSlide < slideItems.length - 1 ? currentSlide + 1 : 0;
  showSlide();
};

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);
