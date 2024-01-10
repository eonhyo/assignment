export const goToAnotherPage = (pageUrl) => {
  if (pageUrl !== "/") {
    window.location.href = `${pageUrl}.html`;
  } else {
    window.location.href = pageUrl;
  }
};

export const showText = (el, text) => {
  el.style.display = "block";
  el.innerHTML = text;
};

export const removeText = (el) => {
  el.style.display = "none";
};

class AuthFunc {
  isBlankText = (text) => {
    if (!text) {
      return true;
    }
    return false;
  };

  emailCheck = (email_address) => {
    const email_regex = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (!email_regex.test(email_address)) {
      return false;
    } else {
      return true;
    }
  };
}

export const authFunc = new AuthFunc();
