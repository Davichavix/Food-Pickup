Food Pickup Application
=========

## Project Scope

Food Pickup is a restaurant pickup app that allows user to browse an online menu and add items to a cart for later pickup. Utilizing the twilio API the restaurant is then sent an SMS with the user's order. The restaurant is then able to select a time the order will be ready. The user is then notified via SMS their order # and pickup time.

## App Features

### Front Page
- Users are able to add menu items to cart which are then transferred to cart page
- Cart quantity increments based on number of items selected
- Google Maps API showing restaurant location

!["screenshot of BubbleTea Shop Front Page"](https://github.com/Davichavix/Food-Delivery/blob/features/README/docs/BubbleTea_Front_Page.png?raw=true)

### Cart
- Price totals are automatically calculated per line item as well as overall total
- Users can remove entire items or modify the quantity of each item
- Total prices are recalculated automatically on user inputs

!["screenshot of BubbleTea Shopping Cart"](https://github.com/Davichavix/Food-Delivery/blob/features/README/docs/BubbleTea_Cart.png?raw=true)

### Twilio Messaging
- When a user places their order an SMS is sent to the restaurant with the user's name, order #, and items
- User is sent an SMS when their order is complete and ready for pickup

!["screenshot of pickup order SMS Notifications"](https://github.com/Davichavix/Food-Delivery/blob/features/README/docs/SMS_Screenshot.jpg?raw=true)

### Order History
- Orders are stored in table and displayed to user and marked as open, complete, cancelled
- Restaurant is able to select from list of open orders and select pickup time

!["screenshot of order history"](https://github.com/Davichavix/Food-Delivery/blob/features/README/docs/Open_orders.png?raw=true)

## Project Structure

```
├── public
│   ├── index.html
│   ├── scripts
│   │   ├── admin_confirm.js
│   │   ├── admin_history.js
│   │   ├── admin_id.js
│   │   ├── admin_open.js
│   │   ├── app.js
│   │   ├── cart.js
│   │   ├── checkout-complete.js
│   │   ├── checkout.js
│   │   ├── clientIndex.js
│   │   ├── helpers.js
│   │   ├── network.js
│   │   ├── user_orders_id.js
│   │   └── user_orders.js
│   └── styles
├── sass
├── routes
│   ├── apiRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   ├── siginRoutes.js
│   ├── twilioRoutes.js
└── views
```


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Tips

- Use the `npm run db:reset` command each time there is a change to the database schema or seeds. 
  - It runs through each of the files, in order, and executes them against the database. 
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- ejs
- express
- morgan
- sass
- twilio
