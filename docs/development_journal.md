## Steps/ Personal memo

1. Frontend (React/Vite, user interface, API calls with axios and json-server, CRUD operations with mock data/local)

2. Backend (Node.js and Express)

   1. API design / Routes and request handling / Response & error handling with mock data / testing with Postman - VSCode REST client - Curl command line - Browser - Thunder Client / debugging common errors
   2. Middleware / JSON parser - Error handling middleware - Morgan ....
   3. Connecting the backend to the frontend / CORS
   4. Deploying the app to the internet / Fly.io - fly.toml file - change baseUrl API with relative URL because back and front are at the same address - production build of the frontend copied to the dist folder of the backend - script to build and deploy the app (faster) - Serving frontend as static files ( "app.use(express.static("dist"))" ) - config Proxy for dev server with vite.config.js (frontend working with the server in dev and prod mode / relative URL problem solved)

3. MongoDB (noSQL-document database), Mongoose (ODM) and Atlas (cloud database service)

   1. Create and configure Mongo Atlas / cluster / username & password (credentials) / whitelist IP (allowed) / connection / get the URI (later add it to the app)
   2. Install mongoose (ODM) / create a test file that is not connected to the backend / create a schema and a model / connect to the database / test the connection / create a document / save the document / find the document / close the connection
   3. Connect the backend to the database / copy the code from the test file to the backend (index.js) / change handler functions to use the MongoDB-Mongoose via Atlas / Modify the object returned by mongoose to match the frontend (from \_id to id and delete \_\_v)
   4. Extract the Mongoose-specific code into its own module and place it in the 'models' folder / follow the specific structure of the module in node.js / export the module / import the module into index.js / modify the code to use the module
   5. Install dotenv package and use it to manage environment variables / store the database URI and the port the application runs on in the .env file / use the dotenv package to load the environment variables / use the environment variables in the application / add the .env file to the .gitignore file (to avoid pushing it to the repository)

4. Prevent env variables from being copied to Fly.io / create and use .dockerignore file / then set the env value from the command line with the command "fly secrets set MONGO_URI=yourMongoUri" / since the PORT is also defined in the .env file, it is essential to ignore the file in Fly.io since otherwise the app starts on the wrong port

5. Completing other routes handlers to use the database / add and get note by id / delete note by id / update note by id / error handling - and dedicated middleware / testing with Postman / testing with the frontend / then test the app in production mode

6. Modify routes handlers to use Mongoose validation / create a schema with validation rules / use the schema to validate the request body / handle validation errors / test the validation with the frontend

7. Install and config Eslint / create a .eslintrc.json file and .eslintignore file / install the necessary packages / configure the rules / use extensions in VSCode.

8. Code refactoring / follow recommended practices and update folder structure / create a dedicated folder for controllers, models and utils

9. Start implementing tests / Install Lodash lib for advanced data manipulation / Update scripts in package.json, .env file and config.js to lauch server in different environments / Unit tests with Node:test / Create and populate the test database with mongo.js file(Atlas) / Integration tests with Supertest / Add BeforeEach to clear the database before each test for a better isolation / Create test_helper module to avoid repeating code / Add more notes API tests and refactor request handlers to use async/await syntax / Explore the possiblility of using 'ExpressJS Async Errors' lib to avoid try/catch blocks in the request handlers (Nooooooooo :D) /

10. Start implementing new model and controller for users / Modify the notes model to include the user id / Install bcrypt lib for password hashing before saving the user to the database / Create specifics tests for the user model and controller / Create new user in dev mode with Postman / Modifiy notes and users controller to use populate method to shape the response /

11. Start implementing authentication / Install jsonwebtoken lib / Add JWT_SECRET variable in .env file / Create a new route for user login and generate a token / Testing the login route with Postman and Vscode REST client / Modify the notes controller for limiting creating new notes to logged-in users / Testing the notes route with Postman and Vscode REST client / Add validity periode to the generate token and add specific error handling /

12. Create Togglebable component for login and new note form (props.children) / Code refacto - props drilling for loginForm and noteForm - from app to concerned components /

13. Testing frontend app with Vitest / Install and configure Vitest, Jsdom (library simulating de browser), react-testing-library, jest-dom, user-event / Create simple test for Note.jsx, Togglable.jsx et NoteForm.jsx / Execute coverage report

14. Test E2E with Playwright / Install and configure Playwright / Create a simple test for the app / Execute the test on test database /
