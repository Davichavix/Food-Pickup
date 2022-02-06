$(document).ready(() => {
  loadTitle();
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

    <p>Order items:</p>

    <section class='items'></section>

    <hr class="checkout-divider">

    <div class='total-table'>
      <table class='total'>
        <tr>
          <td id='title'>Subtotal:</td>
          <td id='sub'></td>
        </tr>
        <tr>
          <td id='title'>Tax:</td>
          <td id='tax'></td>
        </tr>
        <tr>
          <td id='title'>Total:</td>
          <td id='total'></td>
        </tr>
    </div>
      </table>
    `

    return html;
  }

  // const createOrderItems = (item) => {
  //   const html = `
  //     <table class='items'>
  //       <tr>
  //         Order items:
  //       </tr>
  //     </table>
  //   `;

  //   return html;
  // }


  const renderOrder = (order) => {

    const newOrder = creatOrder(order['order'][0]);
    const container = $('.checkout-table');
    container.append(newOrder);
  }

  const renderItems = (items) => {
    let subtotal = 0;
    let tax = 0;
    let total = 0;

    for (const item of items['items']) {
      console.log(item);
      console.log(item['name']);
      // const orderItem = createOrderItems(item);
      const container = $('.items')
      container.append(`<p style='text-indent: 50px;line-height: 1.5;'>${item['name']} x${item['qty']}</p>`);
      subtotal += item['price'] * item['qty'];
    }

    tax = Math.round(subtotal * 0.05 * 100) / 100;
    total = subtotal + tax;

    $('#sub').text(`$${subtotal}`);
    $('#tax').text(`$${tax}`);
    $('#total').text(`$${total}`);
  }

  const createTotal = () => {
    const html = `
      <hr class="checkout-divider">

      <table>
        <tr>
          <td>Subtotal:</td>
          <td id='sub'></td>
        </tr>
        <tr>
          <td>Tax:</td>
          <td id='tax'></td>
        </tr>
        <tr>
          <td>Total:</td>
          <td id='total'></td>
        </tr>
      </table>
    `
  };

  const loadOrders = () => {
    // console.log(window.location.pathname);
    const path =window.location.pathname;
    // const user_id = path.split('/')[2];
    const order_id = path.split('/')[3];

    $.get(`/api/orders/details/${order_id}`).then((res) => {
      // console.log(res);

      renderOrder(res);

      $.get(`/api/orders/items/${order_id}`).then((res) => {
        // console.log(res);
        renderItems(res);
      });


    });


  }

const loadTitle = () => {
  const path =window.location.pathname;
  const order_id = path.split('/')[3];

  createTile(order_id);
}

