<<<<<<< HEAD
# MERN Student Management System

A simple MERN Stack project created for a Vercel hosting experiment.

## Technologies

- MongoDB
- Express.js
- React.js + Vite
- Node.js
- Axios

## Project Structure

```text
mern-vercel-student-management/
├── client/
└── server/
```

## 1. Run the backend locally

Open a terminal:

```bash
cd server
npm install
```

Create a file named `.env` inside `server`:

```env
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/studentdb?retryWrites=true&w=majority
PORT=5000
CLIENT_URL=http://localhost:5173
```

Then run:

```bash
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

Test:

```text
http://localhost:5000/
```

## 2. Run the frontend locally

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally:

```text
http://localhost:5173
```

## 3. Deploy backend to Vercel

1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Set the project Root Directory to `server`.
4. Add the environment variable:

```text
MONGO_URI=your_mongodb_atlas_connection_string
```

5. Deploy.

After deployment, your API will be available at something like:

```text
https://your-backend.vercel.app
```

Test:

```text
https://your-backend.vercel.app/
```

## 4. Deploy frontend to Vercel

Create another Vercel project from the same GitHub repository.

Set Root Directory to:

```text
client
```

Add this environment variable:

```text
VITE_API_URL=https://your-backend.vercel.app/api
```

Deploy the frontend.

## 5. Update backend CORS

After the frontend is deployed, update the backend environment variable:

```text
CLIENT_URL=https://your-frontend.vercel.app
```

Redeploy the backend.

## Important

Do not upload `.env` to GitHub.

Use `.env.example` only as a template.

## Features

- Add student
- Display students
- Edit student
- Delete student
- MongoDB persistence
- REST API
- Responsive React UI
- Vercel deployment ready

## API Endpoints

### GET

```text
GET /api/students
```

### POST

```text
POST /api/students
```

Example JSON:

```json
{
  "name": "Sahil Salunkhe",
  "email": "sahil@example.com",
  "course": "B.E. Information Technology",
  "age": 21
}
```

### PUT

```text
PUT /api/students/:id
```

### DELETE

```text
DELETE /api/students/:id
```
=======
# mernstack
>>>>>>> origin/main
