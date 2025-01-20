# 🌍 Geospatial Query System

This project is a NestJS application that allows querying, creating, updating, and deleting documents based on their location within city boundaries using MongoDB's geospatial features.

## 🚀 Features

- 🌐 **Fetch Documents by City**: Fetch all documents that fall within a specified city boundary.
- 🏙️ **Create Document in City**: Create a document within a city boundary, ensuring the document's location is inside the boundary.
- 🛠️ **Update Document in City**: Update a document, ensuring the updated location remains within the city boundary.
- 🗑️ **Delete Document in City**: Delete a document based on its location within the city boundary.
- 📜 **Swagger Documentation**: API documentation accessible at `/api/docs`.

## 🛠️ Prerequisites

- Node.js (>= 12.x)
- npm (>= 6.x)
- MongoDB

## 📦 Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-repo/geospatial-query-system.git
   cd geospatial-query-system
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Create a .env file in the root directory:**

   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

4. **Run the application:**

   ```sh
   npm run start
   ```

## 📜 Swagger Documentation

The Swagger documentation is accessible at [http://localhost:3000/api/docs](http://localhost:3000/api/docs).

## 🗂️ Project Structure

```plaintext
src/
├── app.module.ts
├── city/
│   ├── city.controller.ts
│   ├── city.module.ts
│   ├── city.schema.ts
│   ├── city.service.ts
│   └── dto/
│       └── create-city.dto.ts
├── common/
│   ├── exceptions/
│   │   ├── bad-request.exception.ts
│   │   └── not-found.exception.ts
│   └── filters/
│       └── http-exception.filter.ts
├── document/
│   ├── document.controller.ts
│   ├── document.module.ts
│   ├── document.schema.ts
│   ├── document.service.ts
│   └── dto/
│       └── create-document.dto.ts
├── main.ts
└── Controllers/
    └── geospatial.controller.ts
```

## 📋 Endpoints

### City Endpoints

- **Create a new city:**

  ```http
  POST /city
  ```

  **Body:**

  ```json
  {
    "name": "City Name",
    "boundary": {
      "type": "Polygon",
      "coordinates": [...]
    }
  }
  ```

- **Get all cities:**

  ```http
  GET /city
  ```

- **Get a city by ID:**

  ```http
  GET /city/:id
  ```

- **Update a city by ID:**

  ```http
  PUT /city/:id
  ```

  **Body:**

  ```json
  {
    "name": "Updated City Name",
    "boundary": {
      "type": "Polygon",
      "coordinates": [...]
    }
  }
  ```

- **Delete a city by ID:**

  ```http
  DELETE /city/:id
  ```

### Document Endpoints

- **Create a new document within a city boundary:**

  ```http
  POST /document/:cityId
  ```

  **Body:**

  ```json
  {
    "name": "Document Name",
    "type": "Type",
    "location": {
      "type": "Point",
      "coordinates": [...]
    }
  }
  ```

- **Get all documents within a city boundary:**

  ```http
  GET /document/:cityId
  ```

- **Get a document by ID within a city boundary:**

  ```http
  GET /document/:cityId/:id
  ```

- **Update a document by ID within a city boundary:**

  ```http
  PUT /document/:cityId/:id
  ```

  **Body:**

  ```json
  {
    "name": "Updated Document Name",
    "type": "Updated Type",
    "location": {
      "type": "Point",
      "coordinates": [...]
    }
  }
  ```

- **Delete a document by ID within a city boundary:**

  ```http
  DELETE /document/:cityId/:id
  ```
