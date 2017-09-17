DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(45) NULL,
	department_name VARCHAR(45) NULL,
	price VARCHAR(45) NULL,
	stock_quantity INT NULL,
	PRIMARY KEY (id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Men's Sperrys", "Men's Shoes", "$80.00", 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Women's Sperrys", "Women's Shoes", "$90.00", 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bedsheets", "Home", "$50.00", 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Suit", "Men's Suits", "$200.00", 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dress", "Women's Dresses", "$160.00", 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hat", "Accessories", "$20.00", 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Belt", "Accessories", "$30.00", 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lipstick", "Cosmetics", "$40.00", 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pillow", "Home", "$20.00", 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Plate", "China", "$70.00", 9);
