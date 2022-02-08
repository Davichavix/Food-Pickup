$(document).ready(() => {
  loadTitle();
  loadOrders();

  $('.confirm-button').click((e) => {
    e.preventDefault();

      //get formated pickup time
      const prepareTime = $('#lang').find(':selected').val() * 60000;
      const current = Date.now();
      const timestamp = current + prepareTime;
      const time = getPickUpTime(timestamp);

    if (!prepareTime) {
      alert('Please select a time. ');
    } else {
      const path =window.location.pathname;
      const id = path.split('/')[2];

      $.ajax({
        url: `/api/orders/${id}`,
        data: {id, time},
        type: "POST",
        success: function() {
        }
      }).then((res) => {
        document.location.href = `/admin/history/${id}`;
        return $.get(`/twilio/admin/${id}`)
      })
    }
  })


  $('.cancel-button').click((e) => {
    e.preventDefault();

    const path =window.location.pathname;
    const id = path.split('/')[2];

    $.ajax({
      url: `/api/orders/cancel/${id}`,
      data: {id},
      type: "POST",
    }).then((res) => {
      document.location.href = `/admin/history/${id}`;
    })
  })
});

  //helper funtions
  const createTile = (order_id) => {
    $('.title').text(`Order No.${order_id}`)
  }

  const creatOrder = (orderData) => {
    const createdAt = (orderData.created_at.slice(0, 19)).replace('T', ' ');
    let placedAt = '';
    console.log(orderData.ready_at);

    if (orderData.ready_at === null) {
      placedAt = 'Unconfirmed';
    } else {
      text =
      placedAt = (orderData.ready_at.slice(0, 19)).replace('T', ' ');
    }
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
              <td>${createdAt}</td>
            </tr>
            <tr>
              <td>Pickup at:</td>
              <td>${placedAt}</td>
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

  const renderOrder = (order) => {

    const newOrder = creatOrder(order['order'][0]);
    const container = $('.order-table');
    container.append(newOrder);
  }

  const renderItems = (items) => {
    const all = items['res'];
    let subtotal = 0;
    let tax = 0;
    let total = 0;

    for (const item of all) {
      const container = $('.items')
      container.append(`<p style='text-indent: 50px;line-height: 1.5;'>${item['name']} x${item['qty']}</p>`);
      subtotal += item['price'] * item['qty'];
    }
    subtotal = Math.round(subtotal * 100) / 100;
    tax = Math.round(subtotal * 0.05 * 100) / 100;
    total = Math.round((subtotal + tax) * 100) / 100;

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
    const path =window.location.pathname;
    const order_id = path.split('/')[2];

    $.get(`/api/orders/details/${order_id}`).then((res) => {

      renderOrder(res);

      $.get(`/api/orders/items/${order_id}`).then((res) => {
        renderItems({res});
      });
    });


  }

const loadTitle = () => {
  const path =window.location.pathname;
  const order_id = path.split('/')[2];

  createTile(order_id);
}

const getPickUpTime = (time) => {
  const myDate = new Date(time);
  const formatedTime = myDate.getFullYear() + '-' +('0' + (myDate.getMonth()+1)).slice(-2)+ '-' +  ('0' + myDate.getDate()).slice(-2) + ' '+('0' + myDate.getHours()).slice(-2)+ ':'+('0' + (myDate.getMinutes())).slice(-2)+ ':'+('0' + myDate.getSeconds()).slice(-2);

  return formatedTime;
}
