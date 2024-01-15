class OpenButton {
  constructor(modal) {
    this.openButton = document.getElementById("open");
    this.modal = modal;
    this.addEventListeners();
  }

  addEventListeners() {
    this.openButton.addEventListener("click", (event) => {
      this.openModal(event);
    });
  }

  openModal(event) {
    event.preventDefault();
    this.modal.showModal();
  }
}
