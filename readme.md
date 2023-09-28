# Bus Ticket Booking Platform

Welcome to the Bus Ticket Booking Platform project! This platform allows private bus operators to manage their bus routes, bookings, and cancellations efficiently.

## Prerequisites

Before you start working on this project, make sure you have the following prerequisites installed on your system:

1. **Node.js:** Make sure you have Node.js installed. You can download it from [https://nodejs.org/](https://nodejs.org/).

2. **npm (Node Package Manager):** npm comes bundled with Node.js. You can verify its installation by running `npm -v` in your terminal.

3. **XAMPP (or any other MySQL server):** You'll need a MySQL server to host your database. XAMPP is a popular choice for local development. You can download XAMPP from [https://www.apachefriends.org/](https://www.apachefriends.org/).

## Database Setup

Before starting the project, please follow these steps to set up the database:

1. Launch XAMPP and start the Apache and MySQL services.

2. Open phpMyAdmin by visiting `http://localhost/phpmyadmin/` in your web browser.

3. Create a new database called `bus_operator_platform` in phpMyAdmin.

## Getting Started

Follow these steps to get started with the Bus Ticket Booking Platform:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/bus-ticket-booking-platform.git

   ```

2. Navigate to the project directory:

   `cd bus-ticket-booking-platform`

3.Install the project dependencies using npm:

`npm install`

4.Start the development server using nodemon:

`npm start`

`Project Structure`

The project is structured as follows:

controllers/: Contains controller functions for handling API requests.

models/: Defines Sequelize models for your database tables.

routes/: Defines API routes and their associated controller methods.

config/: Contains database configuration and other project configurations.

index.js: The main entry point of the application.
