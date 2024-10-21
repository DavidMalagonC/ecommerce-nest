# E-Commerce API - NestJS

This is an example API for an e-commerce system developed with NestJS, following SOLID principles, design patterns, and development best practices. This documentation will guide you through the project structure, the principles and patterns used, and how to test the API with curl.

## Technologies Used

- **Node.js** with **NestJS** as the main framework.
- **JWT** for authentication.
- **bcrypt** for password encryption.
- **Helmet** to enhance security.
- **express-rate-limit** to limit the number of requests per minute and protect against DDoS attacks.
- **class-validator** for input data validation.

## Applied SOLID Principles

- **S: Single Responsibility Principle (SRP):** Each class has a single responsibility. For example, `PurchaseService` handles the business logic for purchases, while `PurchaseRepository` manages data access.
- **O: Open/Closed Principle (OCP):** Classes and services are open for extension but closed for modification. For example, validation logic and DTOs (Data Transfer Objects) allow extending functionality without modifying existing services.
- **L: Liskov Substitution Principle (LSP):** Child classes can replace base classes without affecting functionality. In this case, `JwtStrategy` extends `PassportStrategy` and can be used where a Passport strategy is required.
- **I: Interface Segregation Principle (ISP):** Specific interfaces are created for each module, ensuring that clients only depend on what they actually need. For example, `CreatePurchaseDto` acts as an interface to ensure the correct data is sent.
- **D: Dependency Inversion Principle (DIP):** Dependency injection is used, making services and repositories depend on abstractions rather than concrete implementations.

## Design Patterns Used

### Creational Patterns

- **Singleton Pattern:** `AuthService` is used as a singleton to ensure a single instance is used throughout the application, allowing centralized authentication logic.

### Structural Patterns

- **Dependency Injection:** All services and repositories are injected via the constructor, allowing cleaner, more testable, and decoupled code.

### Behavioral Patterns

- **Strategy Pattern:** The `JwtStrategy` class implements the Strategy pattern by extending `PassportStrategy` and providing a specific implementation for JWT authentication. This allows switching between different authentication strategies without modifying the existing authentication flow.

- **Repository Pattern:** A repository (`PurchaseRepository`) is used to handle database operations, allowing separation of data access logic from business logic.
- **DTO (Data Transfer Object):** DTOs like `CreatePurchaseDto` are used to clearly define the expected data in operations, ensuring precise validation.

## Endpoints and curl Examples

1. **Create a Purchase**

   **Endpoint:** `/purchases`

   **Method:** `POST`

   ```bash
   curl -X POST http://localhost:3000/purchases \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <TOKEN>" \
     -d '{
       "direction": "LOCAL",
       "idUser": "JohnDoe",
       "observations": "No onions",
       "payment": "Credit Card",
       "products": [
         { "name": "Pizza", "quantity": 1 },
         { "name": "Pasta", "quantity": 2 },
         { "name": "Soda", "quantity": 3 }
       ],
       "total": 45000
     }'
   ```

2. **Get All Purchases**

   **Endpoint:** `/purchases`

   **Method:** `GET`

   ```bash
   curl -X GET http://localhost:3000/purchases \
     -H "Authorization: Bearer <TOKEN>"
   ```

3. **Get a Purchase by ID**

   **Endpoint:** `/purchases/{id}`

   **Method:** `GET`

   ```bash
   curl -X GET http://localhost:3000/purchases/{id} \
     -H "Authorization: Bearer <TOKEN>"
   ```

4. **Update a Purchase**

   **Endpoint:** `/purchases/{id}`

   **Method:** `PUT`

   ```bash
   curl -X PUT http://localhost:3000/purchases/{id} \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <TOKEN>" \
     -d '{
       "direction": "LOCAL",
       "idUser": "JohnDoe",
       "observations": "No sauces",
       "payment": "Cash",
       "products": [
         { "name": "Pizza", "quantity": 1 }
       ],
       "total": 30000
     }'
   ```

5. **Delete a Purchase**

   **Endpoint:** `/purchases/{id}`

   **Method:** `DELETE`

   ```bash
   curl -X DELETE http://localhost:3000/purchases/{id} \
     -H "Authorization: Bearer <TOKEN>"
   ```

## Authentication

For all endpoints, you need to include the authentication token in the `Authorization` header as follows: `Bearer <TOKEN>`. You can obtain the token via the implemented authentication process.

## Installation and Running

1. Clone the repository.

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the application in development mode:

   ```bash
   npm run start:dev
   ```
