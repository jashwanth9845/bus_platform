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
   git clone https://github.com/jashwanth9845/bus_platform.git

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

`How to call API`

1)ticket booking

post request -> http://localhost:5000/api/bookings/createbookings

sending request data using json ->
{
"bookings": [
{
"customer_name": "John Doe",
"seat_number": 5,
"bus_id":"2558512f-cad5-47c2-98a2-78902e7570a3"
},{
"customer_name": "John Doe",
"seat_number": 6,
"bus_id":"2558512f-cad5-47c2-98a2-78902e7570a3"
}
]
}

2)ticket fetching

GET request -> http://localhost:5000/api/bookings/getbookings?booking_date=2023-10-01

available options to get
->customer_name
->seat_number
->booking_date

3. bus route create

post request -> http://localhost:5000/api/busroutes/createbusroutes

sendin request data using json ->
{
"provider_id":"139866d5-8335-4a2c-b94f-f96b119c431e",
"source_city": "Bangalore",
"destination_city": "Hubli",
"date_of_journey": "2023-10-16",
"departure_time": "08:00:00",
"arrival_time": "14:00:00",
"fare": 500.00,
"seats_available": 50
}

4. bus route fetching

GET request -> http://localhost:5000/api/busroutes/getbusroutes?source_city=Bangalore&destination_city=Hubli&date_of_journey=2023-10-15

5. providers creating (redbus,abbibus)

POST request -> http://localhost:5000/api/providers/createproviders

sending REquestion using json ->
{
"name":"abbibus"  
}

6. fetching avaiable providers

GET request http://localhost:5000/api/providers/getproviders

7. cancel booking

POST request -> http://localhost:5000/api/bookings/8e3777fe-8413-4ecb-9814-55d674b4b06a/cancel

where 8e3777fe-8413-4ecb-9814-55d674b4b06a is the id of the booking
