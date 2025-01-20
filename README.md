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

   ```sh
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

4. **Run the application:**

   ```sh
   npm run start
   ```
