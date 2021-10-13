const slideItem = document.querySelector(".carousel2");
const cartNumber = document.querySelector(".js-cart__number");
const stars = document.querySelectorAll(".js-star");
const url = "https://corebiz-test.herokuapp.com/api/v1/products";
const starFilled = `<svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.69478 8.68583L9.21415 10.649L8.28021 6.94899L11.3896 4.45951L7.29501 4.13846L5.69478 0.648987L4.09454 4.13846L0 4.45951L3.10935 6.94899L2.17541 10.649L5.69478 8.68583Z" fill="#F8475F"/>
</svg>`;
const starNonFilled = `<svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.3896 4.4595L7.29501 4.13318L5.69478 0.648972L4.09454 4.13845L0 4.4595L3.10935 6.94897L2.17541 10.649L5.69478 8.68581L9.21415 10.649L8.2859 6.94897L11.3896 4.4595ZM5.69479 7.7016L3.55355 8.89634L4.12303 6.64371L2.23236 5.12792L4.72667 4.92792L5.69479 2.80687L6.66859 4.93318L9.1629 5.13318L7.27224 6.64897L7.84172 8.9016L5.69479 7.7016Z" fill="#F8475F"/>
</svg>`;
var cartItems = localStorage.getItem("cartItems");
cartNumber.textContent = cartItems;

window.addEventListener("load", (e) => {
  fetch(url).then((response) => {
    response
      .json()
      .then((data) => {
        data.forEach((produto) => {
          valor = produto.price;
          function numberToReal(valor) {
            if (valor != null) {
              valor = valor.toString().replace(/\D/g, "");
              valor = valor.toString().replace(/(\d)(\d{8})$/, "$1.$2");
              valor = valor.toString().replace(/(\d)(\d{5})$/, "$1.$2");
              valor = valor.toString().replace(/(\d)(\d{2})$/, "$1,$2");
              return "R$ " + valor;
            }
          }
          var productCard = `
          <div>
              <img src='${produto.imageUrl}'/>
              <p>${produto.productName}</p>
              <ul>
                <li> ${produto.stars > 0 ? starFilled : starNonFilled} </li>
                <li> ${produto.stars > 1 ? starFilled : starNonFilled} </li>
                <li> ${produto.stars > 2 ? starFilled : starNonFilled} </li>
                <li> ${produto.stars > 3 ? starFilled : starNonFilled} </li>
                <li> ${produto.stars > 4 ? starFilled : starNonFilled} </li>
              </ul>
              <p>${numberToReal(valor)}</p>
              <p>${
                produto.listPrice != null ? numberToReal(produto.listPrice) : ""
              }</p>
              <p>${
                produto.installments.length > 0
                  ? produto.installments[0].quantity
                  : ""
              }</p>
              <p>${
                produto.installments.length > 0
                  ? numberToReal(produto.installments[0].value)
                  : ""
              }</p>
              <button onclick="buyItem()">COMPRAR</button>
          </div>`;
          $(".carousel2").slick("slickAdd", productCard);
        });
      })
      .catch((e) => console.error(e.message));
  });
});

const buyItem = () => {
  cartItems++;
  cartNumber.innerHTML = cartItems;
  localStorage.setItem("cartItems", cartItems);
};
