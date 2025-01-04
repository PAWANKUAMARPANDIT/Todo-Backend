# Todo App 

Users allowed to manage their Todo list.The users can sign up, log in, and perform CRUD operations on Todos only if authenticated via cookies.

## Features

- **User Authentication**
  - Sign up with a username, email, and password.
  - Log in using email and password.
  - Authentication via cookies for all Todo operations.

- **Todo Management**
  - Create a new Todo.
  - Get all Todos (filter by category, priority, or deadline).
  - Update an existing Todo.
  - Delete a Todo.

## How to Use

1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/PAWANKUAMARPANDIT/Todo-Backend
   npm install
   ```

2. Take the`.env.sample` file and set up the environment variables:
   ```plaintext
   MONGOURI=mongodb url
   JWT_SECRET=your_jwt_secret
   JWT_TOKEN_EXPIRY=1h
   NODE_ENV=development
   PORT=5000
   ```

3. Run the server:
   ```bash
   npm start
   ```

4. Use a tool like Postman to test the endpoints.

## Notes

- Ensure `auth.middleware.js` is used on all Todo routes to enforce authentication.
- Filter options for Todos are passed as query parameters.
- Use secure cookies (`secure: true`) in production environments.

## Example Workflow

1. Sign up a user using `/api/v2/user/signIn`.
2. Log in using `/api/v2/user/logIn`. Ensure the token is stored as an HTTP-only cookie.
3. Use the cookie to access protected Todo routes:
   - Create a Todo via `POST /api/v1/todos`.
   - Fetch Todos via `GET api/v1/todos/` with optional filters.
   - Update a Todo via `PUT /api/v1/todos/:todoId`.
   - Delete a Todo via `DELETE /api/v1/todos/:todoId`.
