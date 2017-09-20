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
	displayOptions();
});

function displayOptions() {
	inquirer.prompt([
		{
			name: 'options',
			type: 'list',
			message: 'Choose an operation',	
			choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
		}
	]).then(function(choice) {
		switch(choice.options) {
			case 'View Products for Sale':
				viewProducts();
				break;
			case 'View Low Inventory':
				viewInventory();
				break;
			case 'Add to Inventory':
				addInventory();
				break;
			case 'Add New Product':
				addProduct();
				break;
		}
	});
}

function viewProducts() {
	connection.query('SELECT * FROM products', function(err,res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.log(res[i].id + ' | ' + res[i].product_name + ' | ' + res[i].department_name + ' | ' + res[i].price + ' | ' + res[i].stock_quantity);
		}
		console.log('-------------------');
		displayOptions();
	});
}

function viewInventory() {
	connection.query('SELECT * FROM products', function(err,res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			if (res[i].stock_quantity < 5) {
				console.log(res[i].id + ' | ' + res[i].product_name + ' | ' + res[i].department_name + ' | ' + res[i].price + ' | ' + res[i].stock_quantity);
			}
		}
		console.log('-------------------');
		displayOptions();
	});
}

function addInventory() {
	connection.query('SELECT * FROM products', function(err,res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.log(res[i].id + ' | ' + res[i].product_name + ' | ' + res[i].department_name + ' | ' + res[i].price + ' | ' + res[i].stock_quantity);
		}
		console.log('-------------------');
		inquirer.prompt([
			{	
				name: 'id',
				message: 'What is the id of the product you wish to add to?',
				// 
				validate: function(input) {
					if (isNaN(input) == true) {
						console.log('\nEnter a valid id');
					} else if (input < 1 || input > res.length) {
						console.log('\nEnter a valid id');
					} else {return true;}
				}
			},
			{
				name: 'quantity',
				message: 'How many units would you like to add?',
				validate: function(input) {
					if (isNaN(input) == true) {
						console.log('\nEnter a number');
					} else {return true;}
				}
			}
		]).then(function(choices) {
			var tmpStock = res[choices.id - 1].stock_quantity;
			connection.query('UPDATE products SET ? WHERE ?', [{stock_quantity: tmpStock + parseInt(choices.quantity)},{id: choices.id}], function(err) {
				if (err) throw err;
				console.log("Inventory has been added!\n" + '----------------------');
				displayOptions();
			});
		});
	});
}

function addProduct() {
	inquirer.prompt([
		{	
			name: 'name',
			message: 'What is the name of the product?'
		},
		{
			name: 'department',
			message: 'What department is this product in?'
		},
		{
			name: 'price',
			message: 'What is the price of each unit?'
		},
		{
			name: 'quantity',
			message: 'How many units would you like to add?'
		}
	]).then(function(input) {
		connection.query("INSERT INTO products SET ?",
		{
			product_name: input.name,
			department_name: input.department,
			price: input.price,
			stock_quantity: input.quantity
		},
		function(err) {
			if (err) throw err;
			console.log('New product has been added!');
			displayOptions();
		}
		);
	});
}
