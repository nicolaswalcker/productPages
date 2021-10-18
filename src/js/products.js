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
        data.forEach((product) => {
          let {
            productId: productId,
            productName: productName,
            stars: productStars,
            imageUrl: productImage,
            listPrice: productListPrice,
            price: productPrice,
          } = product;
          console.log(productPrice);
          const numberToReal = (value) => {
            if (value != null) {
              value = value.toString().replace(/(\d)(\d{2})$/, "$1,$2");
              return "R$ " + value;
            }
          };
          var productCard = `
          <div class="c-product">
              <img class="c-product__image" src='${productImage}'/>
              <h2 class="c-product__name">${productName}</h2>
              <ul class="c-product__stars>
                <li class="c-product__star"> ${
                  productStars > 0 ? starFilled : starNonFilled
                } </li>
                <li class="c-product__star"> ${
                  productStars > 1 ? starFilled : starNonFilled
                } </li>
                <li class="c-product__star"> ${
                  productStars > 2 ? starFilled : starNonFilled
                } </li>
                <li class="c-product__star"> ${
                  productStars > 3 ? starFilled : starNonFilled
                } </li>
                <li class="c-product__star"> ${
                  productStars > 4 ? starFilled : starNonFilled
                } </li>
              </ul>
              <p class="${
                productListPrice == null
                  ? "c-principal__prize"
                  : "c-secondary__prize"
              }">${
            productListPrice == null
              ? "<span class='c-product__text'>por </span>" +
                numberToReal(productPrice)
              : "<span class='c-product__text'>de </span>" +
                numberToReal(productPrice)
          }</p>

              <p class="c-principal__prize">${
                productListPrice != null
                  ? "<span class='c-product__text'>por </span>" +
                    numberToReal(productListPrice)
                  : ""
              }</p>
              <p class="c-product__installment-quantity">${
                product.installments.length > 0
                  ? product.installments[0].quantity
                  : ""
              }</p>
              <p class="c-product__installment-value">${
                product.installments.length > 0
                  ? numberToReal(product.installments[0].value)
                  : ""
              }</p>
              <button class="c-button" onclick="buyItem()">COMPRAR</button>
          </div>`;
          $(".c-products__carousel").slick("slickAdd", productCard);
        });
      })
      .catch((e) => alert(e.message));
  });
});

const buyItem = () => {
  cartItems++;
  cartNumber.innerHTML = cartItems;
  localStorage.setItem("cartItems", cartItems);
};
