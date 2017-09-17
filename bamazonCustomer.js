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
})

connection.query('SELECT * FROM products', function(err,res) {
	if (err) throw err;
	for (var i = 0; i < res.length; i++) {
		console.log(res[i].id + ' | ' + res[i].product_name + ' | ' + res[i].department_name + ' | ' + res[i].price + ' | ' + res[i].stock_quantity);
	}
	promptUser();
});

function promptUser() {
	inquirer.prompt([
	{
		name: 'id',
		message: 'What is the id of the product you wish to order?',
		validate: function(input) {
			if (input > 10 || input < 1 || isNaN(input) == true) {
				console.log('\nEnter a valid id');
			} else {return true;}
		}
	},
	{
		name: 'quantity',
		message: 'How many units would you like to order?',
		validate: function(input) {
			if (isNaN(input) == true) {
				console.log('\nEnter a number');
			} else {return true;}
		}
	}
	]).then(function(answers) {
		connection.query('SELECT * from products WHERE ?', [{id: answers.id}], function(err,res) {
			if (err) throw err;
			if (answers.quantity > res[0].stock_quantity) {
				console.log('Insufficient quantity!');
				promptUser();
			}
		});
	});
}
