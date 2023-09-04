# My Social Network API

[Walkthrough Video](https://drive.google.com/file/d/1FfFFYJheWD2tk9HWz4Ra5fbUFJvjF424/view)

## Description

Welcome to the ecommerce backend application. This application uses Object-relational mapping to create and manage sql tables for the backend of an ecommerce.
This project is built for people who want to manage their ecommerce business, it let's you easily receive, create, update and delete products, categories and product tags.
I learned how to use object-relational mapping (ORM) to write the schemas for tables and to connect those in a express application.
Use this app to manage your ecommerce!

## Installation

Install the following dependencies: mongoose, express and date-fns. 

## Usage


Firstly, configure your .env file, with your user, password and the database name. Then you have to run the schema.sql file inside the db folder to create the ecommerce_db. Next step would be to seed the database with running 'node seeds/index.js'. 
After doing that, run server.js, which will run the server on localhost:3001. 
In the thunderclient, postman or insomnia, test the given routes:

Get request, get by id, put to update, post to create and delete on the categories, products and tags.

Enjoy managing your ecommmerce!

## Credits

N/A

## License

This is a MIT licensed product.


## Tests

N/A
