# Shopper Technical Test

This repository is a technical test for Shopper. It implements the Google Gemini API to read gas and water consumption measurement devices from an image.

## Overview

The project is developed using:

- **Node.js** with **Express** for the server framework.
- **TypeORM** for object-relational mapping (ORM).
- **Test-Driven Development (TDD)** for ensuring code quality.
- **Clean Architecture** for maintaining a well-structured and maintainable codebase.
- **Docker** for containerization, enabling consistent development and deployment environments.

## Features

- Integration with the Google Gemini API for device readings.
- Handling of gas and water consumption measurements.
- Built with a focus on TDD to ensure robustness and reliability.
- Structured using Clean Architecture principles for scalability and maintainability.
- Containerized using Docker for easy setup and deployment.

## Project Setup

Follow the steps below to configure the project and start the services:

### 1. Clone the project
   ```bash
   git clone https://github.com/VictorSnt/shopper_test.git
   cd shopper_test
   ```
### 2. Generate Your Gemini API Key

1. Go to the [Gemini API portal](https://ai.google.dev/gemini-api/docs/api-key).
2. Follow the instructions to generate an API key.

### 2. Create the `.env` File

1. In the root directory of your project, create a file named `.env`.
2. Add the API key to the `.env` file in the following format:

    ```env
    GEMINI_API_KEY=Your_API_Key_Here
    ```

### 3. Build and Start the Services

1. Make sure Docker and Docker Compose are installed on your system.
2. Run the following command to build and start the services:

    ```bash
    docker-compose up --build
    ```

This command will build and start the necessary containers using the settings specified in the `.env` file.

### Notes

- Ensure the `.env` file is properly configured before starting the services.
- If you encounter issues, review the configurations and refer to the Docker and Docker Compose documentation.

For additional assistance, refer to the [Docker Compose documentation](https://docs.docker.com/compose/) and the [Gemini API documentation](https://ai.google.dev/gemini-api/docs/api-key).

# API Documentation

This API has three main routes for managing water and gas measurements. Below are the descriptions of each route, their HTTP methods, and request and response formats.

## 1. **POST /upload**

This route is used to upload a new measurement.

### **Request Body**
```json
{
  "image": "base64", 
  "customer_code": "string", 
  "measure_datetime": "datetime", 
  "measure_type": "(WATER) or (GAS)"
}
```

### **Response Body**
```json
{
  "image_url": "string", 
  "measure_value": "integer", 
  "measure_uuid": "string"
}
```

## 2. **PATCH /confirm**

This route is used to confirm an existing measurement with a confirmed value.

### **Request Body**
```json
{
  "measure_uuid": "string", 
  "confirmed_value": "integer"
}
```
### **Response Body**
```json
{
 "success": true
}
```
## 3. **GET /<customer_code>/list**

This route is used to list the measurements of a specific customer.

### *Query Parameters**
- **measure_type** (optional): Measurement type to filter by. It can be "water" or "gas", in lowercase or uppercase.

### **Response Body**
```json
{
  "customer_code": "string",
  "measures": [
    {
      "measure_uuid": "string",
      "measure_datetime": "datetime",
      "measure_type": "string",
      "has_confirmed": "boolean",
      "image_url": "string"
    },
    {
      "measure_uuid": "string",
      "measure_datetime": "datetime",
      "measure_type": "string",
      "has_confirmed": "boolean",
      "image_url": "string"
    }
  ]
}


