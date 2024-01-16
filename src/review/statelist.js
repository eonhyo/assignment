export default function updateReviewList(value) {
  const reviewList = document.getElementById("reviewlist");
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  const reviewListUl = reviewList.querySelector("ul");
  reviewListUl.innerHTML = "";
  reviews.forEach((review) => {
    if (Number(review.movie_id) === Number(value)) {
      const li = document.createElement("li");
      li.innerHTML = `
    <em>${review.stars}</em>
    <br>
    <em>${review.name}</em> 
    <br>
    <br>
    <em>${review.impressions}</em>
    <br>
    <br>
    <em>${review.aspects}</em> <em>${review.emotions}</em> <em> ${review.date}</em>
    `;
      reviewListUl.appendChild(li);
    }
  });
}
