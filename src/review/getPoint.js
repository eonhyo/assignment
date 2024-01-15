class AspectPoints {
  constructor() {
    this.aspects = document.querySelectorAll(".aspects .aspect-item");
    this.selectedAspects = [];
    this.initialize();
  }

  initialize() {
    this.aspects.forEach((item) => {
      item.addEventListener("click", () => {
        item.classList.toggle("active");
        this.updateSelections();
      });
    });
  }

  updateSelections() {
    this.selectedAspects = Array.from(this.aspects)
      .filter((item) => item.classList.contains("active"))
      .map((item) => item.textContent);
    console.log("Selected Aspects:", this.selectedAspects);
  }
}

class EmotionPoints {
  constructor() {
    this.emotions = document.querySelectorAll(".emotions .emotion-item");
    this.selectedEmotions = [];
    this.initialize();
  }

  initialize() {
    this.emotions.forEach((item) => {
      item.addEventListener("click", () => {
        item.classList.toggle("active");
        this.updateSelections();
      });
    });
  }

  updateSelections() {
    this.selectedEmotions = Array.from(this.emotions)
      .filter((item) => item.classList.contains("active"))
      .map((item) => item.textContent);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const aspectPoints = new AspectPoints();
  const emotionPoints = new EmotionPoints();
});
