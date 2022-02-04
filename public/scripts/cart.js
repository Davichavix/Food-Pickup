
$(() => {
  const $cartItems = $(`
  <div class="col col-pro layout-inline">
  <p>Loading</p>
  </div>
  `);

  $.ajax({
    method: "GET",
    url: "/api/orders/1",
  }).then((items) => {
    const $cart = $("div.layout-inline.row.th");

    const itemRows = JSON.parse(items).map((item) => {
      const total = parseFloat(item.price * item.qty).toFixed(2);
      const html = `
      <section class="layout-inline row list">
      <div class="col col-pro layout-inline">
      <p>${item.name}</p>
      </div>

      <div class="col col-price col-numeric align-center ">
      <p>$${item.price}</p>
      </div>

      <div class="col col-qty layout-inline">
        <a href="#" class="qty qty-minus">-</a>
          <input type="numeric" value="${item.qty}" />
        <a href="#" class="qty qty-plus">+</a>
      </div>

      <div class="col col-total col-numeric">
        <p>$${total}</p>
      </div>

      <div class="col col-delete align-center">
        <button class="item-delete">
          <i class="far fa-times-circle fa-lg"></i>
        </button>
      </div>
      </section>
      `;

      return html;
    });

    $cart.after(itemRows);
    calculateTotal();

    $("a.qty-minus").on("click", function (e) {
      e.preventDefault();
      const $this = $(this);
      const $input = $this.closest("div").find("input");
      let value = parseInt($input.val());

      if (value > 1) {
        value--;
      } else {
        value = 0;
      }

      $input.val(value).trigger("change");
    });

    $("a.qty-plus").on("click", function (e) {
      e.preventDefault();
      const $this = $(this);
      const $input = $this.closest("div").find("input");
      let value = parseInt($input.val());

      if (value < 100) {
        value++;
      } else {
        value = 100;
      }

      $input.val(value).trigger("change");
    });

    $("input").on("blur change", function () {
      const input = $(this);
      const value = parseInt($(this).val());
      const $price = $(this).closest("div").siblings(".col-price").find("p");
      const $total = $(this).closest("div").siblings(".col-total").find("p");
      const price = parseFloat($price.text().split("$").join("")).toFixed(2);
      let total = parseFloat($total.text().split("$").join("")).toFixed(2);

      if (value < 0 || isNaN(value)) {
        input.val(0);
      } else if (value > 100) {
        input.val(100);
      }

      total = (Math.round(price * value * 100) / 100).toFixed(2);
      $total.text(`$${total}`).trigger("change");

      calculateTotal();
    });






  });


});
