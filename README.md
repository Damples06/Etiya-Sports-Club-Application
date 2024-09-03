# Etiya Sports Club Application

## Overview

The Etiya Sports Club Application is designed to manage sports club members, courses, and administrators effectively. It provides a comprehensive solution for tracking member information, course enrollments, and administrative tasks within a sports organization.

## Description

Developed during my internship at Etiya, the Etiya Sports Club Application is continuously updated as I learn new technologies and gain more experience. The purpose of the Etiya Sports Club Application is to manage sports club members, courses, and administrators effectively. It provides a comprehensive solution for tracking member information, course enrollments, and administrative tasks within a sports organization. The system supports role-based access and offers detailed insights into member participation and course status, helping sports club administrators efficiently manage club operations, including member registration, course management, and attendance tracking

## Getting Started

### Dependencies

- **Java 11+**: Required for running the backend services.
- **Spring Boot 2.6+**: Facilitates the setup and configuration of the application.
- **PostgreSQL 13+**: Used as the relational database management system.
- **Angular 12+**: For the frontend application.
- **TypeScript 4.0+**: Enhances JavaScript with static typing for the frontend.

### Installation

#### Backend Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Damples06/Etiya-Sports-Club-Application.git
    ```

2. Navigate to the project directory:
    ```bash
    cd sports-server
    ```

3. Install dependencies and build the project:
    ```bash
    ./mvnw clean install
    ```

4. Update the `application.yml` file with your database configuration.

#### Frontend Installation

1. Navigate to the frontend directory:
    ```bash
    cd sports-client
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the Angular development server:
    ```bash
    ng serve
    ```

## Running the Application

### Backend

1. Start the Spring Boot application:
    ```bash
    ./mvnw spring-boot:run
    ```

2. Ensure the backend server is running on [http://localhost:7575](http://localhost:7575).

### Frontend

Access the application through your web browser at [http://localhost:4200](http://localhost:4200).

## API Endpoints

### Admin Endpoints

- **POST /admin/sellCourseBundle**: Sell a course bundle to a user.
- **GET /admin/users**: Retrieve users by remaining courses.
- **GET /admin/users/courseless**: Retrieve users without courses.
- **GET /admin/users/all**: Retrieve all users.
- **GET /admin/calendar**: Retrieve all calendar events.

### Member Endpoints

- **POST /member/arrival**: Create an arrival for a user.
- **GET /member/arrival**: Retrieve arrivals for a user.
- **DELETE /member/arrival**: Delete an arrival for a user.
- **GET /member/coursebundles**: Retrieve course bundles for a user.
- **GET /member/calendar**: Retrieve the calendar for a user.

### User Endpoints

- **POST /user/register**: Register a new user.
- **POST /user/login**: Authenticate a user and generate a token.

## Authors

- **Selçuk Yılmaz**
    - Email: [selcuuukyilmaz@gmail.com](mailto:selcuuukyilmaz@gmail.com)
    - LinkedIn: [linkedin.com/in/damples/](https://www.linkedin.com/in/damples/)

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
