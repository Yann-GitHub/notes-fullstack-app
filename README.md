# Notes - Fullstack CRUD Application

This is a simple CRUD application designed to manage notes using the MERN stack. Users can perform operations such as adding, deleting, and updating contacts.

## Features

- **Fullstack Approach:** Utilizes a fullstack approach, with the frontend and backend components working together seamlessly.
- **React Frontend:** The frontend of the application is developed using React, a popular JavaScript library for building user interfaces.
- **Tailwind CSS:** Tailwind CSS is used for styling the frontend, providing a utility-first approach for quickly building custom designs.
- **Vite Build Tool:** The project is initialized with Vite, a next-generation build tool that provides a fast and optimized development experience for frontend projects.
- **Node.js Backend:** The backend of the application is built using Node.js, a JavaScript runtime environment known for its scalability and performance.
- **Express Framework:** Express, a minimalist web framework for Node.js, is used to handle HTTP requests and responses on the server side.
- **MongoDB Database:** Contacts are stored in a MongoDB database hosted on MongoDB Atlas, a fully managed cloud database service.
- **Mongoose ODM:** Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js, is used to model application data and interact with the MongoDB database.

## Additional Libraries

- **Axios:** Axios is used to make HTTP requests from the frontend to the backend, enabling communication between the two components.
- **Cors:** The CORS (Cross-Origin Resource Sharing) middleware is used to enable cross-origin requests from the frontend to the backend.
- **Dotenv:** The dotenv package is used to load environment variables from a .env file into the application, allowing for better configuration management.
- **json-parser:** The json-parser middleware is used to parse incoming JSON payloads in the backend, making it easier to work with JSON data.
- **Nodemon:** Nodemon is a utility that automatically restarts the Node.js application when file changes are detected, improving the development workflow.

## Getting Started

### Prerequisites

- Node.js and npm: You will need Node.js and npm installed on your local machine. You can download Node.js [here](https://nodejs.org/en/download/) and npm is included in the installation. To verify that they are installed, you can run `node -v` and `npm -v`.

- MongoDB: This project uses MongoDB as a database. You can create a free MongoDB database on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Installation

1. **Clone the repository:** Use the following command to clone this repository to your local machine:

   ```bash
   git clone https://github.com/Yann-GitHub/notes-fullstack-app.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd notes-fullstack
   ```

3. **Install dependencies:** Run the following command in both the frontend and backend directories to install the necessary dependencies:

   ```bash
   npm install
   ```

4. **Set up environment variables:** Create a `.env` file in the backend directory and add your MongoDB URI:

   ```env
   MONGODB_URI=your_mongodb_uri
   ```

5. **Start the servers:** Run the following command in both the frontend and backend directories to start the development servers:

   ```bash
   npm run dev
   ```

Your application should now be running at `http://localhost:3000`.

## Deployment

The application is deployed on the internet using [Fly.io](https://fly.io/). It's a deployment platform that allows fullstack applications to be deployed on a global network. You can access the deployed application at the following address:

https://notes-fullstackopen-app.fly.dev/

## License

This project is open source and available under the [MIT License](LICENSE).
