$(document).ready(() => {
  loadOrders();

});

  //helper funtions
  const createTile = (order_id) => {
    $('.title').text(`Order No.${order_id}`)
  }

  const creatOrder = (orderData) => {
    const html = `
    <tbody>
      <tr>
          <td>Order status:</td>
          <td>${orderData.status}</td>
      </tr>
      <tr>
        <td>Name:</td>
        <td>${orderData.user_name}</td>
      </tr>
      <tr>
          <td>Phone Number:</td>
          <td>${orderData.phone_number}</td>
      </tr>
      <tr>
        <td>Email:</td>
        <td>${orderData.email}</td>
      </tr>
      <tr>
        <td>Placed at:</td>
        <td>${orderData.created_at}</td>
      </tr>
      <tr>
        <td>Pickup at:</td>
        <td>${orderData.ready_at}</td>
      </tr>
      <tr>
        <td>Order details:</td>
          <table class="order-details">
            <tr>
              <td>Bubble Tea</td>
              <td>x 2</td>
            </tr>
            <tr>
              <td>Mango Slush</td>
              <td>  x 1</td>
            </tr>
        </table>
      </tr>
      <hr class="checkout-divider">
      <div class="checkout-price">
        <table>
        <tr>
          <td>Subtotal:</td>
          <td>$100</td>
        </tr>
        <tr>
          <td>Tax:</td>
          <td>$5</td>
        </tr>
        <tr>
          <td>Total:</td>
          <td>$105</td>
        </tr>
        </table>
      </div>
    </tbody>
    `

    return html;
  }


  const renderOrderDetail = (order) => {

    const newOrder = creatOrder(order['orders']);
    const container = $('.table-contesnt');
    container.prepend(newOrder);

  }

  const loadOrders = () => {
    // console.log(window.location.pathname);
    const path =window.location.pathname;
    const user_id = path.split('/')[2];
    // const order_id = path.split('/')[3];

    $.get(`/api/orders/user/${user_id}`).then((res) => {
      console.log(res);
      renderOrders(res);
    });

    // $.$get(`/api/orders/user/`)
  }

const loadTitle = () => {
  const path =window.location.pathname;
  const order_id = path.split('/')[3];

  createTile(order_id);
}
