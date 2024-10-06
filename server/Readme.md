# Project Name

## Overview

This project is an API server built using Express.js. It provides endpoints for user authentication, skill management, course management, and more.

## Technologies Used

- Node.js
- Express.js
- CORS
- Body-Parser
- dotenv

## Setup Instructions

### Prerequisites

- Node.js (version 12 or later)
- npm (Node Package Manager)

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install the dependencies:
   ```bash
   npm i
   ```
4. Create a `.env` file in the root directory and add the necessary environment variables

### Environment Variables

The application requires the following environment variables to be set in the `.env` file:

- `DATABASE_URL`: This variable holds the connection string for your PostgreSQL database. The format should be as follows:

  Example:

  ```plaintext
  DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
  ```

- `JWT_SECRET`: This variable is used to sign and verify JSON Web Tokens (JWTs) for authentication. It should be a strong, random string to ensure the security of the tokens.

## API Routes

| Method | Endpoint                                    | Description                                                                    | Used In                |
| ------ | ------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------- |
| POST   | `/api/auth/register`                        | Registers a new user.                                                          | Signup.jsx             |
| POST   | `/api/auth/login`                           | Authenticates a user and logs them in.                                         | Login.jsx              |
| GET    | `/api/skills-and-designations/designations` | Retrieves the list of designations.                                            | Signup.jsx             |
| GET    | `/api/skills-and-designations/skills`       | Retrieves the list of skills.                                                  | AllCourses.jsx         |
| GET    | `/api/users/skills`                         | Retrieves the skills of the authenticated user.                                | SkillSet.jsx           |
| GET    | `/api/users/other-skills`                   | Retrieves other skills of the authenticated user.                              | AddUserSkillModel.jsx  |
| POST   | `/api/users/add-skills`                     | Adds new skills for the authenticated user.                                    | SkillSet.jsx           |
| GET    | `/api/users`                                | Retrieves a list of all users.                                                 | AssignCourseModel.jsx  |
| GET    | `/api/users/userInfo`                       | Retrieves information about the authenticated user.                            | Profile.jsx            |
| PUT    | `/api/users/edit/userInfo`                  | Edits information for the authenticated user.                                  | Profile.jsx            |
| POST   | `/api/users/add-employee-progress`          | Adds progress for an employee in a specific course.                            | EmployeeCourseList.jsx |
| GET    | `/api/users/employee-progress/:courseId`    | Retrieves progress for a specific course for the authenticated user.           | CourseDetail.jsx       |
| GET    | `/api/courses/:courseId/skills`             | Retrieves the skills associated with a specific course.                        | CourseDetail.jsx       |
| GET    | `/api/courses/available/:id`                | Retrieves available courses for the user.                                      | AssignCourseModel.jsx  |
| GET    | `/api/courses/user/progress`                | Retrieves the courses that the user is enrolled in, along with their progress. | EmployeeCourseList.jsx |
| GET    | `/api/courses/:courseId/details`            | Retrieves detailed information about a specific course.                        | CourseDetail.jsx       |
| GET    | `/api/courses`                              | Retrieves a list of all available courses.                                     | AllCourses.jsx         |
| GET    | `/api/courses/valid-ids`                    | Retrieves valid course IDs for the user.                                       | ProtectRoutes.jsx      |
