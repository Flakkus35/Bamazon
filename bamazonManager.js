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
		displayOptions();
	});
}

function viewInventory() {

}

function addInventory() {

}

function addProduct() {

}
