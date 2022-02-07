$(() => {
  const items = JSON.parse(localStorage.getItem("items"));
  const userId = 1; //add cookie session here

  $.ajax({
    url: `/api/users/id/${userId}`,
    type: "GET",
  }).then((user) => {
    const name = `${user.first_name} ${user.last_name}`;
    const { phone_number, email } = user;
    const totalDetails = JSON.parse(localStorage.getItem("totalDetails"));
    const { subTotal, tax, total } = totalDetails;
    $("#name").text(name);
    $("#phone").text(formatPhone(phone_number.toString()));
    $("#email").text(email);

    const $orderDetails = $("table.order-details");
    const orderDetails = Object.values(items).map((item) => {
      return `
      <tr>
      <td>${item.name}</td>
      <td>x ${item.qty}</td>
      </tr>
      `;
    });

    $orderDetails.append(orderDetails);
    $("#subtotal").text(`$${subTotal.toFixed(2)}`);
    $("#tax").text(`$${tax.toFixed(2)}`);
    $("#total").text(`$${total.toFixed(2)}`);

    $("button.place-order").on("click", function (e) {
      e.preventDefault();

      const userId = 1; //add userId from cookie session
      const itemsArray = Object.values(items);
      const orderItems = itemsArray.map((item) => {
        return {
          id: item.id,
          qty: item.qty,
        };
      });

      $.ajax({
        url: "/api/orders",
        data: { userId, orderItems },
        type: "POST",
      })
        .then((res) => {
          const { orderId } = res;
          localStorage.clear();
          document.location.href = "/checkout/complete";
          return $.get(`/twilio/users/${orderId}`)
        })
        .catch((err) => console.log(err));
    });
  });

  $("button.checkout-button.back").on("click", function (e) {
    e.preventDefault();
    history.back();
  });
});
