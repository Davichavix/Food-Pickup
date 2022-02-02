require("dotenv").config({ path: "../.env" });

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

exports.getUserByEmail = getUserByEmail;

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
exports.getUserById = getUserById;

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

exports.addUser = addUser;

const getAllOrders = (user_id, limit = 10) => {
  const queryString = `
  SELECT orders.* FROM orders
  JOIN users ON users.id = orders.user_id
  WHERE user_id = $1;
  `;

  return db
    .query(queryString, [user_id])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log(err));
};

exports.getAllOrders = getAllOrders;

const getAllItemsByOrderId = (orderId) => {
  const queryString = `
  SELECT items.* FROM items
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

exports.getAllItemsByOrderId = getAllItemsByOrderId;

const addOrder = (order) => {
  const queryString = `
  INSERT INTO orders (
  user_id, created_at
  ) VALUES (
    $1, $2
  ) RETURNING *`;

  const values = [order.userId, order.created_at];

  return db
    .query(queryString, values)
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => console.log(err));
};
exports.addOrder = addOrder;

const order = {
  userId: 1,
  created_at: "2022-02-02 21:00:00-07",
  orderItems: [
    { item_id: 1, qty: 2 },
    { item_id: 2, qty: 1 },
    { item_id: 3, qty: 4 },
    { item_id: 5, qty: 3 },
    { item_id: 6, qty: 5 },
  ],
};

const addItemsToOrder = (orderId, orderItems) => {
  const queryString = `
  INSERT INTO order_items (
    order_id, item_id, qty
  ) VALUES %L
   RETURNING *;`;

  const values = orderItems.map((item) => {
    return [orderId, item.item_id, item.qty];
  });

  return db
    .query(format(queryString, values))
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log(err));
};

exports.addItemsToOrder = addItemsToOrder;

const updateReadyTimeById = (order_id, time) => {
  const queryString = `
  UPDATE orders
  SET ready_at = $2
  WHERE id = $1
  RETURNiNG *;`;

  const values = [order_id, time];

  return db
    .query(queryString, values)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log(err));
};

updateReadyTimeById(1, "2022-02-02 18:00:00-07").then((res) =>
  console.log(res)
);
