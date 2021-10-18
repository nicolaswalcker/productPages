const buttonMobile = document.querySelector(".js-mobile");
const mobileMenu = document.querySelector(".js-menu");
var width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

buttonMobile.addEventListener("click", (e) => {
  buttonMobile.classList.toggle('u-active')
  mobileMenu.classList.toggle('u-menu__active')
});
