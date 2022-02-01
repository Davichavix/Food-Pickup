INSERT INTO users (
  name, phone_number, email
) VALUES (
  'David Chan', '123456789', '123@gmail.com'
)
INSERT INTO users (
  name, phone_number, email
) VALUES (
  'Siyi Xie', '987654321', '456@gmail.com'
)
INSERT INTO users (
  name, phone_number, email
) VALUES (
  'Jacky Tchen', '567894321', '789@gmail.com'
)

INSERT INTO restaurants (
  name, open_time, close_time, street, city, province, postal_code, country
) VALUES (
  'Bubble Shop', '10:00:00', '22:00:00', '10025 102A Ave', 'Edmonton', 'Alberta', 'T5J 2Z2', 'Canada'
)

INSERT INTO menus (
  name, restaurant_id
) VALUES (
  'Bubble Shop Menu', 1
)

INSERT INTO items (
  name, image_url, description, price, menu_id
) VALUES (
  '2 Guys 1 Girl', 'https://images.squarespace-cdn.com/content/v1/5edfb8e7559cd9129deae815/1629474098758-PX9OU33P0MIPXHMDD4JL/2+Guys.png', 'Signature bubble tea with 3 toppings: bubbles, pudding and grass jelly', 6.99, 1
)


