# Codify

## Demo Video

Check out the demo video for a quick overview of Codify:

[![Codify Demo](https://img.youtube.com/vi/_M8xU1QuxWE/0.jpg)](https://www.youtube.com/embed/_M8xU1QuxWE)

## Project Description

Codify is a full-stack web application inspired by LeetCode, designed to provide a platform for programmers to practice and improve their coding skills. It offers features like:

- **Remote Code Execution:** Users can write code in a secure code editor, submit it for execution, and receive results and verdicts.
- **Custom Test Cases:** Users can create and run their own test cases to validate their code's functionality.
- **Language Support:** Currently supports Python and C++.
- **Submission Storage:** Submitted code, verdicts, and user information are stored in the database for future reference.
- **Concurrent Request Handling:** Employs Bull Queue based on Redis to efficiently manage numerous concurrent requests.

## Technologies Used

- **Frontend:** React JS, Redux Toolkit, Monaco Editor
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT
- **Message Queue:** Bull Queue (Redis)

## Getting Started

### Prerequisites:

- Node.js and npm (or yarn) installed
- MongoDB database

### Backend Setup:

1. Clone the repository: `git clone https://github.com/RajSahu1331/Judge.git`
2. Navigate to the backend directory: `cd server`
3. Install dependencies: `npm install`
4. Start the server: `nodemon app.js`

### Frontend Setup:

1. Navigate to the frontend directory: `cd client`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Usage

1. Access the application in your browser (default: [http://localhost:3000](http://localhost:3000)).
2. Sign up or log in using JWT authentication.
3. Choose a programming language (currently Python or C++).
4. Write your code in the code editor.
5. Create and run custom test cases (optional).
6. Click "Submit" to execute the code and receive results and verdict.

## Design Diagram

![Design Diagram](https://www.mermaidchart.com/raw/122aafa2-2ed7-4c53-8c04-fce4dd954707?theme=dark&version=v0.1&format=svg)

## Additional Notes:

- For detailed instructions and usage examples, refer to the project's documentation or code comments.
- Feel free to contribute to the project by creating pull requests.

## Future Enhancements:

- Considering adding support for more programming languages.
- Implementing more advanced features like code optimization suggestions and plagiarism detection.
- Explore containerization and deployment options for scalability using Docker and AWS Lambda Instance.
