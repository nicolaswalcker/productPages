const form = document.querySelector(".c-form");
const inputName = document.querySelector(".js-name");
const inputMail = document.querySelector(".js-mail");
const smallName = document.querySelector(".js-small__name");
const smallEmail = document.querySelector(".js-small__email");
const urlNews = "https://corebiz-test.herokuapp.com/api/v1/newsletter";

const sendData = () => {
  let objJson = {
    email: inputMail.value,
    name: inputName.value,
  };
  let newObj = JSON.stringify(objJson);
  const XHR = new XMLHttpRequest();

  XHR.addEventListener("error", (event) => {
    alert("Oops, algo deu errado");
  });
  XHR.open("POST", urlNews, true);
  XHR.send(newObj);
};
form.addEventListener("submit", (event) => {
  if (inputName.value === "") {
    event.preventDefault();
    smallName.classList.add("u-small__active");
  } else {
    smallName.classList.remove("u-small__active");
  }
  if (inputMail.value === "") {
    event.preventDefault();
    smallEmail.classList.add("u-small__active");
  } else {
    smallEmail.classList.remove("u-small__active");
  }
  sendData();
});
