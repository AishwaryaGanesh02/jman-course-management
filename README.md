# Course Management Application

## Overview

This application is a comprehensive course management system designed to track employee progress, assign courses, and allow employees to manage their learning journey. The system integrates with a **Power BI dashboard** for administrative oversight and includes a **machine learning component** to recommend optimal learning paths for employees.

### Key Features:

- **Employee Progress Tracking**: Employees can view their assigned courses, update their progress, and manage their skill set.
- **Course Assignment**: Admins can assign courses to employees based on roles and performance.
- **Skill Management**: Upon course completion, associated skills are automatically added to the employee's profile.
- **ML-based Course Recommendations**: Machine learning is used to recommend courses that lead to the highest performance improvements or quickest learning outcomes.
- **Power BI Integration**: A real-time dashboard for administrators to monitor employee progress, course completion, and other KPIs.

---

## Architecture

### Full-Stack Components:

- **Frontend**: Built using **React**, providing an intuitive user interface for both employees and administrators.
- **Backend**: Implemented with **Node.js** using **Prisma ORM** to handle business logic and database interactions.
- **Database**: **PostgreSQL** is used for storing user, course, progress, and skill data.

### Data Engineering Pipeline (Metallic Architecture):

- **Bronze (Staging)**: Raw data is ingested and stored without any transformation.
- **Bronze (Preparation)**: Data is cleaned and transformed for further processing.
- **Gold (Data Mart)**: Structured and clean data stored for reporting and analysis.
- **Platinum (Reporting)**: Data aggregated for reporting purposes, enabling detailed analysis in **Power BI** dashboards.

### Data Science Workflow:

- **Exploratory Data Analysis (EDA)**: Analyze raw data to uncover patterns and trends in employee progress and course effectiveness.
- **Feature Engineering & Selection**: Generate and select important features that contribute to learning outcomes.
- **Model Selection**: Train machine learning models to predict optimal learning paths for employees.
- **Model Evaluation**: Assess model performance using key metrics to ensure accurate and valuable recommendations.

---

## Key Components and Data Flow

### 1. **Data Collection**:

- Collect data related to employee profiles, courses, skills, progress, and completion records.

### 2. **Data Preparation & Cleaning**:

- Data is cleaned and transformed into the desired format for storage in the Data Mart.

### 3. **Data Storage (Data Mart)**:

- Structured data is stored and optimized for queries used in reports and analysis.

### 4. **Reporting**:

- **Power BI Dashboard** provides real-time monitoring for admins, displaying key insights such as:
  - Employee progress by course
  - Skill acquisition
  - Course completion rates
  - Recommendations for new courses

### 5. **ML-based Recommendations**:

- Machine learning models are used to provide personalized course recommendations, helping employees improve their skills efficiently.

---

## Installation

1. **Clone the repository**:

```bash
   git clone https://github.com/your-repo-url
```

2. **Install Backend Dependencies**:

```bash
    cd backend
    npm install
```

3. **Install Frontend Dependencies**:

```bash
    cd frontend
    npm install
```

4.  **Set up the PostgreSQL Database:**

    Ensure you have a PostgreSQL database running and update the `.env` file with the correct database URL.

5.  **Run Migrations**:

```bash

npx prisma migrate dev
```

6.  **Run the Application**:

    - Start the backend:

      ```bash
      npm run dev
      ```

    - Start the frontend:

      ```bash
      npm start
      ```

## Usage

### Admin View

Admins can assign courses, track employee progress, and view Power BI reports for detailed insights.

### Employee View

Employees can manage their assigned courses, update progress, and view skill development.

### Course Recommendations

When an admin selects an employee, the system will suggest optimal courses based on the employee's learning path and past performance.

---

## Power BI Dashboard

The Power BI dashboard provides real-time insights into:

- Employee progress across all courses
- Skill development and completion trends
- Course completion rates
- Recommendations for new courses

---

## Machine Learning Workflow

- **Data Collection**: Data is collected on employee performance, course difficulty, and skill acquisition.
- **Feature Engineering**: Key features like course difficulty, employee performance, and time to completion are engineered to inform the recommendation model.
- **Model Training**: Machine learning models are trained using historical data to predict the best learning paths.
- **Recommendations**: Admins can access course recommendations for each employee directly from the dashboard.

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

---
