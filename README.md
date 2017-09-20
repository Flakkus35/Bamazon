# Bamazon

A node CLI app that allows user to order and manage stock in a virtual store.

To run the customer oriented version type **node bamazonCustomer.js** into git bash/terminal.

To run the manager oriented version type **node bamazonManager.js** into git bash/terminal.

Make sure to install the neccessary NPM packages using **npm i** into the bash/terminal.

## Bamazon for Customers

-Running the customer version you will be presented with a list of stock will be asked 2 questions.

-The first question asks for a valid id (far left number next to each item).

-The second question asks for a number of units to order.

  *Note: If you order a greater number than you have in stock it will respond with 'Insufficient Quanity' and send you back*
  
![GitHub Logo](/screenshots/customer_order.png)

-After confirming the number of units to order the app will update the database and send you back to the beginning to order again.

![GitHub Logo](/screenshots/order_complete.png)

## Bamazon for Managers

-Running the manager version will display the following options to choose from: 

![GitHub Logo](/screenshots/manager_menu.png)

1. Choosing 'View Products for Sale' will display the entire list of products available in the store.

![GitHub Logo](/screenshots/manager_view_products.png)

2. Choosing 'View Low Inventory' will display all products that have an inventory of less than 5.

![GitHub Logo](/screenshots/manager_view_low.png)

3. Choosing 'Add to Inventory' will ask the user for an id and number of units to add to that product.

![GitHub Logo](/screenshots/manager_add_start.png)

4. Choosing 'Add New Product' will ask 4 questions to fill out the data entry for a new product.

![GitHub Logo](/screenshots/manager_addprod_start.png)
