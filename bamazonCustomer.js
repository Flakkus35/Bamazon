var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'bamazonDB'
});

connection.connect(function(err) {
	if (err) throw err;
	console.log('Connected as id ' + connection.threadId + '\n');
	listItems();
});

// List out all stock info
function listItems() {
	connection.query('SELECT * FROM products', function(err,res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.log(res[i].id + ' | ' + res[i].product_name + ' | ' + res[i].department_name + ' | ' + res[i].price + ' | ' + res[i].stock_quantity);
		}
		console.log('----------------------------------------');
		// Runs function after diplaying all items
		promptUser();
	});
}

// Prompts user to order items
function promptUser() {
	connection.query('SELECT * FROM products', function(err,res) {
		if (err) throw err;
		inquirer.prompt([
		{
			name: 'id',
			message: 'What is the id of the product you wish to order?',
			// Prevent user from entering invalid id
			validate: function(input) {
				if (input < 1 || input > res.length || isNaN(input) == true) {
					console.log('\nEnter a valid id');
				} else {return true;}
			}
		},
		{
			name: 'quantity',
			message: 'How many units would you like to order?',
			// Prevent user from entering invalid id
			validate: function(input) {
				if (isNaN(input) == true) {
					console.log('\nEnter a number');
				} else {return true;}
			}
		}
		]).then(function(answers) {
			connection.query('SELECT * from products WHERE ?', [{id: answers.id}], function(err,res) {
				var tmpStock = res[0].stock_quantity;
				if (err) throw err;
				if (answers.quantity > res[0].stock_quantity) {
					console.log('Insufficient quantity!');
					promptUser();
				} else {
					// Updates database with new stock value
					connection.query('UPDATE products SET ? WHERE ?', [{stock_quantity: tmpStock - answers.quantity},{id: answers.id}], function(err) {
						if (err) throw err;
						console.log("Order has been placed!\n" + '----------------------');
						listItems();
					});
				}
			});
		});
	});
	
}
