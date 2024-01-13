class PersonalInfo {
  constructor() {
    this.nameInput = document.getElementById("name");
    this.passwordInput = document.getElementById("password");
    this.errorMessage = document.getElementById("required");
    this.isValid = false;
    this.initialize();
  }

  initialize() {
    this.nameInput.addEventListener("input", () => this.validateName());
    this.passwordInput.addEventListener("input", () => this.validatePassword());
  }

  validateName() {
    const nameRegex = /^[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ]+$/;
    if (!this.nameInput.value.match(nameRegex)) {
      this.showErrorMessage("이름에는 문자만 입력 가능합니다.");
      return false; // 유효성 검사 실패
    } else {
      this.hideErrorMessage();
      return true; // 유효성 검사 성공
    }
  }

  validatePassword() {
    const passwordRegex = /^\d+$/;
    if (!this.passwordInput.value.match(passwordRegex)) {
      this.showErrorMessage("확인할 번호는 숫자만 입력 가능합니다.");
      return false; // 유효성 검사 실패
    } else {
      this.hideErrorMessage();
      return true; // 유효성 검사 성공
    }
  }

  showErrorMessage(message) {
    this.errorMessage.textContent = message;
    this.errorMessage.style.display = "block";
  }

  hideErrorMessage() {
    this.errorMessage.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const personalInfo = new PersonalInfo();
});
