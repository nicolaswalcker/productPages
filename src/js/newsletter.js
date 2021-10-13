const form = document.querySelector(".c-form");
const inputName = document.querySelector("c-input__name");
const inputMail = document.querySelector("c-input__mail");
const urlNews = "https://corebiz-test.herokuapp.com/api/v1/newsletter";

const sendData = () => {
  console.log("sending data");
  let objJson = {
    email: inputMail.value,
    name: inputName.value,
  };
  let newObj = JSON.stringify(objJson);
  const XHR = new XMLHttpRequest();

  XHR.addEventListener("load", (event) => {
    alert(event.target.responseText);
  });

  XHR.addEventListener("error", (event) => {
    alert("Oops, algo deu errado");
  });
  XHR.open("POST", urlNews, true);
  XHR.send(newObj);
  console.log(newObj);
};
form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});
