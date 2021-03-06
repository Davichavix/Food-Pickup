require("dotenv").config();

const dbParams = require("../lib/db");
const { Pool } = require("pg");
const format = require("pg-format");

const db = new Pool(dbParams);

const getUserByEmail = (email) => {
  const queryString = `SELECT * FROM users WHERE email = $1;`;

  return db
    .query(queryString, [email])
    .then((res) => {
      if (res.rows.length < 1) {
        return null;
      }
      return res.rows[0];
    })
    .catch((err) => console.log(err));
};

const getUserById = (id) => {
  const queryString = `SELECT * FROM users WHERE id = $1;`;

  return db
    .query(queryString, [id])
    .then((res) => {
      if (res.rows.length < 1) {
        return null;
      }
      return res.rows[0];
    })
    .catch((err) => console.log(err));
};

const addUser = (user) => {
  const queryString = `
  INSERT INTO users (
    first_name, last_name, phone_number, email, password
  ) VALUES (
    $1, $2, $3, $4, $5
  ) RETURNING *;
  `;
  const values = [
    user.firstName,
    user.lastName,
    user.phoneNumber,
    user.email,
    user.password,
  ];

  return db
    .query(queryString, values)
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => console.log(err));
};

const getAllOrdersByUserId = (user_id, limit = 10) => {
  const queryString = `
  SELECT orders.* , CONCAT(users.first_name, ' ', users.last_name) as user_name,
  CONCAT('Order No. ', orders.id) as order_number,
  CASE
    WHEN orders.ready_at IS NULL THEN 'Unconfirmed'
    ELSE 'Confirmed'
  END as status
  FROM orders
  JOIN users ON users.id = orders.user_id
  WHERE user_id = $1
  ORDER BY orders.id ASC;
  `;

  return db
    .query(queryString, [user_id])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log(err));
};

const getOrderDetailsByOrderId = (order_id) => {
  const queryString = `
  SELECT CONCAT(users.first_name, ' ', users.last_name) as user_name,
  CONCAT('Order No. ', orders.id) as order_number,
  CASE
    WHEN orders.ready_at IS NULL AND completed = TRUE THEN 'Cancelled'
    WHEN orders.ready_at IS NULL THEN 'Unconfirmed'
    ELSE 'Confirmed'
  END as status,
  users.phone_number,
  users.email,
  orders.created_at,
  orders.ready_at
  FROM orders
  JOIN users ON users.id = orders.user_id
  WHERE orders.id = $1;
  `;

  return db
    .query(queryString, [order_id])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log(err));
};

const getAllOrdersOwner = () => {
  const queryString = `
  SELECT orders.* FROM orders
  ORDER BY created_at DESC;
  `;

  return db
    .query(queryString)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log(err));
};

const getAllOpenOrders = () => {
  const queryString = `
  SELECT orders.*,
  CONCAT(users.first_name, ' ', users.last_name) as user_name,
  CONCAT('Order No. ', orders.id) as order_number,
  CASE
    WHEN orders.ready_at IS NULL THEN 'Unconfirmed'
    ELSE 'Confirmed'
  END as status
  FROM orders
  JOIN users ON users.id = orders.user_id
  WHERE completed = FALSE
  ORDER BY created_at ASC;
  `;
  return db
    .query(queryString)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log(err));
};

const getAllHistoryOrders = () => {
  const queryString = `
  SELECT orders.*,
  CONCAT(users.first_name, ' ', users.last_name) as user_name,
  CONCAT('Order No. ', orders.id) as order_number,
  CASE
    WHEN orders.ready_at IS NULL AND completed = TRUE THEN 'Cancelled'
    WHEN completed = TRUE THEN 'Completed'
  END as status
  FROM orders
  JOIN users ON users.id = orders.user_id
  WHERE completed = TRUE
  ORDER BY created_at ASC;
  `;
  return db
    .query(queryString)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log(err));
};

const getAllItemsByOrderId = (orderId) => {
  const queryString = `
  SELECT items.*, qty FROM items
  JOIN order_items ON order_items.item_id = items.id
  WHERE order_id = $1;
  `;

  return db
    .query(queryString, [orderId])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log(err));
};

const addOrder = (order) => {
  const queryString = `
  INSERT INTO orders (
  user_id, created_at
  ) VALUES (
    $1, $2
  ) RETURNING *`;

  const values = [order.userId, order.createdAt];

  return db
    .query(queryString, values)
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => console.log(err));
};

const addItemsToOrder = (orderId, orderItems) => {
  const queryString = `
  INSERT INTO order_items (
    order_id, item_id, qty
  ) VALUES %L
   RETURNING *;`;

  const values = orderItems.map((item) => {
    return [orderId, item.id, item.qty];
  });

  return db
    .query(format(queryString, values))
    .then((res) => {
      return { ...res.rows, orderId };
    })
    .catch((err) => console.log(err));
};

const updateReadyTimeById = (order_id, time) => {
  const queryString = `
  UPDATE orders
  SET ready_at = $2,
  completed = true
  WHERE id = $1
  RETURNING *;`;

  const values = [order_id, `${time}`];
  return db
    .query(queryString, values)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log(err));
};

const cancelOrder = (order_id) => {
  const queryString = `
  UPDATE orders
  SET completed = true
  WHERE id = $1
  RETURNING *;`;

  const values = [order_id];
  return db
    .query(queryString, values)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log(err));
};
const completeOrder = (order_id) => {
  const queryString = `
  UPDATE orders
  SET completed = $1
  WHERE id = $2
  RETURNING *`;

  return db
    .query(queryString, [true, order_id])
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => console.log(err));
};

const getAllItems = () => {
  const queryString = `
  SELECT * FROM items;`;

  return db
    .query(queryString)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log(err));
};

const getItemById = (id) => {
  const queryString = `
  SELECT * FROM items
  WHERE id = $1;`;

  return db
    .query(queryString, [id])
    .then((res) => {
      if (res.rows.length < 1) {
        return null;
      }
      return res.rows[0];
    })
    .catch((err) => console.log(err));
};

const getAllItemsByOrderIdandName = (orderId) => {
  const queryString = `
  SELECT items.*, qty, CONCAT(users.first_name, ' ', users.last_name) as user_name FROM items
  JOIN order_items ON order_items.item_id = items.id
  JOIN orders ON orders.id = order_items.order_id
  JOIN users ON users.id = orders.user_id
  WHERE order_id = $1;
  `;

  return db
    .query(queryString, [orderId])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getUserByEmail, //
  getUserById, //
  getAllOrdersByUserId, //
  getAllOrdersOwner, //
  getAllOpenOrders,
  getAllHistoryOrders, //
  getAllItemsByOrderId, //
  getAllItems, //
  getItemById, //
  addUser, //
  addOrder, //
  addItemsToOrder, //
  updateReadyTimeById, //
  completeOrder, //
  getOrderDetailsByOrderId,
  cancelOrder,
  getAllItemsByOrderIdandName,
};
