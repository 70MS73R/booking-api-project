###Project Documentation###

This document provides comprehensive information about the RESTful API developed for the online booking app project using Express.js and Prisma. Below, you'll find details about API endpoints, request/response formats, authentication mechanisms, setup instructions for running the project locally, and additional notes for future development.

##Setting Up and Running the Project Locally##

Follow these steps to set up and run the project locally:

1. Clone the project repository from GitHub:
   git clone [https://github.com/70MS73R/booking-api-project/tree/main]

2. Navigate to the project directory
   

3. Install project dependencies using npm:
   npm install

4. Initialize the database based on the model:
   npx prisma migrate dev

5. Seed the database with sample data:
   npx prisma db seed

6. Start the application:
   npm run dev

7. Access the API endpoints locally using a tool like Postman or curl.

##API Endpoints##

Login

- POST /login
  - Description: Returns a token upon a successful user login.
  - Authentication: Required

Users

- GET /users
  - Description: Fetch all users and their information, except password.
  - Authentication: Not Required
- POST /users
  - Description: Create a new user.
  - Authentication: Required
- GET /users/:id
  - Description: Fetch a single user by ID.
  - Response Format: Same as POST /users
  - Authentication: Not Required
- PUT /users/:id
  - Description: Update a user by ID.
  - Authentication: Required
- DELETE /users/:id
  - Description: Remove a user by ID.
  - Authentication: Required

Bookings

- GET /bookings
  - Description: Returns all bookings.
  - Authentication: Not Required
- POST /bookings
  - Description: Create a new booking.
  - Authentication: Required
- GET /bookings/:id
  - Description: Fetch a single booking by ID.
  - Response Format: Same as POST /bookings
  - Authentication: Not Required
- PUT /bookings/:id
  - Description: Updates a single booking by ID. id is the booking's id.
  - Authentication: Required
- DELETE /bookings/:id
  - Description: Deletes a single booking by ID. id is the booking's id.
  - Authentication: Required

Properties

- GET /properties
  - Description: Returns all properties.
  - Authentication: Not Required
- POST /properties
  - Description: Create a new property.
  - Authentication: Required
- GET /properties/:id
  - Description: Fetch a single property by ID.
  - Response Format: Same as POST /properties
  - Authentication: Not Required
- PUT /properties/:id
  - Description: Updates a single property by ID. id is the property's id.
  - Authentication: Required
- DELETE /properties/:id
  - Description: Deletes a single property by ID. id is the property's id.
  - Authentication: Required

Reviews

- GET /reviews
  - Description: Returns all reviews.
  - Authentication: Not Required
- POST /reviews
  - Description: Create a new review.
  - Authentication: Required
- GET /reviews/:id
  - Description: Fetch a single review by ID.
  - Response Format: Same as POST /reviews
  - Authentication: Not Required
- PUT /reviews/:id
  - Description: Updates a single review by ID. id is the review’s id.
  - Authentication: Required
- DELETE /reviews/:id
  - Description: Deletes a single review by ID. id is the review’s id.
  - Authentication: Required

Hosts

- GET /hosts
  - Description: Returns all hosts.
  - Authentication: Not Required
- POST /hosts
  - Description: Create a new host.
  - Authentication: Required
- GET /hosts/:id
  - Description: Fetch a single host by ID.
  - Response Format: Same as POST /hosts
  - Authentication: Not Required
- PUT /hosts/:id
  - Description: Updates a single host by ID. id is the host’s id.
  - Authentication: Required
- DELETE /hosts/:id
  - Description: Deletes a single host by ID. id is the host’s id.
  - Authentication: Required

Amenities

- GET /amenities
  - Description: Returns all amenities.
  - Authentication: Not Required
- POST /amenities
  - Description: Create a new amenity.
  - Authentication: Required
- GET /amenities/:id
  - Description: Fetch a single amenity by ID.
  - Response Format: Same as POST /amenities
  - Authentication: Not Required
- PUT /amenities/:id
  - Description: Updates a single amenity by ID. id is the amenity’s id.
  - Authentication: Required
- DELETE /amenities/:id
  - Description: Deletes a single amenity by ID. id is the amenity’s id.
  - Authentication: Required


Authentication Mechanisms

Authentication is implemented using JSON Web Tokens (JWT). The following routes are protected with authentication middleware:
- POST on /users route
- PUT, DELETE on /users/:id route
- Similar routes for hosts, properties, amenities, bookings, and reviews.


##Conclusion##

This document provides comprehensive guidance on the API endpoints, authentication mechanisms and setup instructions. Follow these instructions to efficiently develop, test, and deploy the application. If you encounter any issues or have questions, refer to the provided resources or reach out to me for assistance.

Written with the help of chatGPT
