# 📦 Project Documentation

## 🛠 How to Run the Project

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Configure Environment Variables**\
   Rename a `.env.example` to `.env`.

   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=
   DB_DATABASE=
   ```

3. **Run the Application**

   ```bash
   npm run start:dev
   ```

4. **Swagger Documentation**

   Access API docs at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## 🧪 How to Test the Endpoints

- Use **Postman**, **Insomnia**, or **curl**
- Swagger is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Run  e2e tests:
  ```bash
  npm run test:e2e
  ```

## 🧾 API Endpoints

---

### 🚀 `/company`

#### `POST /company` — Create a company

**Body:**

```json
{
  "name": "Acme Corp",
  "productId": 1
}
```

#### `GET /company` — Get all companies

**Response:**

```json
[
  {
    "id": 1,
    "name": "Acme Corp",
    "product": { ... }
  }
]
```

#### `GET /company/:id` — Get a single company

**Example:** `/company/1`

#### `PATCH /company/:id` — Update a company

**Example:** `/company/1`

**Body:**

```json
{
  "name": "Updated Company Name",
  "productId": 2
}
```

#### `DELETE /company/:id` — Soft delete a company

---

### 📦 `/product`

#### `POST /product` — Create a product

**Body:**

```json
{
  "name": "Sample Product",
  "barcode": "1234567890123",
  "categoryId": 1,
  "subcategoryId": 2
}
```

#### `GET /product` — Get all products

#### `GET /product/:id` — Get a product by ID

**Example:** `/product/5`

#### `GET /product/barcode/:barcode` — Get product by barcode

**Example:** `/product/barcode/1234567890123`

#### `PATCH /product/:id` — Update a product

**Body:**

```json
{
  "name": "Updated Product Name",
  "barcode": "9876543210987"
}
```

#### `DELETE /product/:id` — Soft delete a product

---

### 🗂 `/product/categories`

#### `GET /product/categories` — Get all categories (with subcategories)

**Response:**

```json
[
  {
    "id": 1,
    "name": "Electronics",
    "subcategories": [
      { "id": 1, "name": "Phones" },
      { "id": 2, "name": "Laptops" }
    ]
  }
]
```

