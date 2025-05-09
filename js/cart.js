var cart = document.getElementsByClassName("cart-content");
if (cart.length > 0) {
  function addInputListener(input) {
    let row = input.parentElement.parentElement.parentElement,
      overallPriceElement = row.querySelector(".cart-item-price span"),
      price = parseFloat(
        row
          .querySelector(".cart-item-price-pc span")
          .innerText.replace(/,/g, ".")
      ),
      calcEvent = function () {
        this.value > 0 
        ? (overallPriceElement.innerText = (price * this.value)
            .toFixed(2)
            .toString()
            .replace(".", ","))
        : (overallPriceElement.innerText = "0");
        var codePriceN = 0;
        if (document.getElementById("codePrice")) {
          codePriceN = parseFloat(
            document.getElementById("codePrice").innerText
          );
        } else codePriceN = 0;
        let pricegoods = document.querySelectorAll(".cart-item-price span "),
        result = Array.from(pricegoods).reduce(
            (sum, spanElm) =>
              sum + Number(spanElm.textContent.replace(",", ".")),
            0
          );
        if (document.getElementById("codePrice"))
          if (
            0 ==
            document.getElementById("codePrice").getAttribute("data-percentage")
          ) {
            let result_f = (result - codePriceN)
              .toFixed(2)
              .toString()
              .replace(/\./g, ",");
            document.getElementById("goodsprice").innerText = result_f;
          } else {
            let salePer =
              0.01 * document.getElementById("codePrice").dataset.percentage;
            document.getElementById("codePrice").innerHTML = parseFloat(
              result * salePer
            ).toFixed(2);
            let result_f = parseFloat(result - result * salePer).toFixed(2);
            document.getElementById("goodsprice").innerText = result_f;
          }
        else {
          let result_f = result.toFixed(2).toString().replace(/\./g, ",");
          document.getElementById("goodsprice").innerText = result_f;
        }
        let pricesum = document.querySelectorAll(".cart-item-price span, #delprice"),
        result2 = Array.from(pricesum).reduce(
          (sum, spanElm) => sum + parseFloat(spanElm.textContent.replace(",", ".")),
          0
        );
        if (document.getElementById("codePrice"))
          if (
            0 ==
            document.getElementById("codePrice").getAttribute("data-percentage")
          ) {
            let result2_f = (result2 - codePriceN)
              .toFixed(2)
              .toString()
              .replace(/\./g, ",");
            document.getElementById("sumprice").innerText = result2_f;
          } else {
            let salePer =
              0.01 * document.getElementById("codePrice").dataset.percentage;
            document.getElementById("codePrice").innerHTML = parseFloat(
              result2 * salePer
            ).toFixed(2);
            let result2_f = parseFloat(result2 - result2 * salePer).toFixed(2);
            document.getElementById("sumprice").innerText = result2_f;
          }
        else {
          let result2_f = result2.toFixed(2).toString().replace(/\./g, ",");
          document.getElementById("sumprice").innerText = result2_f;
        }
        if (document.getElementById("cartFreeShipping")) {
          let shipping = document.getElementById("cartFreeShipping"),
            shippingLeft =
              parseFloat(shipping.dataset.price) -
              parseFloat(
                document
                  .getElementById("goodsprice")
                  .innerText.replace(/,/g, ".")
              );
          shipping.innerHTML =
            shippingLeft <= 0
              ? "Dopravu máte zdarma"
              : "Nakupte ještě za " +
                shippingLeft +
                " Kč a máte dopravu zdarma";
        }
      };
    input.addEventListener("change", calcEvent), calcEvent.call(input);
  }
  function recountCart() {
    let inputs = document.querySelectorAll(".cart-item-stepper .num_items");
    for (let i = 0; i < inputs.length; i++) {
      addInputListener(inputs[i]);
    }
  }
  function recountDeliveryCart() {
    var elms = document.querySelectorAll(".cart-table-shipping-item");
    function deliveryCart() {
      let pricedel = document.querySelectorAll(
          ".cart-table-shipping-item input:checked ~ .cart-table-shipping-price span"
        ),
        deliveryprice = Array.from(pricedel).reduce(
          (sum, spanElm) => sum + Number(spanElm.textContent),
          0
        );
      var delp = deliveryprice.toFixed(2);
      document.getElementById("delprice").innerText = delp;
      var pricecart2 = (
        deliveryprice +
        parseFloat(
          document.getElementById("goodsprice").innerText.replace(/,/g, ".")
        )
      ).toFixed(2);
      document.getElementById("sumprice").innerText = pricecart2;
    }
    for (var ia = 0; ia < elms.length; ia++)
      elms[ia].addEventListener("click", deliveryCart, !1);
  }
  if (
    (recountCart(),
    recountDeliveryCart(),
    document.getElementById("cart-form-user"))
  ) {
    function toggleReg() {
      document
        .getElementById("cart-register-password")
        .toggleAttribute("required"),
        document
          .getElementById("cart-register-password")
          .toggleAttribute("disabled");
    }
    (document.getElementById("cart-register").onclick = function () {
      toggleReg();
    }),
      document.getElementById("cart-fa-address") &&
        (document.getElementById("cart-fa-address").onclick = function () {
          for (
            var e = document.querySelectorAll(
                "#cart-fa-address + div > .form-group:not(.--checkbox) > input:not(#cart-fa-name)"
              ),
              t = 0;
            t < e.length;
            ++t
          )
            e[t].toggleAttribute("required");
        }),
      (document.getElementById("cart-fa-company").onclick = function () {
        for (
          var e = document.querySelectorAll("#cart-fa-company + div input"),
            t = 0;
          t < e.length;
          ++t
        )
          e[t].toggleAttribute("required");
        document.getElementById("fakturacni_jmeno").toggleAttribute("required"),
          document.getElementById("dic").removeAttribute("required");
      });
  }
}
//# sourceMappingURL=maps/cart.js.map
