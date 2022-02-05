$(document).ready(() => {

  loadOrders();

});

  //helper funtions
  const creatOrder = (orderData) => {
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
            ${orderData.created_at}
          </td>
          <td>
            ${orderData.status}
          </td>
          <td>
            <a href="/orders/items/${orderData.id}}"><button type="button" class="btn-trans details-button ">Details</button></a>
          </td>
        </tr>
      </tbody>
    `

    return html;
  }

  const renderOrders = (orders) => {
    for (const order of orders['orders']) {
      const newOrder = creatOrder(order);
      const container = $('.orders-content');
      container.prepend(newOrder);
    }

  }

  const loadOrders = () => {
    $.get(`/api/orders/user/2`).then((res) => {
      console.log(res);
      renderOrders(res);
    });
  }
