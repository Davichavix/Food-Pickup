$(document).ready(() => {
  // loadTitle();
  loadOrders();

});

  //helper funtions
  const createTile = (order_id) => {
    $('.title').text(`Order No.${order_id}`)
  }

  const creatOrder = (orderData) => {
    const html = `
    <table>
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

      </tbody>
    </table>
    `

    return html;
  }

  const createOrderItems = () => {
    const html = `
      <table class='items'>
        <tr>
          Order items:
        </tr>
      </table>

      <hr class="checkout-divider">

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
    `;

    return html;
  }


  const renderOrder = (order) => {

    const newOrder = creatOrder(order['order'][0]);
    //console.log(newOrder);
    const container = $('.checkout-table');
    container.append(newOrder);
  }

  const renderItems = () => {
    const orderItems = createOrderItems();
    const container = $('.checkout-table');
    container.append(orderItems);
  }

  const loadOrders = () => {
    // console.log(window.location.pathname);
    const path =window.location.pathname;
    // const user_id = path.split('/')[2];
    const order_id = path.split('/')[3];

    $.get(`/api/orders/details/${order_id}`).then((res) => {
      // console.log(res);
      renderOrder(res);
      renderItems();
    });

    // $.$get(`/api/orders/user/`)
  }

const loadTitle = () => {
  const path =window.location.pathname;
  const order_id = path.split('/')[3];

  createTile(order_id);
}
