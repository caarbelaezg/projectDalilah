CREATE DATABASE dalila_restoh_carlos;
CREATE USER 'nombre_usuario'@'localhost' IDENTIFIED BY 'tu_contrasena';
GRANT ALL PRIVILEGES ON * . * TO 'nombre_usuario'@'localhost';
FLUSH PRIVILEGES;
USE dalila_restoh_carlos;
INSERT INTO users (user_name,user_email,user_full_name, user_phone,user_address, user_password,user_rol) 
values ('caarbelaezg','caarbelaezg@gmail.com','Carlos Arbeláez','+573215092010','calle siempreviva 123', '1234', 1 );

INSERT INTO users (user_name,user_email,user_full_name, user_phone,user_address, user_password,user_rol) 
values ('amarbelaezg','amarbelaezg@gmail.com','Ana Arbeláez','+573146838828','calle siempreviva 123', '1234', 0 );

INSERT INTO products (product_name, product_price, product_stock) 
values ('Bagel de salmón',425,20);
INSERT INTO products (product_name, product_price, product_stock) 
values ('Hamburgesa clásica',350,50);
INSERT INTO products (product_name, product_price, product_stock) 
values ('Sandwich veggie',310,15);
INSERT INTO products (product_name, product_price, product_stock) 
values ('Focaccia',300,10);
