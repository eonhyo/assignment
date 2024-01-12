let movieData = JSON.parse(localStorage.getItem("movie"));

const showMovieInpo = () => {
  const chosenMovieTitle = movieData[0].title;
  const chosenMoviePoster = movieData[0].poster;
  const chosenMovieBackPoster = movieData[0].backPoster;
  const chosenMovieOverview = movieData[0].overview;
  const chosenMovieVoteAvarage = movieData[0].voteAvaerage;
  const chosenMovieReleasDate = movieData[0].releasDate;
  const chosenMoviePage = document.getElementById("chosen-movie-page");

  chosenMoviePage.innerHTML = `
    <article id="movie-article">
      <section id="poster-section">
        <img src=${chosenMoviePoster} />
      </section>
      <section id="info-section">
        <h1>${chosenMovieTitle}</h1>
        <p class="releas-date">${chosenMovieReleasDate}</p>
        <div class="film-box">
          <img class="film-bar" src="../assets/main/film_bar_gray.png">
          <img class="back-porster" src=${chosenMovieBackPoster} />
          <img class="film-bar" src="../assets/main/film_bar_gray.png">
        </div>
        <div class="info-box">
          <p class="vote-star">
            <img class="back-porster" src="../assets/main/star.svg" />
            ${chosenMovieVoteAvarage}
          </p>
          <p class="plot">${chosenMovieOverview}</p>
        </div>
        <div id="review-box">
        
        </div>
        <div id="link-box">
          <p>
          TV, 영화, 스포츠는 스파르타 플레이에서!
          </p>
          <img src="../assets/main/coupang_play.png" alt="" />
        </div>
      </section>
    </article>
  `;
};

showMovieInpo();
