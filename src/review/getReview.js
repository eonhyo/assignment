class Impressions {
  constructor() {
    this.impressionsInput = document.getElementById("impressions");
    this.initialize();
  }

  initialize() {
    this.impressionsInput.addEventListener("input", () => {});
  }

  getImpressions() {
    return this.impressionsInput.value;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const impressions = new Impressions();
});
