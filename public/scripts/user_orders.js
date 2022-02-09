$(document).ready(() => {

  loadOrders();

});

  //helper funtions
  const creatOrder = (orderData) => {
    const createdAt = formatTime(orderData.created_at);
    const html = `
      <tbody>
        <tr  class="row">
          <td>
            ${orderData.order_number}
          </td>
          <td>
            ${orderData.user_name}
          </td>
          <td>
            ${createdAt}
          </td>
          <td>
            ${orderData.status}
          </td>
          <td>
            <a href="/orders/${orderData.user_id}/${orderData.id}"><button type="button" class="btn-trans details-button ">Details</button></a>
          </td>
        </tr>
      </tbody>
    `
    return html;
  }

  const renderOrders = (orders) => {

    if(orders['orders'].length===0){
      console.log("here");
      const container = $('main');
      container.append(`<p>You have no orders. View our <a href='/'>Menu</a> & get a bubble tea!</p>`);
    }

    for (const order of orders['orders']) {
      const newOrder = creatOrder(order);
      const container = $('.orders-content');
      container.prepend(newOrder);
    }

  }

  const loadOrders = () => {
    const path =window.location.pathname;
    const user_id = path.split('/')[2];

    $.get(`/api/orders/user/${user_id}`).then((res) => {
      renderOrders(res);
    });
  }


  const formatTime = (time) => {
    const myDate = new Date(time);
    const formatedTime = myDate.getFullYear() + '-' +('0' + (myDate.getMonth()+1)).slice(-2)+ '-' +  ('0' + myDate.getDate()).slice(-2) + ' '+('0' + myDate.getHours()).slice(-2)+ ':'+('0' + (myDate.getMinutes())).slice(-2)+ ':'+('0' + myDate.getSeconds()).slice(-2);

    return formatedTime;
  }
