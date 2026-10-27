# Lab 1: Node.js and Express Server

**Name:** Anaganti Karthikeya  
**Registration Number:** 252U1R1012  
**Section:** CSE-2A

## Deployment

**Live URL:** Not deployed yet.

## Objective

To create a basic web server using Node.js's built-in HTTP module and then build a server using Express.js with GET routes and appropriate HTTP status codes.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- GitHub

## Installation and Execution

### Prerequisites

Install Node.js and npm.

### Steps

1. Clone the repository:

   `git clone https://github.com/karthikanaganti07-pixel/node-express-lab1.git`

2. Open the lab folder:

   `cd node-express-lab1/lab-01`

3. Install dependencies:

   `npm install`

4. Run the plain Node.js server:

   `node plain-server.js`

5. To run the Express server, stop the previous server with `Ctrl + C`, then run:

   `node server.js`

6. Open `http://localhost:3000` in your browser.

## API Endpoints

| Method | Endpoint | Description | Expected Status |
|---|---|---|---|
| GET | `/` | Displays a welcome message | 200 OK |
| GET | `/about` | Returns name and section as JSON | 200 OK |
| GET | `/time` | Displays the current date and time | 200 OK |
| GET | `/hello` | Handles an unknown route | 404 Not Found |

## Screenshots

Add screenshots of the working endpoints in the `screenshots/` folder.

Display them here after uploading:

- Home endpoint
- About endpoint
- Time endpoint
- 404 endpoint

## Notes

- The plain HTTP server and Express server use port 3000.
- The Express server handles unknown paths with a 404 response.
- `node_modules` and `.env` must not be committed to GitHub.
- Deployment is pending. Add the public deployment URL here after successful deployment.
